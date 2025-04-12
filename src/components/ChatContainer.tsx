import { useRef, useEffect, useState } from "react";
import ChatMessage, { MessageProps } from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import TypingIndicator from "./TypingIndicator";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MessageSquare, MessageCircle, Clock, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const initialMessages: MessageProps[] = [
  {
    id: "1",
    content: "Hello! I'm your AI assistant. How can I help you today?",
    sender: "agent",
    timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
  },
];

const ChatContainer = () => {
  const [messages, setMessages] = useState<MessageProps[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [isFastMode, setIsFastMode] = useState(false);
  const [chatStyle, setChatStyle] = useState<"bubble" | "modern">("bubble");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: MessageProps = {
      id: `user-${Date.now()}`,
      content,
      sender: "customer",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      setIsTyping(false);
      
      // Add AI response
      const responses = [
        "I understand your concern. Let me look into that for you.",
        "Thanks for providing that information. Is there anything else you'd like to know?",
        "That's a great question. Based on your account history, I can see that...",
        "I'm checking our database for that information. One moment please.",
        "I've found some helpful resources that might address your question.",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage: MessageProps = {
        id: `ai-${Date.now()}`,
        content: randomResponse,
        sender: "agent",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    }, isFastMode ? 500 : 1500);
  };

  const handleClearChat = () => {
    setMessages(initialMessages);
  };

  return (
    <div className="flex flex-col h-full bg-chat-background">
      <ChatHeader agentName="AI Assistant" />
      
      <div className="p-2 border-b flex justify-between items-center bg-white">
        <ToggleGroup type="single" value={chatStyle} onValueChange={(value) => value && setChatStyle(value as "bubble" | "modern")}>
          <ToggleGroupItem value="bubble" aria-label="Bubble Style">
            <MessageCircle className="h-4 w-4 mr-1" />
            Bubble
          </ToggleGroupItem>
          <ToggleGroupItem value="modern" aria-label="Modern Style">
            <MessageSquare className="h-4 w-4 mr-1" />
            Modern
          </ToggleGroupItem>
        </ToggleGroup>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs flex items-center gap-1"
            onClick={() => setIsFastMode(!isFastMode)}
          >
            <Clock className="h-3 w-3" />
            {isFastMode ? "Normal Mode" : "Fast Mode"}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleClearChat}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className={cn(
        "flex-1 overflow-y-auto p-4",
        chatStyle === "modern" ? "bg-gray-50" : "bg-chat-background"
      )}>
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            id={message.id}
            content={message.content}
            sender={message.sender}
            timestamp={message.timestamp}
            reaction={message.reaction}
          />
        ))}
        
        <TypingIndicator visible={isTyping} />
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};

export default ChatContainer;
