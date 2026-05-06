import { ChatOption } from "@/types/chat";

interface ChatOptionsProps {
  options: ChatOption[];
  onOptionClick: (option: ChatOption) => void;
}

export const ChatOptions = ({ options, onOptionClick }: ChatOptionsProps) => {
  return (
    <div className="flex flex-col gap-2 mt-3">
      {options.map((option) => (
        <button
          key={option.id + option.label}
          onClick={() => onOptionClick(option)}
          className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-prime/40 rounded-xl text-sm text-left transition-all duration-200 min-h-[44px]"
        >
          <span className="text-blue-light">{option.icon}</span>
          <span className="text-white/80 font-medium">{option.label}</span>
        </button>
      ))}
    </div>
  );
};
