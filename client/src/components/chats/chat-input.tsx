"use client";

import { cn } from "@lib/utils";
import type { TMessageValidator } from "@lib/validators/message";
import { useMutation } from "@tanstack/react-query";
import { CornerDownLeft, Loader } from "lucide-react";
import { nanoid } from "nanoid";
import {
	type HTMLAttributes,
	type SetStateAction,
	useContext,
	useRef,
	useState,
} from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import { MessagesContext } from "./context/useMessageContext";

type ChatInputProps = HTMLAttributes<HTMLDivElement>;

export default function ChatInput({ className, ...props }: ChatInputProps) {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const [input, setInput] = useState<string>("");
	const {
		messages,
		addMessage,
		removeMessage,
		updateMessage,
		setIsMessageUpdating,
	} = useContext(MessagesContext);

	const { mutate: sendMessage, isPending } = useMutation({
		mutationKey: ["send-message"],
		onMutate: (message) => addMessage(message),
		// include message to later use it in onMutate
		mutationFn: async (_message: TMessageValidator) => {
			const response = await fetch("/api/chat", {
				method: "POST",
				body: JSON.stringify({ messages }),
				cache: "no-store",
			});
			if (!response.ok) throw new Error(response.statusText);
			return response.body;
		},
		onSuccess: async (stream) => {
			if (!stream) throw new Error("No stream");

			// construct new message to add
			const id = nanoid();
			const responseMessage: TMessageValidator = {
				id,
				role: "system",
				content: "",
			};

			// add new message to state
			addMessage(responseMessage);

			setIsMessageUpdating(true);

			const reader = stream.getReader();
			const decoder = new TextDecoder();
			let done = false;

			while (!done) {
				const { value, done: doneReading } = await reader.read();
				done = doneReading;
				const chunkValue = decoder.decode(value);
				updateMessage(id, (prev) => prev + chunkValue);
			}

			// clean up
			setIsMessageUpdating(false);
			setInput("");

			setTimeout(() => {
				textareaRef.current?.focus();
			}, 10);
		},
		onError: (err, message) => {
			const error = err as Error;
			toast.error(error.message);
			removeMessage(message.id);
			textareaRef.current?.focus();
		},
	});

	return (
		<div {...props} className={cn("border-zinc-300 border-t", className)}>
			<div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
				<TextareaAutosize
					autoFocus
					className="peer block w-full resize-none scroll-smooth bg-zinc-100 px-3 py-1.5 pr-14 text-gray-900 text-sm outline-none disabled:opacity-50 sm:leading-6"
					disabled={isPending}
					maxRows={4}
					onChange={(e: { target: { value: SetStateAction<string> } }) =>
						setInput(e.target.value)
					}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();

							const message: TMessageValidator = {
								id: nanoid(),
								role: "user",
								content: input,
							};

							sendMessage(message);
						}
					}}
					placeholder="Write a message..."
					ref={textareaRef}
					rows={2}
					value={input}
				/>

				<div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
					<kbd className="inline-flex items-center rounded border-gray-200 bg-white px-1 font-sans text-gray-400 text-xs focus:ring-0">
						{isPending ? (
							<Loader className="h-3 w-3 animate-spin" />
						) : (
							<CornerDownLeft className="h-3 w-3" />
						)}
					</kbd>
				</div>

				<div
					aria-hidden="true"
					className="absolute inset-x-0 bottom-0 border-gray-300 border-t peer-focus:border-green-600 peer-focus:border-t-2"
				/>
			</div>
		</div>
	);
}
