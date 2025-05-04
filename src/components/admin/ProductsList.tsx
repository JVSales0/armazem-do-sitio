
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Product } from "@/types/product";
import { getAllProducts, deleteProduct } from "@/services/productService";
import ProductSearch from "./products/ProductSearch";
import ProductsTable from "./products/ProductsTable";
import DeleteProductModal from "./products/DeleteProductModal";

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const { toast } = useToast();

  const loadProducts = () => {
    setIsLoading(true);
    const allProducts = getAllProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
    setIsLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const handleDeleteProduct = () => {
    if (!productToDelete) return;
    
    try {
      deleteProduct(productToDelete.id);
      loadProducts();
      toast({
        title: "Produto excluído",
        description: `${productToDelete.name} foi excluído com sucesso.`,
      });
    } catch (error) {
      toast({
        title: "Erro ao excluir produto",
        description: "Ocorreu um erro ao tentar excluir o produto.",
        variant: "destructive",
      });
    } finally {
      setProductToDelete(null);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
  };

  const handleModalOpenChange = (open: boolean) => {
    if (!open) setProductToDelete(null);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <ProductSearch 
          searchTerm={searchTerm} 
          onSearchChange={handleSearchChange} 
        />
        <Link to="/admin/products/add">
          <Button className="w-full sm:w-auto bg-site-green hover:bg-site-green-dark">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Produto
          </Button>
        </Link>
      </div>

      <ProductsTable 
        products={filteredProducts}
        isLoading={isLoading}
        onDeleteClick={handleDeleteClick}
      />

      <DeleteProductModal 
        product={productToDelete} 
        onOpenChange={handleModalOpenChange}
        onConfirmDelete={handleDeleteProduct} 
      />
    </>
  );
};

export default ProductsList;
