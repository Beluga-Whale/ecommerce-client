"use client";
import FormInputField from "@/components/FormInput/FormInputField";
import ProductVariants from "@/components/ProductVariants";
import { Card } from "@/components/ui/card";
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
import { Info, X } from "lucide-react";
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

  const { mutateAsync: productMutate } = useCreateProduct();

  const imageArray: ImagesBodyDTO[] = imageUpload?.map((item: string) => ({
    url: item,
  }));

  const handleRemoveImage = (urlToRemove: string) => {
    setImageUpload((prev) => prev.filter((url) => url !== urlToRemove));
  };

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
    <div className="h-screen overflow-auto p-6 ">
      <h3 className="text-2xl font-bold mb-5 ">Add New Product</h3>
      <div className="  ">
        <Card className="w-full  ">
          <FormProvider {...form}>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
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

              <div className="space-y-5">
                <div>
                  <Label>Upload Image</Label>
                  {imageUpload.length < 3 && (
                    <UploadImage setImageUpload={setImageUpload} />
                  )}
                  <div className="flex gap-1.5">
                    {imageUpload.map((url, idx) => (
                      <div key={idx} className="relative">
                        <CldImage
                          src={url}
                          alt="Product image"
                          width={200}
                          height={125}
                          className="rounded-xl border w-[200px] h-[125px] my-5 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(url)}
                          className="absolute top-7 right-3 bg-red-500 text-white rounded-full  text-xs p-1 hover:cursor-pointer hover:bg-red-600"
                        >
                          <X size={12} />
                        </button>
                      </div>
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
              <div className="md:col-span-2 flex justify-end px-6 pb-6">
                <Button
                  type="submit"
                  className="w-full md:w-1/3 hover:cursor-pointer"
                >
                  Create Product
                </Button>
              </div>
            </form>
          </FormProvider>
          {/* <DialogCreateCategory /> */}
        </Card>
      </div>
    </div>
  );
};
export default AddProductPage;
