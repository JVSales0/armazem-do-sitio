
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
        return { color: "bg-blue-100 text-blue-800", text: "Confirmado" };
      case "preparing":
        return { color: "bg-yellow-100 text-yellow-800", text: "Preparando" };
      case "dispatched":
        return { color: "bg-purple-100 text-purple-800", text: "Enviado" };
      case "delivered":
        return { color: "bg-green-100 text-green-800", text: "Entregue" };
      default:
        return { color: "bg-gray-100 text-gray-800", text: status };
    }
  };

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead className="hidden md:table-cell">Data</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => {
              const status = getOrderStatus(order.status);
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(order.date)}</TableCell>
                  <TableCell>{formatCurrency(order.total)}</TableCell>
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
