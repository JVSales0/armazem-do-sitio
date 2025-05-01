
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";

// Dados de exemplo para os pedidos (seria substituído por dados reais de uma API)
const recentOrders = [
  { id: "12345", customer: "Maria Silva", date: new Date(), total: 235.90, status: "delivered" },
  { id: "12344", customer: "João Santos", date: new Date(Date.now() - 86400000), total: 129.50, status: "dispatched" },
  { id: "12343", customer: "Ana Oliveira", date: new Date(Date.now() - 172800000), total: 78.20, status: "preparing" },
  { id: "12342", customer: "Carlos Mendes", date: new Date(Date.now() - 259200000), total: 342.10, status: "confirmed" },
  { id: "12341", customer: "Luciana Costa", date: new Date(Date.now() - 345600000), total: 189.75, status: "delivered" },
];

const OrdersOverview = () => {
  // Helper function to get status color and text
  const getOrderStatus = (status: string) => {
    switch (status) {
      case "confirmed":
        return { 
          color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300", 
          text: "Confirmado" 
        };
      case "preparing":
        return { 
          color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300", 
          text: "Preparando" 
        };
      case "dispatched":
        return { 
          color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300", 
          text: "Enviado" 
        };
      case "delivered":
        return { 
          color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300", 
          text: "Entregue" 
        };
      default:
        return { 
          color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300", 
          text: status 
        };
    }
  };

  return (
    <div>
      <div className="rounded-md border dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="dark:border-gray-700 dark:bg-dark-bg-secondary">
              <TableHead className="dark:text-gray-300">Pedido</TableHead>
              <TableHead className="dark:text-gray-300">Cliente</TableHead>
              <TableHead className="hidden md:table-cell dark:text-gray-300">Data</TableHead>
              <TableHead className="dark:text-gray-300">Valor</TableHead>
              <TableHead className="dark:text-gray-300">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => {
              const status = getOrderStatus(order.status);
              return (
                <TableRow key={order.id} className="dark:border-gray-700 dark:hover:bg-dark-bg-secondary/50">
                  <TableCell className="font-medium dark:text-white">{order.id}</TableCell>
                  <TableCell className="dark:text-gray-300">{order.customer}</TableCell>
                  <TableCell className="hidden md:table-cell dark:text-gray-300">{formatDate(order.date)}</TableCell>
                  <TableCell className="dark:text-white">{formatCurrency(order.total)}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${status.color}`}>
                      {status.text}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrdersOverview;
