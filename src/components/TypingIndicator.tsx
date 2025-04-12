
import { cn } from "@/lib/utils";

interface TypingIndicatorProps {
  visible: boolean;
}

const TypingIndicator = ({ visible }: TypingIndicatorProps) => {
  if (!visible) return null;

  return (
    <div className="flex mb-4 justify-start animate-fade-in">
      <div className="bg-chat-agent text-white rounded-lg rounded-tl-none px-4 py-2 max-w-[80%]">
        <div className="flex space-x-1">
          <div className={cn("w-2 h-2 rounded-full bg-white animate-bounce")} style={{ animationDelay: "0ms" }} />
          <div className={cn("w-2 h-2 rounded-full bg-white animate-bounce")} style={{ animationDelay: "150ms" }} />
          <div className={cn("w-2 h-2 rounded-full bg-white animate-bounce")} style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
