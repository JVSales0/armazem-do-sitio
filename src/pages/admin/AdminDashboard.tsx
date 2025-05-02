
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import SalesChart from "@/components/admin/dashboard/SalesChart";
import OrdersOverview from "@/components/admin/dashboard/OrdersOverview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useNotifications } from "@/contexts/NotificationContext";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Web socket connection for real-time notifications
const setupWebsocket = (onMessage: (data: any) => void) => {
  // In a real implementation, this would connect to a real WebSocket server
  // For demo purposes, we're simulating with timeouts
  
  console.log("Setting up WebSocket connection for real-time notifications...");
  
  // Simulate connection established
  setTimeout(() => {
    console.log("WebSocket connected");
    
    // Simulate occasional incoming messages
    const interval = setInterval(() => {
      // Only send notifications occasionally (20% chance each minute)
      if (Math.random() < 0.20) {
        const orderId = `WS-${Math.floor(10000 + Math.random() * 90000)}`;
        const statuses = ["confirmed", "preparing", "dispatched", "delivered"];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        const messages = {
          confirmed: `Novo pedido #${orderId} recebido.`,
          preparing: `Pedido #${orderId} em preparação.`,
          dispatched: `Pedido #${orderId} saiu para entrega.`,
          delivered: `Pedido #${orderId} entregue com sucesso.`,
        };
        
        onMessage({
          orderId,
          status,
          message: messages[status as keyof typeof messages],
        });
      }
    }, 60000); // Check every minute
    
    return () => {
      console.log("WebSocket disconnected");
      clearInterval(interval);
    };
  }, 1000);
  
  // Return dummy cleanup function
  return () => {};
};

const AdminDashboard = () => {
  const { isAdmin, isLoading } = useAuth();
  const { notifications, addNotification, unreadCount, markAllAsRead } = useNotifications();
  const [recentNotifications, setRecentNotifications] = useState<Array<any>>([]);
  const { toast } = useToast();

  // Set up WebSocket for real-time notifications
  useEffect(() => {
    const handleNotification = (data: any) => {
      addNotification(data);
      toast({
        title: "Nova notificação",
        description: data.message,
      });
    };
    
    const cleanup = setupWebsocket(handleNotification);
    
    return () => {
      cleanup();
    };
  }, [addNotification, toast]);
  
  // Update recent notifications when notifications change
  useEffect(() => {
    setRecentNotifications(notifications.slice(0, 5));
  }, [notifications]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto max-w-5xl py-12 px-4">
          <div className="text-center py-12">Verificando credenciais...</div>
        </div>
      </Layout>
    );
  }

  // Redirect if not admin or staff
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto max-w-7xl py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold dark:text-white">Dashboard</h1>
          
          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 dark:border-gray-700 dark:text-white"
              onClick={() => markAllAsRead()}
            >
              <Bell className="h-4 w-4" />
              Notificações
              {unreadCount > 0 && (
                <Badge className="bg-site-green dark:bg-site-green text-white">{unreadCount}</Badge>
              )}
            </Button>
          </div>
        </div>
        
        {recentNotifications.length > 0 && (
          <Card className="mb-6 dark:border-gray-700 dark-elevated">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg dark:text-white">Notificações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentNotifications.map((notification) => (
                  <div key={notification.id} className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium dark:text-white">Pedido #{notification.orderId}</span>
                      <Badge
                        className={
                          notification.status === "confirmed" ? "bg-blue-500 dark:bg-blue-600" :
                          notification.status === "preparing" ? "bg-yellow-500 dark:bg-yellow-600" :
                          notification.status === "dispatched" ? "bg-purple-500 dark:bg-purple-600" :
                          "bg-green-500 dark:bg-green-600"
                        }
                      >
                        {notification.status === "confirmed" ? "Confirmado" :
                         notification.status === "preparing" ? "Preparando" :
                         notification.status === "dispatched" ? "A caminho" :
                         "Entregue"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="dark:border-gray-700 dark-elevated">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg dark:text-white">Vendas da Semana</CardTitle>
            </CardHeader>
            <CardContent>
              <SalesChart />
            </CardContent>
          </Card>

          <Card className="dark:border-gray-700 dark-elevated">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg dark:text-white">Visão Geral dos Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <OrdersOverview />
            </CardContent>
          </Card>
        </div>

        <Card className="dark:border-gray-700 dark-elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg dark:text-white">Resumo Financeiro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border border-transparent dark:border-green-900/30">
                <p className="text-sm text-gray-600 dark:text-gray-300">Receita total (semana)</p>
                <p className="text-2xl font-semibold dark:text-white">R$ 4.750,00</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-transparent dark:border-blue-900/30">
                <p className="text-sm text-gray-600 dark:text-gray-300">Pedidos (semana)</p>
                <p className="text-2xl font-semibold dark:text-white">32</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-md border border-transparent dark:border-purple-900/30">
                <p className="text-sm text-gray-600 dark:text-gray-300">Média por pedido</p>
                <p className="text-2xl font-semibold dark:text-white">R$ 148,43</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md border border-transparent dark:border-yellow-900/30">
                <p className="text-sm text-gray-600 dark:text-gray-300">Novos clientes</p>
                <p className="text-2xl font-semibold dark:text-white">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
