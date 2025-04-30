
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import ProductForm from "@/components/admin/product-form";

const AdminProductAdd = () => {
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
      <div className="container mx-auto max-w-5xl py-12 px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Adicionar Novo Produto</h1>
        <ProductForm />
      </div>
    </Layout>
  );
};

export default AdminProductAdd;
