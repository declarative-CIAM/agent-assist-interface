
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Smile, Heart, ThumbsUp, MessageSquareHeart } from "lucide-react";

interface MessageReactionProps {
  onReact: (type: string) => void;
  isCustomerMessage?: boolean;
}

const MessageReaction = ({ onReact, isCustomerMessage = false }: MessageReactionProps) => {
  const reactions = [
    { icon: <Smile className="h-4 w-4" />, type: "smile" },
    { icon: <Heart className="h-4 w-4" />, type: "heart" },
    { icon: <ThumbsUp className="h-4 w-4" />, type: "thumbsUp" },
    { icon: <MessageSquareHeart className="h-4 w-4" />, type: "thanks" },
  ];

  if (isCustomerMessage) return null;

  return (
    <div className={cn("flex opacity-0 group-hover:opacity-100 transition-opacity mt-1", 
      "absolute -bottom-3 right-2")}>
      {reactions.map((reaction) => (
        <Button
          key={reaction.type}
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 rounded-full hover:bg-chat-agent/20"
          onClick={() => onReact(reaction.type)}
        >
          {reaction.icon}
        </Button>
      ))}
    </div>
  );
};

export default MessageReaction;
