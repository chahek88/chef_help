import { ChefHat, Camera, Sparkles } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { NavLink } from "@/components/NavLink";

const Index = () => {
  return (
    <div className="min-h-screen gradient-cream">
      {/* Hero section */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
            🧑🏻‍🍳 CHEF HELP 🧑🏻‍🍳
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Your Culinary Companion
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <FeatureCard
            title="Recipe Finder"
            description="Tell us what ingredients you have, and we'll suggest delicious recipes you can make right now."
            icon={ChefHat}
            to="/recipes"
            delay={100}
            gradient="sage"
          />
          
          <FeatureCard
            title="Image Identifier"
            description="Upload a photo of ingredients or dishes, and our AI will identify them for you."
            icon={Camera}
            to="/identify"
            delay={200}
            gradient="warm"
          />
          
          <FeatureCard
            title="Leftover Magic"
            description="Got leftover food? Let us help you transform them into something creative and delicious."
            icon={Sparkles}
            to="/creative"
            delay={300}
            gradient="olive"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 mt-12">
        <p className="text-center text-muted-foreground text-sm">
          Make your cooking journey delightful
        </p>
      </footer>
    </div>
  );
};

export default Index;
