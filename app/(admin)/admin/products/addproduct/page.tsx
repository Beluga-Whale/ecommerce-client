"use client";
import FormInputField from "@/components/FormInput/FormInputField";
import ProductVariants from "@/components/ProductVariants";
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
import { Info } from "lucide-react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetAllCategory } from "@/services/categoryServices";
import {
  CategoryDTO,
  ImagesBodyDTO,
  ProductBodyDTO,
  variantsDTO,
} from "@/types";
import FormCheckBoxField from "@/components/FormInput/FormCheckBoxField";
import { useCreateProduct } from "@/services/productServices";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";

const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter name product" }),
  title: z.string().min(1, { message: "Please enter title product" }),
  category: z.string().min(1, "Category is required"),
  salePrice: z.number(),
  isFeature: z.boolean(),
  variants: z
    .array(
      z.object({
        size: z.string().min(1, "Please select size"),
        stock: z.number().min(1, "Stock must more than 1"),
        price: z.number().min(1, "Price must more than 1"),
      })
    )
    .min(1, "At least one variant is required"),
});

const AddProductPage = () => {
  const [imageUpload, setImageUpload] = useState<string[]>([]);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      title: "",
      category: "",
      salePrice: 0,
      isFeature: false,
      variants: [
        {
          size: "",
          stock: 0,
          price: 0,
        },
      ],
    },
  });
  const [description, setDescription] = useState<string>("");
  const { data: dataCategoryAll } = useGetAllCategory();

  const categoryList: Option[] =
    dataCategoryAll?.data?.map((item: CategoryDTO) => ({
      label: item?.Name,
      value: item?.ID,
    })) ?? [];

  const { mutateAsync: productMutate, error, isError } = useCreateProduct();

  const imageArray: ImagesBodyDTO[] = imageUpload?.map((item: string) => ({
    url: item,
  }));

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const productVariants: variantsDTO[] = data?.variants?.map((item) => ({
      size: item.size,
      stock: item.stock,
      sku: `${data?.name.toUpperCase()}-${item.size}`,
      price: item.price,
    }));

    const payload: ProductBodyDTO = {
      name: data?.name,
      title: data?.title,
      description: description,
      images: imageArray,
      isFeatured: data?.isFeature,
      isOnSale: data?.salePrice <= 0 ? false : true,
      salePrice: data?.salePrice,
      categoryId: Number(data?.category),
      variants: productVariants,
    };

    try {
      await productMutate(payload).then(() => {
        toast.success("Create Product Success", {
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
        router.push("/admin/products");
        router.refresh();
        form.reset();
      });
    } catch (error) {
      toast.error("Create Product Failed", {
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
    <div className="  bg-slate-200 h-screen overflow-auto p-10 ">
      <h3>Add New Product</h3>
      <div className="  ">
        <Card className="w-full  ">
          <FormProvider {...form}>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              {/* RIGHT Column: Basic Info */}
              <div className="space-y-5">
                <FormInputField
                  control={form.control}
                  name="name"
                  label="Name Product"
                  placeholder="Name of product"
                  type="text"
                />
                <FormInputField
                  control={form.control}
                  name="title"
                  label="Title Product"
                  placeholder="Title of product"
                  type="text"
                />
                <div className="h-96">
                  <Label>Description Product</Label>
                  <RichTextEditor
                    onChange={setDescription}
                    description={description}
                  />
                </div>
              </div>

              {/* LEFT Column: Image + Variant + Category */}
              <div className="space-y-5">
                <div>
                  <Label>Upload Image</Label>
                  {imageUpload.length < 3 && (
                    <UploadImage setImageUpload={setImageUpload} />
                  )}
                  <div className="flex flex-wrap gap-3 mt-3">
                    {imageUpload.map((url, idx) => (
                      <CldImage
                        key={idx}
                        src={url}
                        alt="Product image"
                        width={200}
                        height={125}
                        className="rounded-xl border w-[200px] h-[125px] object-cover"
                      />
                    ))}
                  </div>
                  <div className="flex items-start space-x-4 mt-2">
                    <Info size={25} className="text-gray-400 mt-1" />
                    <p className="text-sm text-gray-400">
                      Add at least 3 images. Focus on quality and size.
                    </p>
                  </div>
                </div>

                <ProductVariants formProductVariants={form} />

                <FormInputField
                  control={form.control}
                  name="salePrice"
                  label="Sale Price"
                  placeholder="Sale price"
                  type="number"
                />

                <FormSelectField
                  control={form.control}
                  name="category"
                  label="Select Category"
                  options={categoryList}
                />

                <FormCheckBoxField
                  control={form.control}
                  name="isFeature"
                  label="Feature"
                />
              </div>
            </form>

            <DialogFooter className="px-6 pb-6">
              <Button type="submit" className="w-full md:w-1/3 ml-auto">
                Create Product
              </Button>
            </DialogFooter>
          </FormProvider>
          {/* <DialogCreateCategory /> */}
        </Card>
      </div>
    </div>
  );
};
export default AddProductPage;
