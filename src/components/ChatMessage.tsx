
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import MessageReaction from "./MessageReaction";

export interface MessageProps {
  id: string;
  content: string;
  sender: "agent" | "customer";
  timestamp: Date;
  reaction?: string;
}

const ChatMessage = ({ content, sender, timestamp, reaction }: MessageProps) => {
  const isAgent = sender === "agent";
  const [showReaction, setShowReaction] = useState(reaction);
  
  const handleReact = (type: string) => {
    setShowReaction(type);
  };
  
  return (
    <div
      className={cn(
        "flex mb-4 animate-fade-in",
        isAgent ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "relative max-w-[80%] rounded-lg px-4 py-2 hover:shadow-md transition-shadow duration-200 group",
          isAgent
            ? "bg-chat-agent text-white rounded-tl-none"
            : "bg-chat-customer text-gray-800 rounded-tr-none hover:bg-chat-customer/90"
        )}
      >
        <p className="text-sm">{content}</p>
        <span className="text-xs opacity-70 mt-1 block text-right">
          {formatDistanceToNow(timestamp, { addSuffix: true })}
        </span>
        
        {showReaction && (
          <div className="absolute -top-3 right-0 bg-white rounded-full px-2 py-1 text-xs shadow-md">
            {showReaction === "smile" && "😊"}
            {showReaction === "heart" && "❤️"}
            {showReaction === "thumbsUp" && "👍"}
            {showReaction === "thanks" && "🙏"}
          </div>
        )}
        
        <MessageReaction onReact={handleReact} isCustomerMessage={!isAgent} />
      </div>
    </div>
  );
};

export default ChatMessage;
