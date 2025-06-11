import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInputField from "./FormInput/FormInputField";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email format. Please enter a valid email."),
  password: z.string().min(1, { message: "password is required." }),
});

const DialogLogin = () => {
  const [open, setOpen] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Login data", data);
    // TODO: login logic here
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <Label>Sign In</Label>
      </DialogTrigger>
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
            {/* {isError && axios.isAxiosError(error) && (
                <p className="text-red-500 text-sm ">
                  {error?.response?.data?.error}
                </p>
              )} */}
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
