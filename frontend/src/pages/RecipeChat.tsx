import { ChatInterface } from "@/components/ChatInterface";

const RecipeChat = () => {
  return (
    <ChatInterface
      title="Recipe Finder"
      subtitle="Find recipes with your ingredients"
      placeholder="Tell me what ingredients you have, and I'll suggest recipes..."
      systemPrompt="You are a helpful culinary assistant. Help users find recipes based on the ingredients they have. Be creative, friendly, and provide clear cooking instructions."
    />
  );
};

export default RecipeChat;
