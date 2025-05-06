
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

interface WhatsAppPaymentProps {
  phoneNumber: string;
  onPhoneNumberChange: (value: string) => void;
  onCheckout: () => void;
}

const WhatsAppPayment = ({ 
  phoneNumber, 
  onPhoneNumberChange, 
  onCheckout 
}: WhatsAppPaymentProps) => {
  return (
    <div className="mt-2 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Número do WhatsApp da Loja
        </label>
        <Input
          type="tel"
          value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
          className="mb-1"
          readOnly
        />
        <p className="text-xs text-gray-500">
          Formato: 5545988249785 (país+DDD+número)
        </p>
      </div>
      
      <Button 
        onClick={onCheckout}
        className="w-full bg-site-green hover:bg-site-green-dark py-6 mt-4"
      >
        Finalizar Compra via WhatsApp
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default WhatsAppPayment;
