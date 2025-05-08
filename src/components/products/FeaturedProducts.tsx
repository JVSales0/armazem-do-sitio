
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/types/product";

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
              <div className="aspect-video overflow-hidden">
                <img 
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
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
