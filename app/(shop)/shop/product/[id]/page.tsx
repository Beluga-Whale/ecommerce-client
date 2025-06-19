"use client";

import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { useParams } from "next/navigation";
import { useGetProductByID } from "@/services/productServices";
import CarouselImage from "@/components/CarouselImage";
import { ProductVariant } from "@/types";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { productItem, setCartItem } from "@/lib/features/cart/cartSlice";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];

type SizeType = {
  name: string;
  inStock: boolean;
};

export default function ProductDetailByID() {
  const [changeQuantity, setChangeQuantity] = useState<number>(1);

  // NOTE -เก็บไซด์ ไว้เพื่อดึงราคมาโชว์ เอาไป map
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { data: productByID } = useGetProductByID(Number(id));
  const sizeCheck: SizeType[] =
    productByID?.data?.variants
      ?.map((item: ProductVariant) => ({
        name: item.size ?? "",
        inStock: item?.stock > 0,
      }))
      .sort((a, b) => sizeOrder.indexOf(a.name) - sizeOrder.indexOf(b.name)) ??
    [];

  // NOTE - หาราคา Price
  const priceProductSize = productByID?.data?.variants?.find(
    (item) => item.size === selectedSize
  );

  console.log("priceProductSize", priceProductSize);
  console.log("productByID", productByID);

  const handleIncrease = () => {
    setChangeQuantity(changeQuantity + 1);
  };

  const handleDecrease = () => {
    setChangeQuantity(changeQuantity - 1);
  };

  const handleAddToCart = () => {
    const selectedVariant = productByID?.data?.variants?.find(
      (v) => v.size === selectedSize
    );

    console.log("selectedVariant", selectedVariant);
    if (!selectedVariant) {
      alert("กรุณาเลือกขนาดที่มีสินค้า");
      return;
    }

    const payload: productItem = {
      productId: productByID?.data?.id ?? 0,
      variant: [
        {
          variantId: selectedVariant.variantID,
          quantity: changeQuantity,
        },
      ],
    };
    dispatch(setCartItem(payload));
  };

  useEffect(() => {
    if (sizeCheck.length > 0 && !selectedSize) {
      const firstAvailable = sizeCheck.find((s) => s.inStock);
      if (firstAvailable) {
        setSelectedSize(firstAvailable.name);
      }
    }
  }, [sizeCheck, selectedSize]);

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li className="text-sm">
              {/* <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              > */}
              {productByID?.data?.name}
              {/* </a> */}
            </li>
          </ol>
        </nav>
        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-4 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-16">
            <CarouselImage />
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:col-span-2 lg:mt-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {productByID?.data?.name}
            </h1>
            {productByID?.data?.isOnSale ? (
              <div className="flex items-center ">
                <p className="text-3xl">
                  {" "}
                  $
                  {(priceProductSize?.price ?? 0) -
                    (productByID?.data?.salePrice ?? 0)}
                </p>
                <p className="ml-4 line-through text-base text-gray-400 ">
                  ${priceProductSize?.price ?? 0}
                </p>
              </div>
            ) : (
              <p className="text-3xl"> ${priceProductSize?.price ?? 0}</p>
            )}

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        reviews.average > rating
                          ? "text-amber-400"
                          : "text-gray-200",
                        "size-5 shrink-0"
                      )}
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-amber-600 hover:text-amber-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a
                    href="#"
                    className="text-sm font-medium text-amber-600 hover:text-amber-500"
                  >
                    Size guide
                  </a>
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  {selectedSize && (
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {sizeCheck.map((size) => (
                        <Radio
                          key={size.name}
                          value={size.name}
                          disabled={!size.inStock}
                          className={({ checked }) =>
                            classNames(
                              size.inStock
                                ? "cursor-pointer bg-white text-gray-900 shadow-xs"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              checked
                                ? "ring-2 ring-amber-500 border-amber-500"
                                : "",
                              "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          <span>{size.name}</span>
                        </Radio>
                      ))}
                    </RadioGroup>
                  )}
                </fieldset>
              </div>

              <div className="mt-4 flex justify-between items-center max-w-80">
                <p>Quantity</p>
                <Button
                  type="button"
                  className="rounded-md px-3 bg-amber-400 hover:bg-amber-500  "
                  onClick={() => handleDecrease()}
                  disabled={changeQuantity == 1}
                >
                  <Minus />
                </Button>
                <Input
                  type="string"
                  value={changeQuantity}
                  readOnly
                  className="w-12 text-center border-x-0 rounded-none"
                />
                <Button
                  type="button"
                  className="rounded-md px-3 bg-amber-400 hover:bg-amber-500"
                  onClick={() => handleIncrease()}
                  disabled={changeQuantity == priceProductSize?.stock}
                >
                  <Plus />
                </Button>
                <p>{priceProductSize?.stock} in stock</p>
              </div>

              <button
                type="button"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-amber-400 px-8 py-3 text-base font-medium text-white hover:bg-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-hidden hover:cursor-pointer"
                onClick={() => handleAddToCart()}
              >
                Add to Cart
              </button>

              <div className="mt-10">
                <h3 className="sr-only">Description</h3>
                <div
                  className="space-y-4"
                  dangerouslySetInnerHTML={{
                    __html: productByID?.data?.description || "",
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
