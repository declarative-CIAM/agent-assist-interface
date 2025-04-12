
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Phone, Video } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface ChatHeaderProps {
  agentName: string;
  agentAvatar?: string;
  isOnline?: boolean;
}

const ChatHeader = ({ agentName, agentAvatar, isOnline = true }: ChatHeaderProps) => {
  const [typing, setTyping] = useState(false);

  // Simulate occasional typing status
  useState(() => {
    const interval = setInterval(() => {
      setTyping(Math.random() > 0.7);
      
      if (typing) {
        setTimeout(() => setTyping(false), 2000);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center">
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={agentAvatar} alt={agentName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {agentName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>
        <div className="ml-3 flex flex-col">
          <h3 className="font-medium text-sm">{agentName}</h3>
          <div className="flex items-center">
            <Badge variant="secondary" className="text-xs px-2 py-0 h-5">
              {typing ? "Typing..." : isOnline ? "Online" : "Offline"}
            </Badge>
            <span className="text-xs text-muted-foreground ml-2">Customer Support</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Video className="h-4 w-4" />
        </Button>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Chat Options</SheetTitle>
              <SheetDescription>
                Configure your chat experience with our AI assistant.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-medium">Chat History</h4>
                <p className="text-sm text-muted-foreground">
                  Your chat history is saved for 30 days to provide better service.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-medium">Agent Information</h4>
                <p className="text-sm text-muted-foreground">
                  This AI assistant is designed to help with customer inquiries and provide support.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-medium">Privacy Policy</h4>
                <p className="text-sm text-muted-foreground">
                  Learn how we handle your data and protect your privacy.
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default ChatHeader;
