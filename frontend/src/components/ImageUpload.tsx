import { useState, useCallback } from "react";
import { Upload, X, ArrowLeft, Image as ImageIcon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const API = import.meta.env.VITE_API_BASE_URL;

export function ImageUpload() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
  if (!imageFile) return;

  setIsAnalyzing(true);
  setResult(null);

  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(`${API}/api/image`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success && data.result) {
      setResult(data.result);
    } else {
      setResult("No result returned");
    }

  } catch (err) {
    setResult("Failed to analyze image");
  } finally {
    setIsAnalyzing(false);
  }
};

  const clearImage = () => {
    setSelectedImage(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen gradient-cream">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
          <div>
            <h1 className="font-display text-xl font-semibold text-foreground">Image Identification</h1>
            <p className="text-sm text-muted-foreground">Upload a photo to identify ingredients</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {!selectedImage ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              isDragging 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-terracotta to-amber-600 flex items-center justify-center">
              <Upload className="w-10 h-10 text-primary-foreground" />
            </div>
            
            <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
              Upload your food photo
            </h3>
            <p className="text-muted-foreground mb-6">
              Drag and drop an image here, or click to browse
            </p>
            
            <Button variant="outline" className="pointer-events-none">
              <ImageIcon className="w-4 h-4 mr-2" />
              Choose Image
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Image preview */}
            <div className="relative rounded-2xl overflow-hidden bg-card border border-border/50 shadow-card">
              <button
                onClick={clearImage}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
              <img 
                src={selectedImage} 
                alt="Uploaded food" 
                className="w-full h-auto max-h-[400px] object-contain"
              />
            </div>

            {/* Analyze button */}
            {!result && (
              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full h-14 text-lg rounded-xl bg-gradient-to-r from-terracotta to-amber-600 hover:opacity-90 text-primary-foreground"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-5 h-5 mr-2" />
                    Identify Ingredients
                  </>
                )}
              </Button>
            )}

            {/* Result */}
            {result && (
              <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-card animate-fade-up">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  Analysis Result
                </h3>
                <p className="text-muted-foreground leading-relaxed">{result}</p>
                
                <Button 
                  onClick={clearImage}
                  variant="outline"
                  className="mt-4"
                >
                  Upload Another Image
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
