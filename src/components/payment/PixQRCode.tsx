
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNotifications } from "@/contexts/NotificationContext";

interface PixQRCodeProps {
  value: number;
  description?: string;
  pixKey: string;
  merchantName: string;
  city?: string;
}

const PixQRCode = ({ value, description = "", pixKey, merchantName, city = "CIDADE" }: PixQRCodeProps) => {
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pixCodeString, setPixCodeString] = useState<string>("");
  const { addNotification } = useNotifications();

  // Simulate PagSeguro PIX QR code generation
  useEffect(() => {
    const generatePagSeguroQRCode = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would be an API call to PagSeguro
        // For demo purposes, we're simulating the generation
        
        // Formatando o valor para o formato esperado (2 casas decimais)
        const formattedValue = value.toFixed(2).replace('.', '');
        
        // Simulating PagSeguro API response delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Creating a simulated PagSeguro payload for PIX
        const pixPayload = `00020126580014br.gov.bcb.pix0136${pixKey}5204000053039865406${formattedValue}5802BR5913${merchantName}6006${city}62070503***6304`;
        
        // Generate checksum (this is a simplified simulation)
        const checksum = Math.floor(1000 + Math.random() * 9000).toString();
        const fullPayload = `${pixPayload}${checksum}`;
        
        setPixCodeString(fullPayload);
        
        // Using the API for QR code generation
        const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(fullPayload)}`;
        setQrCodeImage(qrImageUrl);

        // Simulate payment processing flow
        setTimeout(() => {
          const orderId = `PS-${Date.now().toString().slice(-6)}`;
          addNotification({
            orderId,
            status: "confirmed",
            message: `Pagamento PIX de R$ ${value.toFixed(2)} recebido com sucesso.`,
          });
        }, 5000);
      } catch (error) {
        console.error("Erro ao gerar QR code PIX:", error);
        toast({
          title: "Erro",
          description: "Falha ao gerar o QR code para pagamento PIX.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    generatePagSeguroQRCode();
  }, [value, pixKey, merchantName, city, addNotification]);

  const copyPixCode = () => {
    if (pixCodeString) {
      navigator.clipboard.writeText(pixCodeString)
        .then(() => {
          toast({
            title: "Código PIX copiado",
            description: "Código PIX copiado para a área de transferência."
          });
        })
        .catch(err => {
          console.error("Erro ao copiar código PIX:", err);
          toast({
            title: "Erro",
            description: "Não foi possível copiar o código PIX.",
            variant: "destructive",
          });
        });
    }
  };

  return (
    <Card className="max-w-md mx-auto dark:border-gray-700 dark-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 dark:text-white">
          <QrCode className="h-5 w-5" />
          Pagamento via PIX (PagSeguro)
        </CardTitle>
        <CardDescription className="dark:text-gray-300">
          Escaneie o QR code abaixo com o app do seu banco para efetuar o pagamento
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {isLoading ? (
          <div className="w-48 h-48 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse">
            <span className="text-gray-400 dark:text-gray-500">Gerando QR Code...</span>
          </div>
        ) : qrCodeImage ? (
          <div className="p-4 bg-white dark:bg-white rounded-lg shadow-sm">
            <img 
              src={qrCodeImage} 
              alt="QR Code para pagamento PIX" 
              className="w-48 h-48 mx-auto"
            />
          </div>
        ) : (
          <div className="w-48 h-48 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
            <span className="text-gray-400 dark:text-gray-500">Erro ao gerar QR Code</span>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <p className="font-medium dark:text-white">Valor: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}</p>
          {description && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>}
          <p className="text-xs text-green-600 dark:text-green-400 mt-2">Processado por PagSeguro</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={copyPixCode} 
          className="w-full bg-site-green hover:bg-site-green-dark dark:bg-site-green dark:hover:bg-site-green-dark"
          disabled={isLoading || !pixCodeString}
        >
          {isLoading ? "Gerando código..." : "Copiar código PIX"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PixQRCode;
