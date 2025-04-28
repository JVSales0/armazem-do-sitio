
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import { getAllProducts } from "@/services/productService";
import { Product } from "@/types/product";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = () => {
      setIsLoading(true);
      const allProducts = getAllProducts();
      setProducts(allProducts);
      setIsLoading(false);
    };

    loadProducts();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto max-w-5xl py-12 px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Nossos Produtos</h1>

        {isLoading ? (
          <div className="text-center py-12">Carregando produtos...</div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </Layout>
  );
};

export default Products;
