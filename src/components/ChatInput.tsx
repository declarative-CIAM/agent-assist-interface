
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Smile, Paperclip, Mic } from "lucide-react";
import { useState, FormEvent, KeyboardEvent } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // This would be where you'd implement actual voice recording
      setTimeout(() => {
        setIsRecording(false);
        setMessage("This is a simulated voice message transcription.");
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t bg-white">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="rounded-full h-8 w-8"
                  disabled={disabled}
                >
                  <Paperclip className="h-4 w-4 text-gray-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Attach a file</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="rounded-full h-8 w-8"
                  disabled={disabled}
                >
                  <Smile className="h-4 w-4 text-gray-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add emoji</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-end gap-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="min-h-[60px] resize-none"
            disabled={disabled}
          />
          
          <div className="flex flex-col gap-2">
            <Button 
              type="button" 
              size="icon" 
              variant={isRecording ? "destructive" : "outline"}
              className="rounded-full"
              disabled={disabled}
              onClick={toggleRecording}
            >
              <Mic className="h-4 w-4" />
            </Button>
            
            <Button 
              type="submit" 
              size="icon" 
              className="bg-chat-agent hover:bg-chat-agent/90 rounded-full"
              disabled={!message.trim() || disabled}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
