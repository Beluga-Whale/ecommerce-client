import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";
import { useDeleteOrder } from "@/services/orderService";
import { setDialogDeleteOrderClose } from "@/lib/features/dialog/dialogSlice";
const DialogDeleteOrder = () => {
  const dispatch = useAppDispatch();
  const { deleteOrderToggle, orderIdDelete } = useAppSelector(
    (state) => state.dialog
  );
  const { mutateAsync: deleteOrderById } = useDeleteOrder();

  const handlerDelete = async () => {
    try {
      await deleteOrderById(orderIdDelete).then(() => {
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
        dispatch(setDialogDeleteOrderClose());
        window.location.reload();
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
    dispatch(setDialogDeleteOrderClose());
  };
  return (
    <AlertDialog open={deleteOrderToggle}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure to delete{" "}
            <span className="text-red-400">{orderIdDelete}</span>{" "}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Make sure you want to delete this order
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            className="bg-red-400 hover:cursor-pointer"
            onClick={() => handlerDelete()}
          >
            Delete
          </Button>
          <Button
            className="hover:cursor-pointer"
            onClick={() => handlerClose()}
          >
            Cancel
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DialogDeleteOrder;
