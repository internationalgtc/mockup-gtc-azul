import { ChatMessage } from "@/types/chat";

interface ChatBubbleProps {
  message: ChatMessage;
}

export const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isBot = message.type === "bot";

  return (
    <div className={`flex items-end gap-2 ${isBot ? "flex-row" : "flex-row-reverse"}`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-blue-prime/20 flex items-center justify-center text-blue-light text-xs font-bold flex-shrink-0">
          G
        </div>
      )}

      <div
        className={`max-w-[85%] px-4 py-3 rounded-xl text-sm whitespace-pre-wrap leading-relaxed ${
          isBot
            ? "bg-navy-soft text-white/90 rounded-bl-sm"
            : "bg-blue-prime text-white rounded-br-sm"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};
