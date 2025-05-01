
import { OrderNotification, OrderStatus } from "@/contexts/NotificationContext";

export interface DeliveryTracking {
  orderId: string;
  currentStatus: OrderStatus;
  estimatedDelivery: Date;
  trackingCode: string;
  deliveryPartner: string;
  updates: {
    status: OrderStatus;
    date: Date;
    location?: string;
    message: string;
  }[];
}

// Exemplo de serviço que seria conectado a um webhook real de uma transportadora
export const trackOrder = async (trackingCode: string): Promise<DeliveryTracking> => {
  // Em um ambiente real, isso faria uma chamada para a API da transportadora
  // Aqui estamos simulando uma resposta
  
  // Simulando um delay de rede
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // Gerando dados de exemplo baseados no código de rastreamento
  const randomOrderId = `${Math.floor(Math.random() * 90000) + 10000}`;
  
  // Randomizar o status baseado no código de rastreamento (para simulação)
  const statuses: OrderStatus[] = ["confirmed", "preparing", "dispatched", "delivered"];
  const statusIndex = parseInt(trackingCode.slice(-1)) % 4;
  const currentStatus = statuses[statusIndex];
  
  // Criar um histórico de atualizações baseado no status atual
  const updates = [];
  
  // Sempre adiciona "confirmed"
  updates.push({
    status: "confirmed" as OrderStatus,
    date: new Date(Date.now() - 172800000), // 2 dias atrás
    location: "Central de Distribuição",
    message: `Pedido #${randomOrderId} foi recebido e está sendo processado.`,
  });
  
  // Adiciona "preparing" se o status for igual ou maior
  if (statusIndex >= 1) {
    updates.push({
      status: "preparing" as OrderStatus,
      date: new Date(Date.now() - 86400000), // 1 dia atrás
      location: "Centro de Preparação",
      message: `Pedido #${randomOrderId} está sendo preparado.`,
    });
  }
  
  // Adiciona "dispatched" se o status for igual ou maior
  if (statusIndex >= 2) {
    updates.push({
      status: "dispatched" as OrderStatus,
      date: new Date(Date.now() - 43200000), // 12 horas atrás
      location: "Em rota de entrega",
      message: `Pedido #${randomOrderId} saiu para entrega.`,
    });
  }
  
  // Adiciona "delivered" se o status for igual
  if (statusIndex === 3) {
    updates.push({
      status: "delivered" as OrderStatus,
      date: new Date(), // Agora
      location: "Entregue ao destinatário",
      message: `Pedido #${randomOrderId} foi entregue. Bom apetite!`,
    });
  }
  
  return {
    orderId: randomOrderId,
    currentStatus,
    estimatedDelivery: new Date(Date.now() + 259200000), // 3 dias à frente
    trackingCode,
    deliveryPartner: "LojaOrganica Express",
    updates,
  };
};

// Função que simularia o envio de dados para o webhook da transportadora
export const requestDelivery = async (
  orderData: {
    orderId: string;
    address: string;
    items: { name: string; quantity: number }[];
    customerName: string;
    customerPhone: string;
  }
): Promise<{ trackingCode: string; success: boolean; message: string }> => {
  // Em um ambiente real, isso enviaria dados para a API da transportadora
  // e receberia um código de rastreamento
  
  // Simulando um delay de rede
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Gerar um código de rastreamento aleatório
  const trackingCode = `LORG${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 9)}`;
  
  return {
    trackingCode,
    success: true,
    message: "Pedido registrado para entrega com sucesso!"
  };
};
