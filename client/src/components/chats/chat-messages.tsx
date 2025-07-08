'use client';

import { cn } from '@lib/utils';
import { type HTMLAttributes, useContext } from 'react';
import { MessagesContext } from './context/useMessageContext';

// import MarkdownLite from './markdown-lite';

type ChatMessagesProps = HTMLAttributes<HTMLDivElement>;

export default function ChatMessages({
  className,
  ...props
}: ChatMessagesProps) {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  return (
    <div
      {...props}
      className={cn(
        'scrollbar-thumb scrollbar-thumb scrollbar-track flex flex-col-reverse gap-3 overflow-y-auto',
        className
      )}
    >
      <div className="flex-1 grow" />
      {inverseMessages.map((message) => {
        return (
          <div className="chat-message" key={`${message.id}-${message.id}`}>
            <div
              className={cn('flex items-end', {
                'justify-end': message.role === 'user',
              })}
            >
              <div
                className={cn(
                  'mx-2 flex max-w-xs flex-col space-y-2 overflow-x-hidden text-sm',
                  {
                    'order-1 items-end': message.role === 'user',
                    'order-2 items-start': message.role === 'system',
                  }
                )}
              >
                <p
                  className={cn('rounded-lg px-4 py-2', {
                    'bg-primary text-primary-foreground': message.role === 'user',
                    'bg-gray-200 text-gray-900': message.role === 'system',
                  })}
                >
                  {/* <MarkdownLite text={message.content} /> */}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
