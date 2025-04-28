
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import ProductForm from "@/components/admin/ProductForm";
import { getProductById } from "@/services/productService";
import { Product } from "@/types/product";

const AdminProductEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (id && !authLoading && isAdmin) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct || null);
      setIsLoading(false);
    }
  }, [id, authLoading, isAdmin]);

  // Show loading while checking auth
  if (authLoading || (isLoading && isAdmin)) {
    return (
      <Layout>
        <div className="container mx-auto max-w-5xl py-12 px-4">
          <div className="text-center py-12">Carregando...</div>
        </div>
      </Layout>
    );
  }

  // Redirect if not admin or staff
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // Handle product not found
  if (!isLoading && !product) {
    return (
      <Layout>
        <div className="container mx-auto max-w-5xl py-12 px-4">
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-4">Produto não encontrado</h2>
            <p>O produto que você está tentando editar não existe ou foi removido.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto max-w-5xl py-12 px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Editar Produto</h1>
        {product && <ProductForm product={product} isEditing={true} />}
      </div>
    </Layout>
  );
};

export default AdminProductEdit;
