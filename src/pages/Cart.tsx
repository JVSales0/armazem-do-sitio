import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, QrCode, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import CartItem from "@/components/cart/CartItem";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from "@/contexts/NotificationContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PixQRCode from "@/components/payment/PixQRCode";
import { useAuth } from "@/contexts/AuthContext";

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

  return (
    <Layout>
      <div className="container mx-auto max-w-5xl py-12 px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Meu Carrinho</h1>

        {items.length === 0 ? (
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
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Itens do Carrinho ({totalItems})</CardTitle>
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
                    onClick={() => clearCart()}
                  >
                    Limpar Carrinho
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Order summary and payment options */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between py-2">
                    <span>Subtotal</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>Entrega</span>
                    <span>A combinar</span>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-site-green">{formatCurrency(totalPrice)}</span>
                    </div>
                  </div>

                  {/* Payment options */}
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Forma de Pagamento</h3>
                    
                    {!user ? (
                      <div className="text-center p-4 border border-dashed border-gray-300 rounded-md">
                        <p className="mb-4 text-gray-600">
                          Crie uma conta ou faça login para acessar todas as opções de pagamento
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                          <Link to="/login">
                            <Button variant="outline" className="w-full sm:w-auto">
                              Fazer Login
                            </Button>
                          </Link>
                          <Link to="/register">
                            <Button className="w-full sm:w-auto bg-site-green hover:bg-site-green-dark">
                              Criar Conta
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <Tabs 
                        defaultValue="whatsapp" 
                        value={paymentTab}
                        onValueChange={setPaymentTab}
                        className="w-full"
                      >
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
                          <TabsTrigger value="pix">PIX</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="whatsapp" className="pt-4">
                          <div className="mt-2 mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Número do WhatsApp da Loja
                            </label>
                            <Input
                              type="tel"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="mb-1"
                              readOnly
                            />
                            <p className="text-xs text-gray-500">
                              Formato: 5545988249785 (país+DDD+número)
                            </p>
                          </div>
                          
                          <Button 
                            onClick={handleWhatsAppCheckout}
                            className="w-full bg-site-green hover:bg-site-green-dark py-6 mt-4"
                          >
                            Finalizar Compra via WhatsApp
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </TabsContent>
                        
                        <TabsContent value="pix" className="pt-4">
                          <PixQRCode
                            value={totalPrice}
                            description="Pagamento Armazém do Sítio"
                            pixKey="12345678901"
                            merchantName="ARMAZEMDOSITIO"
                            city="SAO PAULO"
                          />
                        </TabsContent>
                      </Tabs>
                    )}
                    
                  </div>
                </CardContent>
                {!user && (
                  <CardFooter>
                    <Button 
                      onClick={handleWhatsAppCheckout}
                      className="w-full bg-site-green hover:bg-site-green-dark py-6"
                    >
                      Finalizar Compra via WhatsApp
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
