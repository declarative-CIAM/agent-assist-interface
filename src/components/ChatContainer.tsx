
import { useRef, useEffect, useState } from "react";
import ChatMessage, { MessageProps } from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import TypingIndicator from "./TypingIndicator";

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
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-chat-background">
      <ChatHeader agentName="AI Assistant" />
      
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            id={message.id}
            content={message.content}
            sender={message.sender}
            timestamp={message.timestamp}
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
