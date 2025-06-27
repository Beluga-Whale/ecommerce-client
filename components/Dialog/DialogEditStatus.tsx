import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Bounce, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setDialogEditStatusClose } from "@/lib/features/dialog/dialogSlice";
import FormSelectField from "../FormInput/FormSelectFiled";
import { useEffect } from "react";
import { useUpdateStatusOrderAdmin } from "@/services/orderService";
import { UpdateStatusOrderDTO } from "@/types";

const formSchema = z.object({
  status: z.string().min(1, "Category is required"),
});

const defaultStatus = ["pending", "paid", "shipped", "cancel"];

const DialogEditStatus = () => {
  const dispatch = useAppDispatch();
  const { editStatusToggle } = useAppSelector((state) => state.dialog);
  const { orderId, status } = useAppSelector((state) => state.dialog);

  const { mutateAsync: updateStatusMutate, isPending } =
    useUpdateStatusOrderAdmin();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      status: status,
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const payload: UpdateStatusOrderDTO = {
        orderId: orderId,
        status: data?.status,
      };

      await updateStatusMutate(payload).then(() => {
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
        dispatch(setDialogEditStatusClose());
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
    if (status) {
      form.reset({ status });
    }
  }, [status]);
  return (
    <Dialog
      open={editStatusToggle}
      onOpenChange={(open) => {
        if (!open) dispatch(setDialogEditStatusClose());
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Order {orderId}</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <FormSelectField
              control={form.control}
              name="status"
              label="Status"
              options={defaultStatus?.map((s) => ({ label: s, value: s }))}
            />

            <DialogFooter>
              <div className="flex flex-col w-full gap-3">
                <Button className="w-full" type="submit" disabled={isPending}>
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
export default DialogEditStatus;
