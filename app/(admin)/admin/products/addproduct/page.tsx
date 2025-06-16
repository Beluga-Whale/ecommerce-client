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
import { Info } from "lucide-react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetAllCategory } from "@/services/categoryServices";
import {
  CategoryResponseDTO,
  ImagesBodyDTO,
  ProductBodyDTO,
  variantsDTO,
} from "@/types";
import FormCheckBoxField from "@/components/FormInput/FormCheckBoxField";
import { useCreateProduct } from "@/services/productServices";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter name product" }),
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
    dataCategoryAll?.data?.map((item: CategoryResponseDTO) => ({
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
            <form className="inline-block md:flex md:flex-row-reverse ">
              {/* NOTE - left */}
              <CardContent className="flex flex-col h-full my-5 md:w-1/2 ">
                <Label>Upload Image</Label>
                {imageUpload.length < 3 && (
                  <UploadImage setImageUpload={setImageUpload} />
                )}
                {imageUpload && (
                  <div className="flex gap-1.5">
                    {imageUpload.map((url, idx) => (
                      <CldImage
                        key={idx}
                        src={url}
                        alt="Product image"
                        width={200}
                        height={125}
                        className="rounded-xl border w-[200px] h-[125px] my-5 object-cover"
                      />
                    ))}
                  </div>
                )}
                <div className="flex items-center space-x-4">
                  <Info size={35} className="text-gray-400" />
                  <p className="text-sm text-gray-400">
                    You need to add image 3 images. Pay attention to the quality
                    and size of picture you add (important)
                  </p>
                </div>
                {/* NOTE - Add Product Size */}
                <div className="my-5">
                  <ProductVariants formProductVariants={form} />
                </div>
                <div className="my-5">
                  <FormInputField
                    control={form.control}
                    name="salePrice"
                    label="Sale Price"
                    placeholder="Sale price all size"
                    type="number"
                  />
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
                  <FormCheckBoxField
                    control={form.control}
                    name="isFeature"
                    label="Feature"
                  />
                </div>
              </CardContent>
              {/* NOTE - right */}
              <CardContent className="  h-full md:w-1/2 ">
                <div className="my-5">
                  <FormInputField
                    control={form.control}
                    name="name"
                    label="Name Product"
                    placeholder="name of product"
                    type="text"
                  />
                </div>
                {/* NOTE - Description */}
                <div className="max-w-3xl my-5 h-96">
                  <Label>Description Product</Label>
                  <SimpleEditor
                    onChange={setDescription}
                    description={description}
                  />
                </div>
              </CardContent>
            </form>
            <DialogFooter className="self-end">
              <div className="flex flex-col w-full gap-3">
                <Button
                  className="w-full"
                  onClick={() => form.handleSubmit(handleSubmit)()}
                >
                  Create Products
                </Button>
              </div>
            </DialogFooter>
          </FormProvider>
          {/* <DialogCreateCategory /> */}
        </Card>
      </div>
    </div>
  );
};
export default AddProductPage;
