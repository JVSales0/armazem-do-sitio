
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Product, ProductCategory } from "@/types/product";
import { addProduct, updateProduct } from "@/services/productService";
import ProductFormFields from "./ProductFormFields";
import ImageUpload from "./ImageUpload";

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
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleImageChange = (
    newImageUrl: string, 
    newLocalImage: File | null, 
    newPreviewUrl: string | null
  ) => {
    setImageUrl(newImageUrl);
    setLocalImage(newLocalImage);
    setPreviewUrl(newPreviewUrl);
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

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-site-green">
          {isEditing ? "Editar Produto" : "Adicionar Novo Produto"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form id="product-form" onSubmit={handleSubmit} className="space-y-4">
          <ProductFormFields 
            name={name}
            description={description}
            price={price}
            stock={stock}
            unit={unit}
            category={category}
            onNameChange={setName}
            onDescriptionChange={setDescription}
            onPriceChange={setPrice}
            onStockChange={setStock}
            onUnitChange={setUnit}
            onCategoryChange={setCategory}
          />
          
          <ImageUpload
            initialImageUrl={product?.imageUrl || "/placeholder.svg"}
            onImageChange={handleImageChange}
          />
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
