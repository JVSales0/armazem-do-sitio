
import { useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image, Upload } from "lucide-react";

interface ImageUploadProps {
  initialImageUrl: string;
  onImageChange: (imageUrl: string, localImage: File | null, previewUrl: string | null) => void;
}

const ImageUpload = ({ initialImageUrl, onImageChange }: ImageUploadProps) => {
  const [localImage, setLocalImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl || null);
  const [imageUrl, setImageUrl] = useState(initialImageUrl || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLocalImage(file);
      
      // Create a preview URL for the uploaded image
      const objectURL = URL.createObjectURL(file);
      setPreviewUrl(objectURL);
      
      // Clear the remote imageUrl since we're using a local image
      setImageUrl("");
      
      // Notify parent component
      onImageChange("", file, objectURL);
      
      toast({
        title: "Imagem selecionada",
        description: `${file.name} foi selecionada como imagem do produto.`,
      });
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    
    // If URL is provided, clear local image
    if (url) {
      setLocalImage(null);
      setPreviewUrl(url);
      
      // Notify parent component
      onImageChange(url, null, url);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Imagem do Produto</Label>
      
      {/* Image preview */}
      {previewUrl ? (
        <div className="mb-4 border rounded-md p-2">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="h-48 w-full object-contain bg-gray-50"
          />
        </div>
      ) : (
        <div className="mb-4 border rounded-md p-2 bg-gray-50 flex items-center justify-center h-48">
          <Image className="h-16 w-16 text-gray-300" />
        </div>
      )}
      
      {/* Image upload button */}
      <div className="flex flex-col gap-2">
        <input
          ref={fileInputRef}
          type="file"
          id="image-upload"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <Button 
          type="button" 
          variant="outline"
          onClick={triggerFileInput}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Escolher Imagem Local
        </Button>
        <p className="text-xs text-gray-500">
          Escolha uma imagem do seu dispositivo ou deixe em branco para usar uma URL.
        </p>
      </div>
      
      {/* URL input as alternative */}
      <div className="mt-2">
        <Label htmlFor="imageUrl">Ou insira uma URL da imagem</Label>
        <Input
          id="imageUrl"
          value={imageUrl}
          onChange={handleUrlChange}
          placeholder="URL da imagem do produto"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
