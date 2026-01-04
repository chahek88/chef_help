import { ChatInterface } from "@/components/ChatInterface";

const CreativeChat = () => {
  return (
    <ChatInterface
      title="Leftover Magic"
      subtitle="Transform your leftovers into delicious meals"
      placeholder="Describe your leftover ingredients, and I'll help you create something amazing..."
      systemPrompt="You are a creative culinary genius. Help users transform their leftover food into exciting new dishes. Be imaginative, reduce food waste, and provide easy-to-follow recipes."
    />
  );
};

export default CreativeChat;
