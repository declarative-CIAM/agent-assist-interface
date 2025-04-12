
import { Card } from "@/components/ui/card";
import ChatContainer from "@/components/ChatContainer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex items-center justify-center">
      <Card className="w-full max-w-3xl h-[600px] shadow-lg overflow-hidden flex flex-col">
        <ChatContainer />
      </Card>
    </div>
  );
};

export default Index;
