// "use client";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInputField from "../FormInput/FormInputField";

import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSignIn } from "@/services/authServices";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setDialogLoginClose } from "@/lib/features/dialog/dialogSlice";
import { setUserId } from "@/lib/features/user/userSlice";

const formSchema = z.object({
  email: z.string().email("Invalid email format. Please enter a valid email."),
  password: z.string().min(1, { message: "password is required." }),
});

const DialogLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loginToggle } = useAppSelector((state) => state.dialog);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: loginMutate, error, isError } = useSignIn();
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await loginMutate(data).then((res) => {
        router.refresh();
        toast.success("Login Success", {
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
        console.log("Login Success", res);
        dispatch(setUserId(res.data.userId));
        dispatch(setDialogLoginClose());
        form.reset();
      });
    } catch (error) {
      toast.error("Login Failed", {
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
    <Dialog
      open={loginToggle}
      onOpenChange={(open) => {
        if (!open) dispatch(setDialogLoginClose());
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Sign In</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <FormInputField
              control={form.control}
              name="email"
              label="Email"
              placeholder="you@example.com"
            />
            <FormInputField
              control={form.control}
              name="password"
              label="Password"
              type="password"
              placeholder="*******"
            />
            {isError && axios.isAxiosError(error) && (
              <p className="text-red-500 text-sm ">
                {error?.response?.data?.message}
              </p>
            )}
            <DialogFooter>
              <div className="flex flex-col w-full gap-3">
                <Button className="w-full" type="submit">
                  Login
                </Button>
              </div>
            </DialogFooter>
          </form>
        </FormProvider>
        <Separator />
        <div className="flex items-center justify-center">
          <Label className="text-center text-gray-500 font-normal">
            No account ?
            <DialogClose asChild>
              <Link
                href="/signup"
                className="underline font-semibold text-black"
              >
                SignUp
              </Link>
            </DialogClose>
          </Label>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DialogLogin;
