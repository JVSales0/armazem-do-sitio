
import { ProductCategory } from "@/types/product";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductFormFieldsProps {
  name: string;
  description: string;
  price: string;
  stock: string;
  unit: string;
  category: ProductCategory;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onStockChange: (value: string) => void;
  onUnitChange: (value: string) => void;
  onCategoryChange: (value: ProductCategory) => void;
}

const ProductFormFields = ({
  name,
  description,
  price,
  stock,
  unit,
  category,
  onNameChange,
  onDescriptionChange,
  onPriceChange,
  onStockChange,
  onUnitChange,
  onCategoryChange
}: ProductFormFieldsProps) => {
  const categories: ProductCategory[] = [
    "frutas", 
    "legumes", 
    "verduras", 
    "graos", 
    "conservas", 
    "doces", 
    "bebidas", 
    "carnes",
    "laticinios",
    "temperos",
    "organicos",
    "outros"
  ];

  const translateCategory = (cat: string) => {
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
    
    return translations[cat] || cat;
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Produto*</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Nome do produto"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descrição*</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Descreva o produto"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Preço (R$)*</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => onPriceChange(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="unit">Unidade*</Label>
          <Input
            id="unit"
            value={unit}
            onChange={(e) => onUnitChange(e.target.value)}
            placeholder="kg, unidade, pacote, etc."
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Categoria*</Label>
          <Select 
            value={category} 
            onValueChange={(value) => onCategoryChange(value as ProductCategory)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {translateCategory(cat)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="stock">Estoque*</Label>
          <Input
            id="stock"
            type="number"
            min="0"
            value={stock}
            onChange={(e) => onStockChange(e.target.value)}
            placeholder="0"
            required
          />
        </div>
      </div>
    </>
  );
};

export default ProductFormFields;
