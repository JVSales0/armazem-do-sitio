
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import WhatsAppPayment from "./payment/WhatsAppPayment";
import PixPayment from "./payment/PixPayment";

interface OrderSummaryProps {
  totalPrice: number;
  phoneNumber: string;
  onPhoneNumberChange: (value: string) => void;
  onWhatsAppCheckout: () => void;
  onPixPaymentConfirm: () => void;
  isAuthenticated: boolean;
  selectedPaymentTab: string;
  onPaymentTabChange: (value: string) => void;
}

const OrderSummary = ({
  totalPrice,
  phoneNumber,
  onPhoneNumberChange,
  onWhatsAppCheckout,
  onPixPaymentConfirm,
  isAuthenticated,
  selectedPaymentTab,
  onPaymentTabChange
}: OrderSummaryProps) => {
  return (
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
          
          {!isAuthenticated ? (
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
              value={selectedPaymentTab}
              onValueChange={onPaymentTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
                <TabsTrigger value="pix">PIX</TabsTrigger>
              </TabsList>
              
              <TabsContent value="whatsapp" className="pt-4">
                <WhatsAppPayment 
                  phoneNumber={phoneNumber}
                  onPhoneNumberChange={onPhoneNumberChange}
                  onCheckout={onWhatsAppCheckout}
                />
              </TabsContent>
              
              <TabsContent value="pix" className="pt-4">
                <PixPayment 
                  totalPrice={totalPrice}
                  onConfirmPayment={onPixPaymentConfirm}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </CardContent>
      {!isAuthenticated && (
        <CardFooter>
          <Button 
            onClick={onWhatsAppCheckout}
            className="w-full bg-site-green hover:bg-site-green-dark py-6"
          >
            Finalizar Compra via WhatsApp
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default OrderSummary;
