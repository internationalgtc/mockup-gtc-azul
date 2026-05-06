import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MessageCircle } from "lucide-react";

interface ChatFloatingButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatFloatingButton = ({ onClick, isOpen }: ChatFloatingButtonProps) => {
  const { i18n } = useTranslation();
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBadge(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (isOpen) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 bg-coral hover:bg-coral/90 text-white rounded-full shadow-lg shadow-coral/30 transition-all duration-300 hover:scale-105"
      aria-label="Abrir chat"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6" />
        {showBadge && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-prime rounded-full border-2 border-white animate-pulse" />
        )}
      </div>
      <span className="font-medium text-sm hidden sm:block">
        {i18n.language === "en" ? "Can I help?" : "¿Te ayudo?"}
      </span>
    </button>
  );
};
