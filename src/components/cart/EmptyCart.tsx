
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const EmptyCart = () => {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-medium mb-6">Seu carrinho está vazio</h2>
      <p className="text-gray-500 mb-8">
        Adicione alguns produtos para começar suas compras.
      </p>
      <Link to="/products">
        <Button className="bg-site-green hover:bg-site-green-dark">
          Ir para Produtos
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
};

export default EmptyCart;
