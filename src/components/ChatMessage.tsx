
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export interface MessageProps {
  id: string;
  content: string;
  sender: "agent" | "customer";
  timestamp: Date;
}

const ChatMessage = ({ content, sender, timestamp }: MessageProps) => {
  const isAgent = sender === "agent";
  
  return (
    <div
      className={cn(
        "flex mb-4 animate-fade-in",
        isAgent ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          isAgent
            ? "bg-chat-agent text-white rounded-tl-none"
            : "bg-chat-customer text-gray-800 rounded-tr-none"
        )}
      >
        <p className="text-sm">{content}</p>
        <span className="text-xs opacity-70 mt-1 block text-right">
          {formatDistanceToNow(timestamp, { addSuffix: true })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
