
export type ProductCategory = 
  | "frutas" 
  | "legumes" 
  | "verduras"
  | "graos"
  | "conservas"
  | "doces"
  | "bebidas"
  | "carnes"
  | "laticinios"
  | "temperos"
  | "organicos"
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
    name: "Alface",
    description: "Alface fresca orgânica colhida no sítio.",
    price: 3.50,
    imageUrl: "https://images.unsplash.com/photo-1506073881649-4e23be3e9ed0?q=80&w=600&auto=format&fit=crop",
    category: "verduras",
    stock: 20,
    unit: "unidade"
  },
  {
    id: "2",
    name: "Tomate",
    description: "Tomates frescos orgânicos colhidos no sítio.",
    price: 5.75,
    imageUrl: "https://images.unsplash.com/photo-1524593166156-312f362cada0?q=80&w=600&auto=format&fit=crop",
    category: "legumes",
    stock: 15,
    unit: "kg"
  },
  {
    id: "3",
    name: "Laranja",
    description: "Laranjas doces e suculentas, perfeitas para sucos naturais.",
    price: 4.50,
    imageUrl: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=600&auto=format&fit=crop",
    category: "frutas",
    stock: 30,
    unit: "kg"
  },
  {
    id: "4",
    name: "Morango",
    description: "Morangos frescos e doces, cultivados sem agrotóxicos.",
    price: 8.90,
    imageUrl: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=600&auto=format&fit=crop",
    category: "frutas",
    stock: 15,
    unit: "bandeja"
  },
  {
    id: "5",
    name: "Amora",
    description: "Amoras frescas colhidas no ponto certo de maturação.",
    price: 12.00,
    imageUrl: "https://images.unsplash.com/photo-1615218370629-da07db3571a4?q=80&w=600&auto=format&fit=crop",
    category: "frutas",
    stock: 10,
    unit: "bandeja 250g"
  },
  {
    id: "6",
    name: "Milho Verde",
    description: "Milho verde fresco, colhido na hora.",
    price: 5.50,
    imageUrl: "https://i.pinimg.com/736x/89/f9/f0/89f9f0ffedba8d99736506554d36c39b.jpg",
    category: "legumes",
    stock: 25,
    unit: "espiga"
  },
  {
    id: "7",
    name: "Mandioca",
    description: "Mandioca fresca e de qualidade superior, já descascada e higienizada.",
    price: 5.90,
    imageUrl: "https://i.pinimg.com/736x/04/4b/a5/044ba527238b5b02f9648a26a266fb6b.jpg",
    category: "legumes",
    stock: 20,
    unit: "kg"
  },
  {
    id: "8",
    name: "Frango Caipira",
    description: "Frango caipira criado solto, alimentação natural e orgânica.",
    price: 35.50,
    imageUrl: "https://i.pinimg.com/736x/6f/f2/bd/6ff2bd49d08fc0478086968ee7486d4f.jpg",
    category: "carnes",
    stock: 10,
    unit: "kg"
  },
  {
    id: "9",
    name: "Ovos de Codorna",
    description: "Ovos de codorna frescos, produção orgânica e natural.",
    price: 8.90,
    imageUrl: "https://i.pinimg.com/736x/21/8b/74/218b748a305488cc4e6d6e0700c85aec.jpg",
    category: "organicos",
    stock: 30,
    unit: "dúzia"
  },
  {
    id: "10",
    name: "Banana",
    description: "Bananas maduras e doces, cultivadas no sítio.",
    price: 6.90,
    imageUrl: "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=600&auto=format&fit=crop",
    category: "frutas",
    stock: 20,
    unit: "kg"
  },
  {
    id: "11",
    name: "Goiabada Caseira",
    description: "Goiabada caseira feita com frutas frescas do sítio e receita tradicional.",
    price: 15.00,
    imageUrl: "https://i.pinimg.com/736x/8d/9e/8a/8d9e8a0efabfab12dcf4e6d31255a6fc.jpg",
    category: "doces",
    stock: 12,
    unit: "pote 500g"
  },
  {
    id: "12",
    name: "Mel Puro",
    description: "Mel puro e natural, coletado de apiário próprio.",
    price: 25.00,
    imageUrl: "https://i.pinimg.com/736x/62/77/eb/6277ebb4c09141733ebadf270ab1769e.jpg",
    category: "organicos",
    stock: 15,
    unit: "pote 500g"
  },
  {
    id: "13",
    name: "Salame Colonial",
    description: "Salame colonial preparado artesanalmente, com temperos naturais.",
    price: 45.00,
    imageUrl: "https://i.pinimg.com/736x/a2/9b/75/a29b754eb920ad480a37de80b42a6d82.jpg",
    category: "carnes",
    stock: 8,
    unit: "unidade 700g"
  },
  {
    id: "14",
    name: "Torresmo",
    description: "Torresmo crocante feito artesanalmente, tempero tradicional.",
    price: 18.90,
    imageUrl: "https://i.pinimg.com/736x/da/58/97/da58977eeb4861c1e01a5ae74285e1aa.jpg",
    category: "carnes",
    stock: 10,
    unit: "pacote 300g"
  },
  {
    id: "15",
    name: "Banha de Porco",
    description: "Banha de porco caipira, produção artesanal.",
    price: 14.50,
    imageUrl: "https://i.pinimg.com/736x/a0/6b/ec/a06bec5fcbbcb81200ba0c114f348e43.jpg",
    category: "organicos",
    stock: 12,
    unit: "pote 500g"
  },
  {
    id: "16",
    name: "Mamão",
    description: "Mamão maduro, doce e cultivado sem agrotóxicos.",
    price: 7.50,
    imageUrl: "https://i.pinimg.com/736x/ca/63/3b/ca633bf61dd2039b499c54cc25969d9e.jpg",
    category: "frutas",
    stock: 15,
    unit: "unidade"
  },
  {
    id: "17",
    name: "Pão Caseiro",
    description: "Pão caseiro feito com fermento natural e farinha orgânica.",
    price: 9.90,
    imageUrl: "https://i.pinimg.com/736x/d5/11/10/d51110871b760213b629f4c30a9a0a5c.jpg",
    category: "outros",
    stock: 10,
    unit: "unidade 600g"
  },
  {
    id: "18",
    name: "Amendoim",
    description: "Amendoim fresco colhido no sítio, sem agrotóxicos.",
    price: 8.50,
    imageUrl: "https://images.unsplash.com/photo-1567892737950-30c4db37cd89?q=80&w=600&auto=format&fit=crop",
    category: "graos",
    stock: 20,
    unit: "pacote 500g"
  },
  {
    id: "19",
    name: "Cenoura",
    description: "Cenouras orgânicas frescas cultivadas no sítio.",
    price: 4.75,
    imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=600&auto=format&fit=crop",
    category: "legumes",
    stock: 18,
    unit: "kg"
  },
  {
    id: "20",
    name: "Batata-Doce",
    description: "Batata-doce orgânica e nutritiva.",
    price: 5.50,
    imageUrl: "https://i.pinimg.com/736x/bc/c5/80/bcc580e8f215cb053e956abb695a011c.jpg",
    category: "legumes",
    stock: 25,
    unit: "kg"
  },
  {
    id: "21",
    name: "Beterraba",
    description: "Beterraba fresca e orgânica, rica em nutrientes.",
    price: 4.50,
    imageUrl: "https://images.unsplash.com/photo-1593105522160-a9ea9df8d500?q=80&w=600&auto=format&fit=crop",
    category: "legumes",
    stock: 15,
    unit: "kg"
  },
  {
    id: "22",
    name: "Rabanete",
    description: "Rabanetes frescos e crocantes.",
    price: 3.90,
    imageUrl: "https://images.unsplash.com/photo-1583116956990-0d4fa7be9c62?q=80&w=600&auto=format&fit=crop",
    category: "legumes",
    stock: 12,
    unit: "maço"
  },
  {
    id: "23",
    name: "Queijo Colonial",
    description: "Queijo colonial artesanal, produção própria.",
    price: 35.00,
    imageUrl: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?q=80&w=600&auto=format&fit=crop",
    category: "laticinios",
    stock: 10,
    unit: "peça 500g"
  },
  {
    id: "24",
    name: "Leite Fresco",
    description: "Leite fresco de vacas criadas a pasto.",
    price: 6.50,
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=600&auto=format&fit=crop",
    category: "laticinios",
    stock: 20,
    unit: "litro"
  },
  {
    id: "25",
    name: "Manteiga Artesanal",
    description: "Manteiga artesanal pura, produzida no sítio.",
    price: 18.90,
    imageUrl: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=80&w=600&auto=format&fit=crop",
    category: "laticinios",
    stock: 15,
    unit: "pote 200g"
  },
  {
    id: "26",
    name: "Nata Fresca",
    description: "Nata fresca natural, sem conservantes.",
    price: 12.00,
    imageUrl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=600&auto=format&fit=crop",
    category: "laticinios",
    stock: 10,
    unit: "pote 300g"
  },
  {
    id: "27",
    name: "Brócolis",
    description: "Brócolis fresco e orgânico.",
    price: 5.90,
    imageUrl: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?q=80&w=600&auto=format&fit=crop",
    category: "verduras",
    stock: 15,
    unit: "maço"
  },
  {
    id: "28",
    name: "Cheiro Verde",
    description: "Cheiro verde fresco (salsinha e cebolinha).",
    price: 2.50,
    imageUrl: "https://images.unsplash.com/photo-1526170160160-1a5eb242ab58?q=80&w=600&auto=format&fit=crop",
    category: "temperos",
    stock: 20,
    unit: "maço"
  },
  {
    id: "29",
    name: "Coentro",
    description: "Coentro fresco e aromático.",
    price: 2.50,
    imageUrl: "https://images.unsplash.com/photo-1560155016-bd4879ae8f21?q=80&w=600&auto=format&fit=crop",
    category: "temperos",
    stock: 15,
    unit: "maço"
  },
  {
    id: "30",
    name: "Berinjela",
    description: "Berinjela fresca e orgânica.",
    price: 5.50,
    imageUrl: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?q=80&w=600&auto=format&fit=crop",
    category: "legumes",
    stock: 12,
    unit: "kg"
  }
];

// Continuação dos produtos - segunda parte
export const ADDITIONAL_PRODUCTS: Product[] = [
  {
    id: "31",
    name: "Alho Poró",
    description: "Alho poró fresco e orgânico.",
    price: 4.90,
    imageUrl: "https://images.unsplash.com/photo-1628784230353-5bee16e2f005?q=80&w=600&auto=format&fit=crop",
    category: "legumes",
    stock: 15,
    unit: "maço"
  },
  {
    id: "32",
    name: "Pepino",
    description: "Pepino fresco e crocante.",
    price: 4.50,
    imageUrl: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?q=80&w=600&auto=format&fit=crop",
    category: "legumes",
    stock: 20,
    unit: "kg"
  },
  {
    id: "33",
    name: "Abóbora",
    description: "Abóbora fresca e nutritiva.",
    price: 3.90,
    imageUrl: "https://images.unsplash.com/photo-1506917728037-b6af01a7d403?q=80&w=600&auto=format&fit=crop",
    category: "legumes",
    stock: 10,
    unit: "kg"
  },
  {
    id: "34",
    name: "Melão",
    description: "Melão doce e suculento.",
    price: 8.90,
    imageUrl: "https://images.unsplash.com/photo-1571575173700-afb9492e6a50?q=80&w=600&auto=format&fit=crop",
    category: "frutas",
    stock: 12,
    unit: "unidade"
  },
  {
    id: "35",
    name: "Melancia",
    description: "Melancia doce e refrescante.",
    price: 15.00,
    imageUrl: "https://images.unsplash.com/photo-1563114773-84221bd62daa?q=80&w=600&auto=format&fit=crop",
    category: "frutas",
    stock: 8,
    unit: "unidade"
  },
  {
    id: "36",
    name: "Cebola",
    description: "Cebola fresca e de qualidade.",
    price: 4.50,
    imageUrl: "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?q=80&w=600&auto=format&fit=crop",
    category: "legumes",
    stock: 25,
    unit: "kg"
  },
  {
    id: "37",
    name: "Abacaxi",
    description: "Abacaxi doce e suculento.",
    price: 7.90,
    imageUrl: "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?q=80&w=600&auto=format&fit=crop",
    category: "frutas",
    stock: 15,
    unit: "unidade"
  },
  {
    id: "38",
    name: "Pimentão",
    description: "Pimentões frescos e coloridos.",
    price: 6.50,
    imageUrl: "https://images.unsplash.com/photo-1615486363973-f79d875780cf?q=80&w=600&auto=format&fit=crop",
    category: "legumes",
    stock: 20,
    unit: "kg"
  },
  {
    id: "39",
    name: "Batata",
    description: "Batatas frescas e de qualidade.",
    price: 5.90,
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=600&auto=format&fit=crop",
    category: "legumes",
    stock: 30,
    unit: "kg"
  },
  {
    id: "40",
    name: "Alecrim",
    description: "Alecrim fresco e aromático.",
    price: 3.50,
    imageUrl: "https://images.unsplash.com/photo-1635752279043-155b5a17da25?q=80&w=600&auto=format&fit=crop",
    category: "temperos",
    stock: 15,
    unit: "maço"
  },
  {
    id: "41",
    name: "Tomilho",
    description: "Tomilho fresco e aromático.",
    price: 3.50,
    imageUrl: "https://images.unsplash.com/photo-1653647144572-290352064c31?q=80&w=600&auto=format&fit=crop",
    category: "temperos",
    stock: 15,
    unit: "maço"
  },
  {
    id: "42",
    name: "Manjericão",
    description: "Manjericão fresco e aromático.",
    price: 3.50,
    imageUrl: "https://images.unsplash.com/photo-1565160837249-b3a80beff3bc?q=80&w=600&auto=format&fit=crop",
    category: "temperos",
    stock: 15,
    unit: "maço"
  },
  {
    id: "43",
    name: "Louro",
    description: "Folhas de louro secas.",
    price: 4.50,
    imageUrl: "https://images.unsplash.com/photo-1599909083851-4a4312d3a331?q=80&w=600&auto=format&fit=crop",
    category: "temperos",
    stock: 20,
    unit: "pacote 20g"
  },
  {
    id: "44",
    name: "Hortelã",
    description: "Hortelã fresca e aromática.",
    price: 3.50,
    imageUrl: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=600&auto=format&fit=crop",
    category: "temperos",
    stock: 15,
    unit: "maço"
  },
  {
    id: "45",
    name: "Uva",
    description: "Uvas frescas e doces.",
    price: 12.90,
    imageUrl: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?q=80&w=600&auto=format&fit=crop",
    category: "frutas",
    stock: 15,
    unit: "kg"
  },
  {
    id: "46",
    name: "Vinho Colonial",
    description: "Vinho colonial artesanal, produção própria.",
    price: 35.00,
    imageUrl: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=600&auto=format&fit=crop",
    category: "bebidas",
    stock: 10,
    unit: "garrafa 750ml"
  },
  {
    id: "47",
    name: "Limão",
    description: "Limões frescos e suculentos.",
    price: 5.50,
    imageUrl: "https://images.unsplash.com/photo-1590502593747-42a996133562?q=80&w=600&auto=format&fit=crop",
    category: "frutas",
    stock: 20,
    unit: "kg"
  },
  {
    id: "48",
    name: "Geleia de Morango",
    description: "Geleia de morango caseira, sem conservantes.",
    price: 18.90,
    imageUrl: "https://images.unsplash.com/photo-1678697494065-0c4f13cc1ebd?q=80&w=600&auto=format&fit=crop",
    category: "doces",
    stock: 12,
    unit: "pote 300g"
  },
  {
    id: "49",
    name: "Conserva de Pepino",
    description: "Conserva de pepino caseira, tempero tradicional.",
    price: 16.50,
    imageUrl: "https://images.unsplash.com/photo-1607524918408-f225f3292309?q=80&w=600&auto=format&fit=crop",
    category: "conservas",
    stock: 15,
    unit: "pote 500g"
  },
  {
    id: "50",
    name: "Filé de Tilápia",
    description: "Filé de tilápia fresco, criação própria.",
    price: 45.00,
    imageUrl: "https://images.unsplash.com/photo-1574051004519-39f0194bb370?q=80&w=600&auto=format&fit=crop",
    category: "carnes",
    stock: 10,
    unit: "kg"
  },
  {
    id: "51",
    name: "Noz Pecan",
    description: "Noz pecan fresca e crocante.",
    price: 45.00,
    imageUrl: "https://images.unsplash.com/photo-1604775108692-d387912e1f05?q=80&w=600&auto=format&fit=crop",
    category: "graos",
    stock: 8,
    unit: "pacote 250g"
  },
  {
    id: "52",
    name: "Cogumelo Shimeji",
    description: "Cogumelo shimeji fresco e orgânico.",
    price: 18.90,
    imageUrl: "https://images.unsplash.com/photo-1622472448253-6445d1796123?q=80&w=600&auto=format&fit=crop",
    category: "legumes",
    stock: 10,
    unit: "pacote 200g"
  },
  {
    id: "53",
    name: "Garapa Fresca",
    description: "Garapa fresca de cana, sem conservantes.",
    price: 7.50,
    imageUrl: "https://images.unsplash.com/photo-1588350404192-4a364ead2d49?q=80&w=600&auto=format&fit=crop",
    category: "bebidas",
    stock: 15,
    unit: "garrafa 1L"
  },
  {
    id: "54",
    name: "Açúcar Mascavo",
    description: "Açúcar mascavo natural, produção artesanal.",
    price: 12.00,
    imageUrl: "https://images.unsplash.com/photo-1584653059740-fb6fb91eeeff?q=80&w=600&auto=format&fit=crop",
    category: "outros",
    stock: 20,
    unit: "pacote 500g"
  },
  {
    id: "55",
    name: "Ovos Caipira",
    description: "Ovos de galinhas criadas soltas, alimentação natural e orgânica.",
    price: 12.90,
    imageUrl: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?q=80&w=600&auto=format&fit=crop",
    category: "organicos",
    stock: 50,
    unit: "dúzia"
  },
  // Adding 5 new products
  {
    id: "56",
    name: "Goiabada",
    description: "Goiabada caseira feita com frutas frescas do sítio, sem conservantes.",
    price: 14.90,
    imageUrl: "https://images.unsplash.com/photo-1582460747579-2f4eaba93a1c?q=80&w=600&auto=format&fit=crop",
    category: "doces",
    stock: 18,
    unit: "pote 500g"
  },
  {
    id: "57",
    name: "Feijão",
    description: "Feijão fresco cultivado no sítio, colhido no ponto certo.",
    price: 9.50,
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=600&auto=format&fit=crop",
    category: "graos",
    stock: 25,
    unit: "kg"
  },
  {
    id: "58",
    name: "Suco de Laranja",
    description: "Suco de laranja natural, feito com frutas frescas colhidas no sítio.",
    price: 12.00,
    imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=600&auto=format&fit=crop",
    category: "bebidas",
    stock: 15,
    unit: "garrafa 1L"
  },
  {
    id: "59",
    name: "Doce de Leite",
    description: "Doce de leite cremoso feito artesanalmente, receita tradicional.",
    price: 16.50,
    imageUrl: "https://images.unsplash.com/photo-1661413617929-cbdb09c8dd99?q=80&w=600&auto=format&fit=crop",
    category: "doces",
    stock: 20,
    unit: "pote 400g"
  },
  {
    id: "60",
    name: "Doce de Mamão",
    description: "Doce de mamão caseiro, elaborado com frutas frescas e orgânicas do sítio.",
    price: 15.90,
    imageUrl: "https://images.unsplash.com/photo-1625488932067-2f3d7ee2c70e?q=80&w=600&auto=format&fit=crop",
    category: "doces",
    stock: 15,
    unit: "pote 350g"
  }
];

// Função para combinar todos os produtos em uma só lista
export const getAllMockProducts = (): Product[] => {
  return [...MOCK_PRODUCTS, ...ADDITIONAL_PRODUCTS];
};
