export default function ChatHeader() {
  return (
    <div className="flex w-full items-center justify-start gap-3 text-zinc-800">
      <div className="flex flex-col items-start text-sm">
        <p className="text-xs">Chat with</p>
        <div className="flex items-center gap-1.5">
          <p className="h-2 w-2 rounded-full bg-primary" />
          <p className="font-medium">Cellthium support</p>
        </div>
      </div>
    </div>
  );
}
