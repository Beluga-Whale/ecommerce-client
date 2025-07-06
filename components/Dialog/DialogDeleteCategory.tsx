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
import { deleteCategoryById } from "@/services/categoryServices";
import { Bounce, toast } from "react-toastify";
import { setDialogDeleteCategoryClose } from "@/lib/features/dialog/dialogSlice";
import { useRouter } from "next/navigation";
const DialogDeleteCategory = () => {
  const { deleteCategoryToggle, categoryId, categoryName } = useAppSelector(
    (state) => state.dialog
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { mutateAsync: deleteCategoryMutate } = deleteCategoryById(categoryId);
  const handlerDelete = async () => {
    try {
      await deleteCategoryMutate().then(() => {
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
        router.refresh();
        dispatch(setDialogDeleteCategoryClose());
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
    dispatch(setDialogDeleteCategoryClose());
  };
  return (
    <AlertDialog open={deleteCategoryToggle}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure to delete{" "}
            <span className="text-red-400">{categoryName}</span>{" "}
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
export default DialogDeleteCategory;
