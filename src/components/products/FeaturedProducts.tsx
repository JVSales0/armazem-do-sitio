
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/types/product";
import { Image } from "lucide-react";

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
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

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Destaques Recentes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id}>
            <Card className="h-full hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <div className="aspect-video overflow-hidden bg-gray-50 relative">
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // Prevent infinite loop
                      target.style.display = "none";
                      
                      // Add placeholder icon
                      const parent = target.parentElement;
                      if (parent) {
                        const iconDiv = document.createElement('div');
                        iconDiv.className = "flex items-center justify-center h-full w-full";
                        
                        // Create an SVG icon similar to Lucide's Image icon
                        const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        iconSvg.setAttribute("width", "40");
                        iconSvg.setAttribute("height", "40");
                        iconSvg.setAttribute("viewBox", "0 0 24 24");
                        iconSvg.setAttribute("fill", "none");
                        iconSvg.setAttribute("stroke", "currentColor");
                        iconSvg.setAttribute("stroke-width", "2");
                        iconSvg.setAttribute("stroke-linecap", "round");
                        iconSvg.setAttribute("stroke-linejoin", "round");
                        iconSvg.classList.add("text-gray-300");
                        
                        // Add the paths for the image icon
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
                    <Image className="h-12 w-12 text-gray-300" />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-lg">{product.name}</h4>
                    <p className="text-sm text-gray-500">{translateCategory(product.category)}</p>
                  </div>
                  <span className="font-bold text-site-green">
                    {formatCurrency(product.price)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
