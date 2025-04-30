
export type ProductCategory = 
  | "frutas" 
  | "legumes" 
  | "verduras"
  | "graos"
  | "conservas"
  | "doces"
  | "bebidas"
  | "racoes" // Added pet food category
  | "organicos_animais" // Added organic animal products category
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
    imageUrl: "https://images.unsplash.com/photo-1506073881649-4e23be3e9ed0?q=80&w=600&auto=format&fit=crop",
    category: "verduras",
    stock: 20,
    unit: "unidade"
  },
  {
    id: "2",
    name: "Tomate Orgânico",
    description: "Tomates frescos orgânicos colhidos no sítio.",
    price: 5.75,
    imageUrl: "https://images.unsplash.com/photo-1524593166156-312f362cada0?q=80&w=600&auto=format&fit=crop",
    category: "legumes",
    stock: 15,
    unit: "kg"
  },
  {
    id: "3",
    name: "Goiaba",
    description: "Goiabas maduras e doces.",
    price: 7.50,
    imageUrl: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?q=80&w=600&auto=format&fit=crop",
    category: "frutas",
    stock: 10,
    unit: "kg"
  },
  {
    id: "4",
    name: "Feijão Caseiro",
    description: "Feijão caseiro produzido no sítio.",
    price: 8.90,
    imageUrl: "https://images.unsplash.com/photo-1628779238951-be2c9f2a59f4?q=80&w=600&auto=format&fit=crop",
    category: "graos",
    stock: 25,
    unit: "kg"
  },
  {
    id: "5",
    name: "Doce de Leite Caseiro",
    description: "Doce de leite feito pela Dona Lourdes.",
    price: 12.00,
    imageUrl: "https://images.unsplash.com/photo-1589985270958-e74e6ef69ef0?q=80&w=600&auto=format&fit=crop",
    category: "doces",
    stock: 8,
    unit: "pote 250g"
  },
  {
    id: "6",
    name: "Suco de Laranja Natural",
    description: "Suco de laranja natural sem conservantes.",
    price: 8.50,
    imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=600&auto=format&fit=crop",
    category: "bebidas",
    stock: 12,
    unit: "garrafa 1L"
  },
  {
    id: "7",
    name: "Ração Premium para Cães",
    description: "Ração orgânica balanceada para cães adultos de todas as raças.",
    price: 89.90,
    imageUrl: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=600&auto=format&fit=crop",
    category: "racoes",
    stock: 30,
    unit: "pacote 10kg"
  },
  {
    id: "8",
    name: "Ração Natural para Gatos",
    description: "Ração natural sem conservantes para gatos, promove saúde e pelagem brilhante.",
    price: 75.50,
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=600&auto=format&fit=crop",
    category: "racoes",
    stock: 25,
    unit: "pacote 5kg"
  },
  {
    id: "9",
    name: "Carne Bovina Orgânica",
    description: "Carne de boi criado em pasto orgânico, sem hormônios ou antibióticos.",
    price: 59.90,
    imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=600&auto=format&fit=crop",
    category: "organicos_animais",
    stock: 15,
    unit: "kg"
  },
  {
    id: "10",
    name: "Ovos Caipira",
    description: "Ovos de galinhas criadas soltas, alimentação natural e orgânica.",
    price: 12.90,
    imageUrl: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?q=80&w=600&auto=format&fit=crop",
    category: "organicos_animais",
    stock: 50,
    unit: "dúzia"
  }
];

