
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Truck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { trackOrder, DeliveryTracking } from "@/services/deliveryService";
import { formatDate } from "@/lib/utils";
import { useNotifications } from "@/contexts/NotificationContext";

const DeliveryTracker = () => {
  const [trackingCode, setTrackingCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState<DeliveryTracking | null>(null);
  const { toast } = useToast();
  const { addNotification } = useNotifications();

  const handleTrack = async () => {
    if (!trackingCode.trim()) {
      toast({
        title: "Código de rastreamento necessário",
        description: "Digite o código de rastreamento para continuar.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const info = await trackOrder(trackingCode);
      setTrackingInfo(info);
      
      // Adicionar a última atualização como uma notificação
      if (info.updates.length > 0) {
        const lastUpdate = info.updates[info.updates.length - 1];
        addNotification({
          orderId: info.orderId,
          status: lastUpdate.status,
          message: lastUpdate.message,
        });
      }
      
      toast({
        title: "Rastreamento atualizado",
        description: `Pedido #${info.orderId} encontrado.`,
      });
    } catch (error) {
      console.error("Erro ao rastrear pedido:", error);
      toast({
        title: "Erro ao rastrear",
        description: "Não foi possível obter informações de rastreamento. Verifique o código e tente novamente.",
        variant: "destructive",
      });
      setTrackingInfo(null);
    }
    setIsLoading(false);
  };

  const handleWhatsAppTracking = () => {
    if (!trackingInfo) return;
    
    const message = `Olá! Gostaria de obter informações sobre meu pedido #${trackingInfo.orderId} com código de rastreamento ${trackingInfo.trackingCode}.`;
    
    // Número de WhatsApp da empresa (fictício - substitua pelo número real)
    const phoneNumber = "5511999999999";
    
    // Criar URL do WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Rastreamento de Entrega
        </CardTitle>
        <CardDescription>
          Digite o código de rastreamento para acompanhar seu pedido
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input 
            placeholder="Código de rastreamento" 
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
          />
          <Button onClick={handleTrack} disabled={isLoading}>
            {isLoading ? "Buscando..." : "Rastrear"}
          </Button>
        </div>

        {trackingInfo && (
          <div className="mt-6 space-y-4">
            <div className="border rounded-md p-4">
              <p className="text-sm text-gray-500">Pedido</p>
              <p className="font-medium">{trackingInfo.orderId}</p>
              
              <p className="text-sm text-gray-500 mt-3">Status</p>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  trackingInfo.currentStatus === "delivered" 
                    ? "bg-green-500" 
                    : trackingInfo.currentStatus === "dispatched"
                    ? "bg-purple-500"
                    : "bg-yellow-500"
                }`}></div>
                <p className="font-medium">
                  {trackingInfo.currentStatus === "confirmed" && "Confirmado"}
                  {trackingInfo.currentStatus === "preparing" && "Preparando"}
                  {trackingInfo.currentStatus === "dispatched" && "Em rota de entrega"}
                  {trackingInfo.currentStatus === "delivered" && "Entregue"}
                </p>
              </div>
              
              <p className="text-sm text-gray-500 mt-3">Previsão de entrega</p>
              <p className="font-medium">{formatDate(trackingInfo.estimatedDelivery)}</p>
              
              <p className="text-sm text-gray-500 mt-3">Transportadora</p>
              <p className="font-medium">{trackingInfo.deliveryPartner}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Histórico</h3>
              <div className="space-y-3">
                {trackingInfo.updates.map((update, index) => (
                  <div 
                    key={index} 
                    className="relative pl-6 pb-3 border-l border-gray-200 last:border-0 last:pb-0"
                  >
                    <div className="absolute left-0 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"></div>
                    <p className="text-xs text-gray-500">{formatDate(update.date)}</p>
                    <p className="font-medium">{update.message}</p>
                    {update.location && (
                      <p className="text-sm text-gray-600">{update.location}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      {trackingInfo && (
        <CardFooter>
          <Button 
            className="w-full"
            variant="outline"
            onClick={handleWhatsAppTracking}
          >
            Continuar rastreamento via WhatsApp
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default DeliveryTracker;
