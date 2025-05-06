
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PixQRCode from "@/components/payment/PixQRCode";

interface PixPaymentProps {
  totalPrice: number;
  onConfirmPayment: () => void;
}

const PixPayment = ({ totalPrice, onConfirmPayment }: PixPaymentProps) => {
  return (
    <>
      <PixQRCode
        value={totalPrice}
        description="Pagamento Armazém do Sítio"
        pixKey="12345678901"
        merchantName="ARMAZEMDOSITIO"
        city="LOANDA"
      />
      <Button 
        onClick={onConfirmPayment}
        className="w-full bg-site-green hover:bg-site-green-dark py-4 mt-4"
      >
        Confirmar Pagamento PIX
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </>
  );
};

export default PixPayment;
