import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { setDialogEditCategoryClose } from "@/lib/features/dialog/dialogSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputField from "../FormInput/FormInputField";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { updateCategoryById } from "@/services/categoryServices";

const formSchema = z.object({
  categoryName: z.string().min(1, "Category is required"),
});

const DialogEditCategory = () => {
  const dispatch = useAppDispatch();
  const { editCategoryToggle } = useAppSelector((state) => state.dialog);
  const { categoryId, categoryName } = useAppSelector((state) => state.dialog);

  const { mutateAsync: updateCategoryMutate, isPending } =
    updateCategoryById(categoryId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      categoryName: categoryName,
    },
  });

  const router = useRouter();
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const payload: { name: string } = {
        name: data?.categoryName,
      };
      await updateCategoryMutate(payload).then(() => {
        toast.success("Update Success", {
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
        dispatch(setDialogEditCategoryClose());
        form.reset();
      });
    } catch (error) {
      toast.error("Update Failed", {
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

  useEffect(() => {
    if (editCategoryToggle && categoryName) {
      form.reset({ categoryName });
    }
  }, [editCategoryToggle, categoryName]);
  return (
    <Dialog
      open={editCategoryToggle}
      onOpenChange={(open) => {
        if (!open) dispatch(setDialogEditCategoryClose());
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            Category {categoryName}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <FormInputField
              control={form.control}
              name="categoryName"
              label="Category"
              placeholder=""
            />

            <DialogFooter>
              <div className="flex flex-col w-full gap-3">
                <Button
                  className="w-full hover:cursor-pointer"
                  type="submit"
                  disabled={isPending}
                >
                  Update
                </Button>
              </div>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
export default DialogEditCategory;
