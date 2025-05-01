
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import SalesChart from "@/components/admin/dashboard/SalesChart";
import OrdersOverview from "@/components/admin/dashboard/OrdersOverview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  const { isAdmin, isLoading } = useAuth();

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
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Vendas da Semana</CardTitle>
            </CardHeader>
            <CardContent>
              <SalesChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Visão Geral dos Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <OrdersOverview />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Resumo Financeiro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">Receita total (semana)</p>
                <p className="text-2xl font-semibold">R$ 4.750,00</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">Pedidos (semana)</p>
                <p className="text-2xl font-semibold">32</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">Média por pedido</p>
                <p className="text-2xl font-semibold">R$ 148,43</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">Novos clientes</p>
                <p className="text-2xl font-semibold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
