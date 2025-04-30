
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Product, ProductCategory } from "@/types/product";
import { addProduct, updateProduct } from "@/services/productService";
import { Image, Upload } from "lucide-react";

interface ProductFormProps {
  product?: Product;
  isEditing?: boolean;
}

const ProductForm = ({ product, isEditing = false }: ProductFormProps) => {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price.toString() || "");
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "/placeholder.svg");
  const [category, setCategory] = useState<ProductCategory>(product?.category || "outros");
  const [stock, setStock] = useState(product?.stock.toString() || "0");
  const [unit, setUnit] = useState(product?.unit || "unidade");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localImage, setLocalImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(product?.imageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLocalImage(file);
      
      // Create a preview URL for the uploaded image
      const objectURL = URL.createObjectURL(file);
      setPreviewUrl(objectURL);
      
      // Clear the remote imageUrl since we're using a local image
      setImageUrl("");
      
      toast({
        title: "Imagem selecionada",
        description: `${file.name} foi selecionada como imagem do produto.`,
      });
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description || !price || !category || !stock || !unit) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Process the image if there's a local upload
      let finalImageUrl = imageUrl;
      
      if (localImage) {
        // In a real app with backend, you'd upload this to a server
        // Since we're using local storage, we'll use the local data URL
        finalImageUrl = previewUrl || "";
      }
      
      const productData = {
        id: product?.id || "",
        name,
        description,
        price: parseFloat(price),
        imageUrl: finalImageUrl,
        category,
        stock: parseInt(stock),
        unit,
      };
      
      if (isEditing && product) {
        await updateProduct(productData);
        toast({
          title: "Produto atualizado",
          description: "O produto foi atualizado com sucesso.",
        });
      } else {
        await addProduct(productData);
        toast({
          title: "Produto adicionado",
          description: "O produto foi adicionado com sucesso.",
        });
      }
      
      navigate("/admin/products");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o produto.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories: ProductCategory[] = [
    "frutas", 
    "legumes", 
    "verduras", 
    "graos", 
    "conservas", 
    "doces", 
    "bebidas", 
    "racoes",
    "organicos_animais",
    "outros"
  ];

  const translateCategory = (cat: string) => {
    const translations: Record<string, string> = {
      frutas: "Frutas",
      legumes: "Legumes",
      verduras: "Verduras",
      graos: "Grãos",
      conservas: "Conservas",
      doces: "Doces",
      bebidas: "Bebidas",
      racoes: "Rações para Pets",
      organicos_animais: "Produtos Orgânicos Animais",
      outros: "Outros"
    };
    
    return translations[cat] || cat;
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-site-green">
          {isEditing ? "Editar Produto" : "Adicionar Novo Produto"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form id="product-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto*</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do produto"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição*</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o produto"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$)*</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unit">Unidade*</Label>
              <Input
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="kg, unidade, pacote, etc."
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoria*</Label>
              <Select 
                value={category} 
                onValueChange={(value) => setCategory(value as ProductCategory)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {translateCategory(cat)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stock">Estoque*</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="0"
                required
              />
            </div>
          </div>
          
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
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  // If URL is provided, clear local image
                  if (e.target.value) {
                    setLocalImage(null);
                    setPreviewUrl(e.target.value);
                  }
                }}
                placeholder="URL da imagem do produto"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => navigate("/admin/products")}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          form="product-form"
          className="bg-site-green hover:bg-site-green-dark"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span>Salvando...</span>
          ) : (
            <span>{isEditing ? "Atualizar Produto" : "Adicionar Produto"}</span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductForm;
