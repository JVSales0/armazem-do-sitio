
export type ProductCategory = 
  | "frutas" 
  | "legumes" 
  | "verduras"
  | "graos"
  | "conservas"
  | "doces"
  | "bebidas"
  | "outros";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
  stock: number;
  unit: string; // kg, unidade, pacote, etc.
}

// Mock data for initial products
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Alface Orgânica",
    description: "Alface fresca orgânica colhida no sítio.",
    price: 3.50,
    imageUrl: "/placeholder.svg",
    category: "verduras",
    stock: 20,
    unit: "unidade"
  },
  {
    id: "2",
    name: "Tomate Orgânico",
    description: "Tomates frescos orgânicos colhidos no sítio.",
    price: 5.75,
    imageUrl: "/placeholder.svg",
    category: "legumes",
    stock: 15,
    unit: "kg"
  },
  {
    id: "3",
    name: "Goiaba",
    description: "Goiabas maduras e doces.",
    price: 7.50,
    imageUrl: "/placeholder.svg",
    category: "frutas",
    stock: 10,
    unit: "kg"
  },
  {
    id: "4",
    name: "Feijão Caseiro",
    description: "Feijão caseiro produzido no sítio.",
    price: 8.90,
    imageUrl: "/placeholder.svg",
    category: "graos",
    stock: 25,
    unit: "kg"
  },
  {
    id: "5",
    name: "Doce de Leite Caseiro",
    description: "Doce de leite feito pela Dona Lourdes.",
    price: 12.00,
    imageUrl: "/placeholder.svg",
    category: "doces",
    stock: 8,
    unit: "pote 250g"
  },
  {
    id: "6",
    name: "Suco de Laranja Natural",
    description: "Suco de laranja natural sem conservantes.",
    price: 8.50,
    imageUrl: "/placeholder.svg",
    category: "bebidas",
    stock: 12,
    unit: "garrafa 1L"
  }
];
