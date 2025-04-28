
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export type OrderStatus = 
  | "confirmed"  // Pedido confirmado
  | "preparing"  // Preparando pedido
  | "dispatched" // Saiu para entrega
  | "delivered"; // Entregue

export type OrderNotification = {
  id: string;
  orderId: string;
  status: OrderStatus;
  message: string;
  date: Date;
  read: boolean;
};

type NotificationContextType = {
  notifications: OrderNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<OrderNotification, "id" | "date" | "read">) => void;
  clearNotifications: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<OrderNotification[]>([]);
  const { toast } = useToast();

  // Load notifications from localStorage
  useEffect(() => {
    const savedNotifications = localStorage.getItem("notifications");
    if (savedNotifications) {
      try {
        // Parse dates from strings back to Date objects
        const parsedNotifications = JSON.parse(savedNotifications).map((n: any) => ({
          ...n,
          date: new Date(n.date)
        }));
        setNotifications(parsedNotifications);
      } catch (error) {
        console.error("Failed to parse saved notifications", error);
      }
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = (notification: Omit<OrderNotification, "id" | "date" | "read">) => {
    const newNotification: OrderNotification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      date: new Date(),
      read: false,
    };

    setNotifications((prev) => [newNotification, ...prev]);

    // Show toast for the new notification
    toast({
      title: "Atualização do Pedido",
      description: notification.message,
    });
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
