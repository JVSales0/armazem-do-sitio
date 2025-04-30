
import { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  // Check if the image is a data URL or a regular URL
  const isDataUrl = product.imageUrl.startsWith('blob:') || product.imageUrl.startsWith('data:');

  return (
    <Card className="h-full flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <Link to={`/products/${product.id}`} className="flex-grow">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              // Fallback if image fails to load
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-xl mb-1 text-gray-900 dark:text-site-green-light line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-500 dark:text-gray-300 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
          <p className="text-site-green font-bold text-lg">
            {formatCurrency(product.price)} / {product.unit}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => addToCart(product, 1)}
          className="w-full bg-site-green hover:bg-site-green-dark"
          disabled={product.stock <= 0}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
