import dayjs from "dayjs";
import { z } from "zod";
import { UploadImage } from "./UploadImage";
import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import FormInputField from "./FormInput/FormInputField";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormDatePickerField from "./FormInput/FormDatePickerField";
import { Info } from "lucide-react";
import { useGetProfileUser, useUpdateProfile } from "@/services/authServices";
import { Bounce, toast } from "react-toastify";
import { userProfileUpdateDTO } from "@/types";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Invalid email format. Please enter a valid email."),
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  phone: z
    .string()
    .length(10, { message: "Phone number must be exactly 10 digits." }),
  birthDate: z
    .date()
    .max(dayjs().toDate(), { message: "Can't chose date future" }),
});
const ProfileFormEdit = () => {
  const { data: userProfile } = useGetProfileUser();
  const [imageUpload, setImageUpload] = useState<string[]>([]);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      birthDate: undefined,
    },
  });

  const handleRemoveImage = (urlToRemove: string) => {
    setImageUpload((prev) => prev.filter((url) => url !== urlToRemove));
  };

  const { mutateAsync: updateProfileMutate } = useUpdateProfile();
  const handleUpdateProfile = async (values: z.infer<typeof formSchema>) => {
    try {
      if (imageUpload.length < 1) {
        return toast.warning("Please Upload Image", {
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
      const payload: userProfileUpdateDTO = {
        firstName: values.firstName,
        lastName: values.lastName,
        birthDate: dayjs(values.birthDate),
        phone: values.phone,
        avatar: imageUpload.length < 1 ? undefined : imageUpload?.[0],
      };
      await updateProfileMutate(payload)
        .then(() => {
          toast.success("Update Profile Success");
          router.push("/profile");
        })
        .catch((error) => {
          toast.error(error);
        });
    } catch (error) {}
  };

  const isCheckUpdate =
    form.formState.isDirty || imageUpload[0] !== userProfile?.data?.avatar;

  useEffect(() => {
    if (userProfile?.data) {
      form.reset({
        email: userProfile?.data?.email,
        firstName: userProfile?.data?.firstName,
        lastName: userProfile?.data?.lastName,
        birthDate: dayjs(userProfile?.data?.birthDate).toDate(),
        phone: userProfile?.data?.phone,
      });
      if (userProfile.data.avatar) {
        setImageUpload([userProfile.data.avatar]);
      } else {
        setImageUpload([]);
      }
    }
  }, [userProfile?.data]);
  return (
    <div className=" bg-gray-50  ">
      <Card className=" max-w-7xl mx-auto my-5">
        <FormProvider {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(handleUpdateProfile)();
            }}
            className="space-y-5"
          >
            <CardContent>
              <div className=" flex justify-center items-center  flex-col">
                {imageUpload.length < 1 && (
                  <UploadImage setImageUpload={setImageUpload} />
                )}
                <div>
                  {imageUpload.map((url, idx) => (
                    <div key={idx} className="relative">
                      <CldImage
                        src={url}
                        alt="Product image"
                        width={200}
                        height={125}
                        className="rounded-xl border w-[200px] h-[125px] object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(url)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:cursor-pointer hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex items-start space-x-4 ">
                  <Info size={25} className="text-gray-400 " />
                  <p className="text-sm text-gray-400">
                    Add Your Profile Image
                  </p>
                </div>
              </div>
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
                    label="BirthDate"
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
                    disable={true}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button
                type="submit"
                className="w-full hover:cursor-pointer "
                disabled={!isCheckUpdate}
              >
                Update
              </Button>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};
export default ProfileFormEdit;
