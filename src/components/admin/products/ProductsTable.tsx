
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
  onDeleteClick: (product: Product) => void;
}

const ProductsTable = ({ products, isLoading, onDeleteClick }: ProductsTableProps) => {
  // Helper function to translate categories to Portuguese
  const translateCategory = (category: string) => {
    const translations: Record<string, string> = {
      frutas: "Frutas",
      legumes: "Legumes",
      verduras: "Verduras",
      graos: "Grãos",
      conservas: "Conservas",
      doces: "Doces",
      bebidas: "Bebidas",
      carnes: "Carnes",
      laticinios: "Laticínios",
      temperos: "Temperos",
      organicos: "Orgânicos",
      outros: "Outros"
    };
    
    return translations[category] || category;
  };

  return (
    <div className="border rounded-lg shadow-sm overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead className="text-right">Preço</TableHead>
            <TableHead className="text-right">Estoque</TableHead>
            <TableHead>Unidade</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10">
                Carregando produtos...
              </TableCell>
            </TableRow>
          ) : products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{translateCategory(product.category)}</TableCell>
                <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Link to={`/admin/products/edit/${product.id}`}>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4 text-gray-500" />
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onDeleteClick(product)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10">
                Nenhum produto encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;
