"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import FormInputField from "@/components/FormInput/FormInputField";
import FormDatePickerField from "@/components/FormInput/FormDatePickerField";
import dayjs from "dayjs";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email("Invalid email format. Please enter a valid email."),
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  password: z.string().min(8, { message: "Password should be long than 8 " }),
  phone: z
    .string()
    .length(10, { message: "Phone number must be exactly 10 digits." }),
  birthDate: z
    .date()
    .max(dayjs().toDate(), { message: "Can't chose date future" }),
});

const SignupPage = () => {
  const [changeType, setChangeType] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phone: "",
      birthDate: undefined,
    },
  });

  const handleChangeType = () => {
    setChangeType(!changeType);
  };

  const handleSignIn = async (values: z.infer<typeof formSchema>) => {
    console.log(
      "🎯 BirthDate Value:",
      values.birthDate.toDateString() <= dayjs().toString()
    );
  };
  return (
    <div className=" bg-gray-50  py-10 px-4 sm:px-6 lg:px-8 ">
      <Card className=" max-w-7xl mx-auto my-5">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Signup</CardTitle>
        </CardHeader>
        <FormProvider {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(handleSignIn)();
            }}
            className="space-y-5"
          >
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                {/* NOTE - FirstName */}
                <div className="col-span-2 sm:col-span-1">
                  <FormInputField
                    control={form.control}
                    name="firstName"
                    label="First Name"
                    placeholder="First Name"
                  />
                </div>
                {/* NOTE - LastName */}
                <div className="col-span-2 sm:col-span-1">
                  <FormInputField
                    control={form.control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Last Name"
                  />
                </div>
                {/* NOTE - Phone */}
                <div className="col-span-2 sm:col-span-1">
                  <FormInputField
                    control={form.control}
                    name="phone"
                    label="Phone"
                    placeholder="Phone number"
                  />
                </div>
                {/* NOTE - Birth Date */}
                <div className="col-span-2 sm:col-span-1">
                  <FormDatePickerField
                    control={form.control}
                    name="birthDate"
                    label="BirthData"
                    // description="Choose the dead line for the task."
                  />
                </div>
                {/* NOTE - Email */}
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
                  <div className="absolute right-4 bottom-9">
                    {changeType ? (
                      <EyeOff
                        onClick={() => handleChangeType()}
                        size={18}
                        className=" hover:cursor-pointer "
                      />
                    ) : (
                      <Eye
                        onClick={() => handleChangeType()}
                        size={18}
                        className=" hover:cursor-pointer "
                      />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full hover:cursor-pointer ">
                Sign Up
              </Button>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};
export default SignupPage;
