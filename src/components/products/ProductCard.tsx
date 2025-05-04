
import { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Image } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="h-full flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <Link to={`/products/${product.id}`} className="flex-grow">
        <div className="aspect-square overflow-hidden bg-gray-50">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                // If image fails to load, show placeholder
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop
                target.src = ""; // Clear src
                target.style.display = "none"; // Hide img element
                
                // Add icon
                const parent = target.parentElement;
                if (parent) {
                  const iconDiv = document.createElement('div');
                  iconDiv.className = "flex items-center justify-center h-full w-full";
                  
                  // Create SVG icon (using Lucide React would be better but this is a fallback)
                  const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                  iconSvg.setAttribute("width", "48");
                  iconSvg.setAttribute("height", "48");
                  iconSvg.setAttribute("viewBox", "0 0 24 24");
                  iconSvg.setAttribute("fill", "none");
                  iconSvg.setAttribute("stroke", "currentColor");
                  iconSvg.setAttribute("stroke-width", "2");
                  iconSvg.setAttribute("stroke-linecap", "round");
                  iconSvg.setAttribute("stroke-linejoin", "round");
                  iconSvg.classList.add("text-gray-300");
                  
                  // Lucide "image" icon path
                  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                  path1.setAttribute("x", "3");
                  path1.setAttribute("y", "3");
                  path1.setAttribute("width", "18");
                  path1.setAttribute("height", "18");
                  path1.setAttribute("rx", "2");
                  path1.setAttribute("ry", "2");
                  
                  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                  path2.setAttribute("cx", "8.5");
                  path2.setAttribute("cy", "8.5");
                  path2.setAttribute("r", "1.5");
                  
                  const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                  path3.setAttribute("d", "M21 15l-5-5L5 21");
                  
                  iconSvg.appendChild(path1);
                  iconSvg.appendChild(path2);
                  iconSvg.appendChild(path3);
                  iconDiv.appendChild(iconSvg);
                  
                  parent.appendChild(iconDiv);
                }
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <Image className="h-16 w-16 text-gray-300" />
            </div>
          )}
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
