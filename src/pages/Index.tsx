
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllProducts } from "@/services/productService";
import { Product } from "@/types/product";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get featured products (just the first 4 for now)
    const products = getAllProducts();
    setFeaturedProducts(products.slice(0, 4));
    setIsLoading(false);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-site-green-light py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Produtos Frescos Direto do Sítio
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl">
              Frutas, verduras e produtos artesanais da Dona Lourdes para sua mesa.
            </p>
            <Link to="/products">
              <Button className="bg-site-green hover:bg-site-green-dark text-lg px-6 py-5">
                Ver Produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Produtos em Destaque
            </h2>
            <Link to="/products" className="text-site-green hover:underline flex items-center">
              Ver todos
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-12">Carregando produtos...</div>
          ) : (
            <ProductGrid products={featuredProducts} />
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-site-green-light py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img
                src="/placeholder.svg"
                alt="Dona Lourdes no sítio"
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Conheça o Sítio da Dona Lourdes
              </h2>
              <p className="text-gray-700 mb-6">
                Há mais de 20 anos, a Dona Lourdes produz alimentos saudáveis e saborosos em seu sítio.
                Todos os produtos são cultivados com muito carinho e cuidado, respeitando o meio ambiente e as tradições.
              </p>
              <Link to="/about">
                <Button variant="outline" className="border-site-green text-site-green hover:bg-site-green hover:text-white">
                  Saiba Mais
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How to Buy Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
            Como Comprar
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-site-green-light rounded-full flex items-center justify-center mb-4">
                <span className="text-site-green text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Escolha os Produtos</h3>
              <p className="text-gray-600">
                Navegue pelo site e selecione os produtos que deseja comprar, adicionando-os ao carrinho.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-site-green-light rounded-full flex items-center justify-center mb-4">
                <span className="text-site-green text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Faça seu Pedido</h3>
              <p className="text-gray-600">
                Revise seu carrinho e finalize o pedido pelo WhatsApp para combinar a entrega.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-site-green-light rounded-full flex items-center justify-center mb-4">
                <span className="text-site-green text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Receba em Casa</h3>
              <p className="text-gray-600">
                Receba seus produtos fresquinhos diretamente em sua casa, acompanhando o status da entrega.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/products">
              <Button className="bg-site-green hover:bg-site-green-dark text-lg">
                Comprar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
