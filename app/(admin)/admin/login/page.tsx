"use client";
import FormInputField from "@/components/FormInput/FormInputField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSignIn } from "@/services/authServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("Invalid email format. Please enter a valid email."),
  password: z.string().min(8, { message: "Password should be long than 8 " }),
});

const AdminLoginPage = () => {
  const router = useRouter();
  const [changeType, setChangeType] = useState<boolean>(false);
  const handleChangeType = () => {
    setChangeType(!changeType);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: loginMutate } = useSignIn();
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await loginMutate(data).then(() => {
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
        router.push("/admin");
        router.refresh();
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
    <div className=" bg-amber-400 min-h-screen flex items-center justify-center p-6 ">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Admin Login</CardTitle>
        </CardHeader>
        <FormProvider {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(handleSubmit)();
            }}
            className="space-y-5"
          >
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                {/* NOTE - Email*/}
                <div className="col-span-2 ">
                  <FormInputField
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Email"
                  />
                </div>
                {/* NOTE - Password */}
                <div className="col-span-2 relative ">
                  <FormInputField
                    control={form.control}
                    name="password"
                    label="Password"
                    type={changeType ? "text" : "password"}
                    placeholder="Password"
                  />
                  <div className="absolute right-6 bottom-2">
                    {changeType ? (
                      <EyeOff
                        onClick={() => handleChangeType()}
                        size={18}
                        className="hover:cursor-pointer "
                      />
                    ) : (
                      <Eye
                        onClick={() => handleChangeType()}
                        size={18}
                        className="hover:cursor-pointer "
                      />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full hover:cursor-pointer ">
                Login
              </Button>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};
export default AdminLoginPage;
