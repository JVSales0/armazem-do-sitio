
import { Button } from "@/components/ui/button";
import { OrderNotification, useNotifications } from "@/contexts/NotificationContext";
import { cn, formatDate } from "@/lib/utils";

interface NotificationItemProps {
  notification: OrderNotification;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const { markAsRead } = useNotifications();

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "preparing":
        return "bg-yellow-100 text-yellow-800";
      case "dispatched":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Helper function to get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmado";
      case "preparing":
        return "Preparando";
      case "dispatched":
        return "A caminho";
      case "delivered":
        return "Entregue";
      default:
        return status;
    }
  };

  return (
    <div 
      className={cn(
        "border rounded-lg p-4 transition-colors",
        notification.read ? "bg-white" : "bg-site-green-light"
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex space-x-2 items-center">
          <div className="font-medium">Pedido #{notification.orderId}</div>
          <div className={cn("text-xs px-2 py-1 rounded-full", getStatusColor(notification.status))}>
            {getStatusText(notification.status)}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {formatDate(notification.date)}
        </div>
      </div>
      
      <p className="my-2">{notification.message}</p>
      
      {!notification.read && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => markAsRead(notification.id)}
          className="mt-2"
        >
          Marcar como lido
        </Button>
      )}
    </div>
  );
};

export default NotificationItem;
