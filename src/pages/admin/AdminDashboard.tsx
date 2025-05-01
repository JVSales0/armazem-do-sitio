
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
        <h1 className="text-2xl md:text-3xl font-bold mb-8 dark:text-white">Dashboard</h1>
        
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
