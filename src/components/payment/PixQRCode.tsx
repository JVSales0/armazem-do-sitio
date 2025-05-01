
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from "lucide-react";

interface PixQRCodeProps {
  value: number;
  description?: string;
  pixKey: string;
  merchantName: string;
  city?: string;
}

const PixQRCode = ({ value, description = "", pixKey, merchantName, city = "CIDADE" }: PixQRCodeProps) => {
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);

  // Esta função simula a geração de um código QR para pagamento PIX
  useEffect(() => {
    // Em um ambiente real, você chamaria uma API para gerar o código QR baseado no payload PIX
    // Aqui estamos apenas simulando com uma imagem gerada via API pública
    
    // Formatando o valor para o formato esperado (2 casas decimais)
    const formattedValue = value.toFixed(2).replace('.', '');
    
    // Criando um payload PIX simplificado (este é um payload simulado e não funcionaria em ambiente real)
    const pixPayload = `00020126330014br.gov.bcb.pix01${pixKey.length}${pixKey}52040000530398654${formattedValue}5802BR5903${merchantName}6006${city}62070503***63041234`;
    
    // Gerando uma imagem QR Code via API (usamos a API do QR Code Generator para simulação)
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixPayload)}`;
    setQrCodeImage(qrImageUrl);
  }, [value, pixKey, merchantName, city]);

  const copyPixCode = () => {
    // Em um ambiente real, você copiaria a string codificada do PIX para a área de transferência
    alert("Código PIX copiado para a área de transferência!");
    // navigator.clipboard.writeText(pixCodeString) seria usado em implementação real
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Pagamento via PIX
        </CardTitle>
        <CardDescription>
          Escaneie o QR code abaixo com o app do seu banco para efetuar o pagamento
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {qrCodeImage ? (
          <div className="p-4 bg-white rounded-lg">
            <img 
              src={qrCodeImage} 
              alt="QR Code para pagamento PIX" 
              className="w-48 h-48 mx-auto"
            />
          </div>
        ) : (
          <div className="w-48 h-48 flex items-center justify-center bg-gray-100 rounded-lg">
            <span className="text-gray-400">Gerando QR Code...</span>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <p className="font-medium">Valor: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}</p>
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={copyPixCode} className="w-full">
          Copiar código PIX
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PixQRCode;
