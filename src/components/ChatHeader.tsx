
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ChatHeaderProps {
  agentName: string;
  agentAvatar?: string;
  isOnline?: boolean;
}

const ChatHeader = ({ agentName, agentAvatar, isOnline = true }: ChatHeaderProps) => {
  return (
    <div className="flex items-center p-4 border-b bg-white">
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
            {isOnline ? "Online" : "Offline"}
          </Badge>
          <span className="text-xs text-muted-foreground ml-2">Customer Support</span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
