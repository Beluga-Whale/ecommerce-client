import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { ProductDTO } from "@/types";
import { getProductID } from "@/services/api/productsApi";
import { CldImage } from "next-cloudinary";
import { Button } from "./ui/button";
import {
  productItem,
  removeCardItem,
  variantItem,
} from "@/lib/features/cart/cartSlice";

const PopupCart = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchAllProducts = async () => {
      if (!cart?.cartList) return;

      try {
        const responses = await Promise.all(
          cart?.cartList.map((item: any) => getProductID(item.productId))
        );

        const data = responses.map((res) => res.data);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch cart products", error);
      }
    };

    fetchAllProducts();
  }, [cart.cartList]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="group -m-2 flex items-center p-2">
          <ShoppingBagIcon
            aria-hidden="true"
            className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {cart?.cartList.length}
          </span>
          <span className="sr-only">items in cart, view bag</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 flex justify-between flex-col space-y-5">
        <p>Shopping Cart</p>
        <Separator />
        {cart?.cartList.map((cartItem: productItem, index: any) => {
          const product = products.find((p) => p.id === cartItem.productId);

          return cartItem.variant.map((v: variantItem) => {
            const price = product?.variants.find(
              (item) => item?.variantID == v.variantId
            );
            const quantity = cartItem?.variant.find(
              (item) => item?.variantId == v.variantId
            );
            return (
              <div
                className="flex justify-between"
                key={`${cartItem.productId}-${v.variantId}`}
              >
                <div className="flex">
                  <div className="w-14 h-14 rounded-lg">
                    <CldImage
                      src={product?.images?.[0].url || ""}
                      alt="Product image"
                      width={200}
                      height={125}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="ml-2 flex flex-col">
                    <p className="font-medium">{product?.name}</p>
                    <p className="text-sm text-gray-500">Size: {price?.size}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {quantity?.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <p className="text-amber-600 text-sm">
                    ฿{(price?.price ?? 0) * (quantity?.quantity ?? 0)}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      dispatch(
                        removeCardItem({
                          productId: cartItem.productId,
                          variantId: v.variantId,
                        })
                      )
                    }
                  >
                    ❌
                  </Button>
                </div>
              </div>
            );
          });
        })}
        {/* {products?.map((item, index) => (
          <div className="flex justify-between" key={index}>
            <div className="flex">
              <div className="w-14 h-14 rounded-lg">
                <CldImage
                  key={index}
                  src={item?.images?.[0].url}
                  alt="Product image"
                  width={200}
                  height={125}
                  className="w-full h-full object-contain  "
                />
              </div>
              <p>{item?.name}</p>
            </div>
            <div>
              <p className="text-amber-600">${item?.price}</p>
            </div>
            <Button onClick={() => removeCardItem(item?.id)}>X</Button>
          </div>
        ))} */}
      </PopoverContent>
    </Popover>
  );
};
export default PopupCart;
