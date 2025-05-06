
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from "@/contexts/NotificationContext";
import { useAuth } from "@/contexts/AuthContext";
import EmptyCart from "@/components/cart/EmptyCart";
import CartItemsList from "@/components/cart/CartItemsList";
import OrderSummary from "@/components/cart/OrderSummary";

const Cart = () => {
  const { items, totalItems, totalPrice, clearCart, checkoutViaWhatsApp } = useCart();
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const { user } = useAuth();
  
  // WhatsApp number for checkout - updated to the new number
  const [phoneNumber, setPhoneNumber] = useState("5545988249785");
  
  // Payment tab selection
  const [paymentTab, setPaymentTab] = useState<string>("whatsapp");
  
  const handleWhatsAppCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione produtos ao carrinho antes de finalizar a compra.",
        variant: "destructive",
      });
      return;
    }
    
    // Generate a random order ID for demo purposes
    const orderId = `${Date.now().toString().slice(-6)}`;
    
    // Redirect to WhatsApp with the order
    checkoutViaWhatsApp(phoneNumber);
    
    // Add notification about the order (for demo purposes)
    addNotification({
      orderId,
      status: "confirmed",
      message: `Seu pedido #${orderId} foi recebido e está sendo processado.`,
    });
    
    // Clear the cart after checkout
    clearCart();
    
    // Demo: Add more notifications for this order over time
    setTimeout(() => {
      addNotification({
        orderId,
        status: "preparing",
        message: `Seu pedido #${orderId} está sendo preparado.`,
      });
    }, 6000);
    
    setTimeout(() => {
      addNotification({
        orderId,
        status: "dispatched",
        message: `Seu pedido #${orderId} saiu para entrega.`,
      });
    }, 12000);
  };

  // Handler for manual payment confirmation (new)
  const handleConfirmPixPayment = () => {
    if (items.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione produtos ao carrinho antes de finalizar a compra.",
        variant: "destructive",
      });
      return;
    }
    
    // Generate a random order ID for PIX payment
    const orderId = `PIX-${Date.now().toString().slice(-6)}`;
    
    // Add notification about the PIX payment
    addNotification({
      orderId,
      status: "confirmed",
      message: `Pagamento PIX de ${formatCurrency(totalPrice)} recebido com sucesso.`,
    });
    
    // Clear the cart after payment
    clearCart();
    
    toast({
      title: "Pagamento confirmado",
      description: "Seu pagamento PIX foi confirmado. Obrigado pela compra!",
    });
    
    // Demo: Add more notifications for this order over time
    setTimeout(() => {
      addNotification({
        orderId,
        status: "preparing",
        message: `Seu pedido #${orderId} está sendo preparado.`,
      });
    }, 6000);
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-5xl py-12 px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Meu Carrinho</h1>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <CartItemsList 
                items={items}
                onClearCart={clearCart}
              />
            </div>

            {/* Order summary and payment options */}
            <div>
              <OrderSummary
                totalPrice={totalPrice}
                phoneNumber={phoneNumber}
                onPhoneNumberChange={setPhoneNumber}
                onWhatsAppCheckout={handleWhatsAppCheckout}
                onPixPaymentConfirm={handleConfirmPixPayment}
                isAuthenticated={!!user}
                selectedPaymentTab={paymentTab}
                onPaymentTabChange={setPaymentTab}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

// Adding formatCurrency import because it's used in handleConfirmPixPayment
import { formatCurrency } from "@/lib/utils";

export default Cart;
