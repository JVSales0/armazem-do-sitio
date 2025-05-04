
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { getProductById } from "@/services/productService";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import { Plus, Minus, ArrowLeft, ShoppingCart } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct || null);
      setIsLoading(false);
    }
  }, [id]);

  const handleQuantityChange = (newQuantity: number) => {
    if (product && newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  // Helper function to translate categories to Portuguese
  const translateCategory = (category: string) => {
    const translations: Record<string, string> = {
      frutas: "Frutas",
      legumes: "Legumes",
      verduras: "Verduras",
      graos: "Grãos",
      conservas: "Conservas",
      doces: "Doces",
      bebidas: "Bebidas",
      carnes: "Carnes",
      laticinios: "Laticínios",
      temperos: "Temperos",
      organicos: "Orgânicos",
      outros: "Outros"
    };
    
    return translations[category] || category;
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto max-w-5xl py-12 px-4">
          <div className="text-center py-12">Carregando produto...</div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto max-w-5xl py-12 px-4">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">Produto não encontrado</h2>
            <Link to="/products">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Produtos
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto max-w-5xl py-12 px-4">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/products">
            <Button variant="ghost" className="flex items-center text-gray-600 hover:text-site-green">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Voltar para Produtos
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product image */}
              <div className="p-6 flex items-center justify-center bg-white">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="max-h-80 object-contain"
                  onError={(e) => {
                    // Fallback if image fails to load
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>

              {/* Product details */}
              <div className="p-6 flex flex-col">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
                
                <div className="mb-4">
                  <span className="inline-block bg-site-green-light text-site-green text-sm px-3 py-1 rounded-full">
                    {translateCategory(product.category)}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-6">{product.description}</p>
                
                <div className="text-2xl font-bold text-site-green mb-4">
                  {formatCurrency(product.price)} / {product.unit}
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Disponibilidade:</p>
                  {product.stock > 0 ? (
                    <p className="text-green-600 font-medium">Em estoque ({product.stock} {product.unit})</p>
                  ) : (
                    <p className="text-red-500 font-medium">Fora de estoque</p>
                  )}
                </div>
                
                <div className="flex flex-col space-y-4 mt-auto">
                  {/* Quantity control */}
                  <div className="flex items-center">
                    <span className="text-gray-700 mr-4">Quantidade:</span>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className="h-10 w-10 rounded-l-md"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="px-6 py-2 text-center min-w-[40px]">{quantity}</div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= product.stock}
                        className="h-10 w-10 rounded-r-md"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Add to cart button */}
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-site-green hover:bg-site-green-dark py-6"
                    disabled={product.stock <= 0}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProductDetail;
