import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { setDialogDeleteProductClose } from "@/lib/features/dialog/dialogSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { upeDeleteProductByID } from "@/services/productServices";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";
const DialogDeleteProduct = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { deleteProductToggle, productID, productName } = useAppSelector(
    (state) => state.dialog
  );
  const { mutateAsync: deleteProductByID } = upeDeleteProductByID(
    Number(productID)
  );

  const handlerDelete = async () => {
    try {
      await deleteProductByID().then(() => {
        router.refresh();
        toast.success("Delete Success", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        dispatch(setDialogDeleteProductClose());
      });
    } catch (error) {
      toast.error("Delete Failed", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handlerClose = () => {
    dispatch(setDialogDeleteProductClose());
  };
  return (
    <AlertDialog open={deleteProductToggle}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure to delete{" "}
            <span className="text-red-400">{productName}</span>{" "}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Make sure you want to delete this product
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button className="bg-red-400" onClick={() => handlerDelete()}>
            Delete
          </Button>
          <Button onClick={() => handlerClose()}>Cancel</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DialogDeleteProduct;
