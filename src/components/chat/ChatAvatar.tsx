import botAvatar from "@/assets/bot-avatar.jpg";

interface ChatAvatarProps {
  size?: "sm" | "md" | "lg";
  showStatus?: boolean;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

export const ChatAvatar = ({ size = "md", showStatus = true }: ChatAvatarProps) => {
  return (
    <div className="relative flex-shrink-0">
      <img
        src={botAvatar}
        alt="Asistente Virtual GTC"
        className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-primary/20`}
      />
      {showStatus && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-chat-whatsapp rounded-full ring-2 ring-card" />
      )}
    </div>
  );
};
