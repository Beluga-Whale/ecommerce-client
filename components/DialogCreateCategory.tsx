// "use client";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInputField from "./FormInput/FormInputField";

import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useCreateCategory } from "@/services/categoryServices";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, { message: "name is required." }),
});

const DialogCreateCategory = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
    },
  });

  const {
    mutateAsync: createCategoryMutate,
    error,
    isError,
  } = useCreateCategory();

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createCategoryMutate(data).then(() => {
        // router.refresh();
        toast.success("Create Category Success", {
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
        form.reset();
      });
    } catch (error) {
      toast.error("Create Category Failed", {
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Dialog</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Create Dialog</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <FormInputField
              control={form.control}
              name="name"
              label="Name category"
              type="text"
              placeholder=""
            />
            {isError && axios.isAxiosError(error) && (
              <p className="text-red-500 text-sm ">
                {error?.response?.data?.message}
              </p>
            )}
            <DialogFooter>
              <div className="flex flex-col w-full gap-3">
                <Button className="w-full" type="submit">
                  Create
                </Button>
              </div>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
export default DialogCreateCategory;
