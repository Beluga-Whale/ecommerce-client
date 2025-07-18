"use client";
import { ProductDTO, ProductVariant } from "@/types";
import { useGetAllProducts } from "@/services/productServices";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import Pagination from "./Pagination";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";

const ProductLists = () => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { category, size } = useAppSelector((state) => state.filter);
  const { data: productAll } = useGetAllProducts(
    currentPage,
    category,
    size,
    12
  );
  return (
    <div className="bg-white rounded-2xl p-3">
      <div className="mx-auto max-w-2xl px-4 py-1 sm:px-6  lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {(productAll?.data?.products ?? [])?.map(
            (product: ProductDTO, index: number) => (
              <div
                key={product?.id}
                className="hover:cursor-pointer"
                onClick={() => router.push(`/shop/product/${product.id}`)}
              >
                <div className="relative z-0">
                  <CldImage
                    key={index}
                    src={product.images?.[0].url}
                    alt={product.name}
                    width={200}
                    height={125}
                    className="aspect-square   w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                  />

                  {product?.isOnSale && (
                    <p className=" absolute animate-pulse top-4 right-3 bg-red-600 px-4 text-white font-bold rounded-4xl">
                      SALE
                    </p>
                  )}
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3
                      className="text-sm text-gray-700 font-bold "
                      aria-label="name"
                    >
                      {product.name}
                    </h3>
                    <p
                      className="mt-1 text-sm text-gray-500"
                      aria-label="title"
                    >
                      {product.title}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    $
                    {Math.min(
                      ...product.variants?.map(
                        (item: ProductVariant) => item?.price
                      )
                    )}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPage={productAll?.data?.pageTotal}
        />
      </div>
    </div>
  );
};
export default ProductLists;
