
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NotificationItem from "@/components/notifications/NotificationItem";
import { useNotifications } from "@/contexts/NotificationContext";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Notifications = () => {
  const { notifications, markAllAsRead, unreadCount, addNotification } = useNotifications();
  const [showAll, setShowAll] = useState(true);
  
  // Demo: Add a test notification (just for testing)
  const addTestNotification = () => {
    const statuses: ("confirmed" | "preparing" | "dispatched" | "delivered")[] = [
      "confirmed", "preparing", "dispatched", "delivered"
    ];
    
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomOrderId = Math.floor(10000 + Math.random() * 90000).toString();
    
    const messages = {
      confirmed: `Seu pedido #${randomOrderId} foi recebido e está sendo processado.`,
      preparing: `Seu pedido #${randomOrderId} está sendo preparado.`,
      dispatched: `Seu pedido #${randomOrderId} saiu para entrega.`,
      delivered: `Seu pedido #${randomOrderId} foi entregue. Bom apetite!`,
    };
    
    addNotification({
      orderId: randomOrderId,
      status: randomStatus,
      message: messages[randomStatus],
    });
  };

  const filteredNotifications = showAll 
    ? notifications 
    : notifications.filter((n) => !n.read);
  
  return (
    <Layout>
      <div className="container mx-auto max-w-5xl py-12 px-4">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="flex items-center text-gray-600 hover:text-site-green">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Voltar para a Página Inicial
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Notificações</CardTitle>
            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <Button 
                  variant="outline" 
                  onClick={markAllAsRead}
                  className="text-site-green border-site-green hover:bg-site-green hover:text-white"
                >
                  Marcar todas como lidas
                </Button>
              )}
              <Button
                variant={showAll ? "default" : "outline"}
                onClick={() => setShowAll(true)}
                className={showAll ? "bg-site-green hover:bg-site-green-dark" : ""}
              >
                Todas
              </Button>
              <Button
                variant={!showAll ? "default" : "outline"}
                onClick={() => setShowAll(false)}
                className={!showAll ? "bg-site-green hover:bg-site-green-dark" : ""}
              >
                Não lidas {unreadCount > 0 && `(${unreadCount})`}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Demo button - Only visible for testing */}
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={addTestNotification}
                className="text-gray-500"
              >
                Adicionar Notificação de Teste
              </Button>
              <p className="text-xs text-gray-500 mt-1">
                (Este botão é apenas para demonstração)
              </p>
            </div>
            
            <div className="space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    {showAll 
                      ? "Você não tem nenhuma notificação." 
                      : "Você não tem notificações não lidas."}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Notifications;
