
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Plus, Minus, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface CartItemProps {
  product: Product;
  quantity: number;
}

const CartItem = ({ product, quantity }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      updateQuantity(product.id, newQuantity);
    }
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b border-gray-200">
      {/* Product image */}
      <div className="w-24 h-24 overflow-hidden rounded-md">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product details */}
      <div className="flex-grow text-center sm:text-left">
        <h4 className="font-medium text-lg mb-1">{product.name}</h4>
        <p className="text-gray-500 text-sm">{product.unit}</p>
        <p className="text-site-green font-medium">{formatCurrency(product.price)}</p>
      </div>

      {/* Quantity control */}
      <div className="flex items-center border border-gray-200 rounded-md">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
          className="h-8 w-8 rounded-l-md text-gray-500"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="px-4 py-1 text-center min-w-[40px]">{quantity}</div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={quantity >= product.stock}
          className="h-8 w-8 rounded-r-md text-gray-500"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Total price */}
      <div className="text-site-green font-semibold text-lg w-24 text-right">
        {formatCurrency(totalPrice)}
      </div>

      {/* Remove button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeFromCart(product.id)}
        className="text-gray-500 hover:text-red-500"
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default CartItem;
