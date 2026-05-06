import { useEffect } from "react";
import { useChatbot } from "@/hooks/useChatbot";
import { ChatHeader } from "./ChatHeader";
import { ChatBubble } from "./ChatBubble";
import { ChatOptions } from "./ChatOptions";
import { ChatTypingIndicator } from "./ChatTypingIndicator";
import { ChatAvatar } from "./ChatAvatar";
import { WHATSAPP_LINK } from "@/data/chatbotData";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWindow = ({ isOpen, onClose }: ChatWindowProps) => {
  const {
    messages,
    isTyping,
    currentOptions,
    messagesEndRef,
    handleOptionClick,
    initializeChat,
    resetChat,
  } = useChatbot();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat();
    }
  }, [isOpen, messages.length, initializeChat]);

  const handleWhatsApp = () => {
    window.open(WHATSAPP_LINK, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[95vw] max-w-[400px] h-[600px] max-h-[80vh] flex flex-col bg-navy rounded-2xl shadow-2xl overflow-hidden border border-white/10">
      <ChatHeader onClose={onClose} onReset={resetChat} onWhatsApp={handleWhatsApp} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-navy">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}

        {isTyping && (
          <div className="flex items-end gap-2">
            <ChatAvatar size="sm" showStatus={false} />
            <div className="bg-navy-soft rounded-xl rounded-bl-sm p-3">
              <ChatTypingIndicator />
            </div>
          </div>
        )}

        {!isTyping && currentOptions.length > 0 && (
          <ChatOptions options={currentOptions} onOptionClick={handleOptionClick} />
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 py-3 bg-navy-soft border-t border-white/10">
        <div className="flex items-center justify-center gap-2 text-xs text-white/40">
          <span>Talento sin fronteras</span>
        </div>
      </div>
    </div>
  );
};
