"use client";
import FormInputField from "@/components/FormInput/FormInputField";
import ProductVariants from "@/components/ProductVariants";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { CldImage } from "next-cloudinary";
import { UploadImage } from "@/components/UploadImage";
import FormSelectField, {
  Option,
} from "@/components/FormInput/FormSelectFiled";
import DialogCreateCategory from "@/components/DialogCreateCategory";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetAllCategory } from "@/services/categoryServices";
import { CategoryResponseDTO } from "@/types";

const formSchema = z.object({
  email: z.string().email("Invalid email format. Please enter a valid email."),
  password: z.string().min(8, { message: "Password should be long than 8 " }),
  category: z.string().min(1, "Category is required"),
});

const AddProduct = () => {
  const [imageUpload, setImageUpload] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      category: "",
    },
  });
  const [description, setDescription] = useState<string>("");

  const { data: dataCategoryAll } = useGetAllCategory();
  const categoryList: Option[] =
    dataCategoryAll?.data?.map((item: CategoryResponseDTO) => ({
      label: item?.Name,
      value: item?.ID,
    })) ?? [];

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {};
  return (
    <div className="  bg-slate-200 h-screen overflow-auto p-10 ">
      <h3>Add New Product</h3>
      <div className="flex   ">
        <Card className="w-full  ">
          <FormProvider {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit(handleSubmit)();
              }}
              className="space-x-5 flex  "
            >
              {/* NOTE - left */}
              <CardContent className=" w-1/2 h-full ">
                <div className="my-5">
                  <FormInputField
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Email"
                  />
                </div>
                <div className="max-w-3xl my-5">
                  <Label>Description Product</Label>
                  <SimpleEditor onChange={setDescription} />
                </div>
                <div className="my-5">
                  <ProductVariants />
                </div>
                <div className="my-5">
                  <FormSelectField
                    control={form.control}
                    name="category"
                    label="Select Category"
                    options={categoryList}
                  />
                </div>
                <div className="my-5">
                  <DialogCreateCategory />
                </div>
                <DialogFooter>
                  <div className="flex flex-col w-full gap-3">
                    <Button className="w-full" type="submit">
                      Create Products
                    </Button>
                  </div>
                </DialogFooter>
              </CardContent>
              {/* NOTE - right */}
              <CardContent className="flex flex-col w-1/2 h-full my-5 ">
                <Label>Upload Image</Label>
                {!imageUpload && (
                  <UploadImage setImageUpload={setImageUpload} />
                )}
                {imageUpload && (
                  <CldImage
                    src={imageUpload}
                    alt="Product image"
                    width={300} // ✅ ความกว้าง 300px
                    height={225} // ✅ สัดส่วน 4:3 (ดูดีในกล่อง)
                    className="rounded-xl border w-[300px] h-[225px] my-5"
                  />
                )}
              </CardContent>
            </form>
          </FormProvider>
        </Card>
      </div>
    </div>
  );
};
export default AddProduct;
