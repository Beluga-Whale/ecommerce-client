"use client";
import FormInputField from "@/components/FormInput/FormInputField";
import ProductVariants from "@/components/ProductVariants";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { CldImage } from "next-cloudinary";
import { UploadImage } from "@/components/UploadImage";
import FormSelectField, {
  Option,
} from "@/components/FormInput/FormSelectFiled";
import { CircleX, Info, X } from "lucide-react";
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
import {
  useGetProductByID,
  useUpdateProduct,
} from "@/services/productServices";
import { Bounce, toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
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

const EditProductPage = () => {
  const { id } = useParams();
  const { data: product } = useGetProductByID(Number(id));
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

  const { mutateAsync: updateProductMutate } = useUpdateProduct(Number(id));

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
      await updateProductMutate(payload).then(() => {
        toast.success("Update Product Success", {
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
      toast.error("Update Product Failed", {
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

  useEffect(() => {
    if (product?.data) {
      form.reset({
        name: product.data.name,
        title: product.data.title,
        category: String(product.data.categoryID),
        salePrice: product.data.salePrice,
        isFeature: product.data.isFeatured,
        variants: product.data.variants.map((v: any) => ({
          size: v.size,
          stock: v.stock,
          price: v.price,
        })),
      });
      setImageUpload(product.data.images.map((img: any) => img.url));
      setDescription(product.data.description);
    }
  }, [product?.data]);
  return (
    <div className="  h-screen overflow-auto p-6 ">
      <h3 className="text-2xl font-bold mb-5">Edit Product</h3>
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
                <div className="my-5">
                  <FormInputField
                    control={form.control}
                    name="title"
                    label="Title Product"
                    placeholder="Title of product"
                    type="text"
                  />
                </div>
                {/* NOTE - Description */}
                <div className="max-w-3xl my-5 h-96">
                  <Label>Description Product</Label>
                  <RichTextEditor
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
                  Edit Products
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
export default EditProductPage;
