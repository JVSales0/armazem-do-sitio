
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { Product } from "@/types/product";

interface DeleteProductModalProps {
  product: Product | null;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: () => void;
}

const DeleteProductModal = ({ 
  product, 
  onOpenChange, 
  onConfirmDelete 
}: DeleteProductModalProps) => {
  return (
    <AlertDialog 
      open={product !== null} 
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o produto "{product?.name}"? 
            Esta ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirmDelete}
            className="bg-red-500 hover:bg-red-600"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProductModal;
