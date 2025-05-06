
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import CartItem from "@/components/cart/CartItem";
import { Product } from "@/types/product";

interface CartItemsListProps {
  items: { product: Product; quantity: number }[];
  onClearCart: () => void;
}

const CartItemsList = ({ items, onClearCart }: CartItemsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Itens do Carrinho ({items.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <CartItem
              key={item.product.id}
              product={item.product}
              quantity={item.quantity}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Link to="/products">
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continuar Comprando
          </Button>
        </Link>
        <Button 
          variant="outline" 
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={onClearCart}
        >
          Limpar Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartItemsList;
