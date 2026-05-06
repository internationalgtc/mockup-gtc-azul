import { useTranslation } from "react-i18next";
import { X, RotateCcw, Phone } from "lucide-react";
import { BOT_NAME, BOT_NAME_EN } from "@/data/chatbotData";

interface ChatHeaderProps {
  onClose: () => void;
  onReset: () => void;
  onWhatsApp: () => void;
}

export const ChatHeader = ({ onClose, onReset, onWhatsApp }: ChatHeaderProps) => {
  const { i18n } = useTranslation();
  const name = i18n.language === "en" ? BOT_NAME_EN : BOT_NAME;
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-blue-prime rounded-t-2xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
          GTC
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm">{name}</h3>
          <p className="text-white/70 text-xs">Responde al instante</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button onClick={onWhatsApp} className="p-2 rounded-full hover:bg-white/10 transition-colors" title="WhatsApp">
          <Phone className="w-4 h-4 text-white" />
        </button>
        <button onClick={onReset} className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Reiniciar">
          <RotateCcw className="w-4 h-4 text-white" />
        </button>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Cerrar">
          <X className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};
