import { useState } from "react";
import { ChatFloatingButton } from "./ChatFloatingButton";
import { ChatWindow } from "./ChatWindow";

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatFloatingButton onClick={() => setIsOpen(true)} isOpen={isOpen} />
      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
