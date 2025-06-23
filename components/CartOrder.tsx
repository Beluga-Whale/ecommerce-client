import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { ProductDTO } from "@/types";
import { getProductID } from "@/services/api/productsApi";
import { CldImage } from "next-cloudinary";
import { Button } from "./ui/button";
import {
  deCreaseCartItemQuantity,
  inCreaseCartItemQuantity,
  productItem,
  removeCardItem,
  variantItem,
} from "@/lib/features/cart/cartSlice";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Input } from "./ui/input";

const CartOrder = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleIncrease = (productId: number, variantId: number) => {
    const payload = {
      productId,
      variantId,
    };
    dispatch(inCreaseCartItemQuantity(payload));
  };

  const handleDecrease = (productId: number, variantId: number) => {
    const payload = {
      productId,
      variantId,
    };
    dispatch(deCreaseCartItemQuantity(payload));
  };

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
    <div className=" ">
      {cart?.cartList.map((cartItem: productItem) => {
        const product = products.find((p) => p.id === cartItem.productId);

        return cartItem.variant.map((v: variantItem) => {
          const price = product?.variants.find(
            (item) => item?.variantID == v.variantId
          );
          const quantity = cartItem?.variant.find(
            (item) => item?.variantId == v.variantId
          );
          return (
            <div key={`${cartItem.productId}-${v.variantId}`}>
              <div className="flex justify-between my-5 bg-white p-4 rounded-2xl">
                <div className="flex">
                  <div className="w-14 h-14 rounded-lg">
                    {product?.images?.[0]?.url && (
                      <CldImage
                        src={product.images[0].url}
                        alt="Product image"
                        width={200}
                        height={125}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <div className="ml-2 flex flex-col">
                    <p className="font-medium">{product?.name}</p>
                    <p className="text-sm text-gray-500">Size: {price?.size}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <p className="text-amber-600 text-lg font-bold ">
                    ฿
                    {((price?.price ?? 0) - (product?.salePrice ?? 0)) *
                      (quantity?.quantity ?? 0)}
                  </p>

                  {product?.isOnSale && (
                    <p className=" line-through text-sm text-gray-400">
                      ฿{(price?.price ?? 0) * (quantity?.quantity ?? 0)}
                    </p>
                  )}
                  <div className="flex items-end justify-end ">
                    <div className="mt-4 flex justify-between items-center max-w-80">
                      <Button
                        type="button"
                        size="sm"
                        className="rounded-md  bg-amber-400 hover:bg-amber-500  "
                        onClick={() =>
                          handleDecrease(cartItem?.productId, v.variantId)
                        }
                        disabled={(quantity?.quantity ?? 1) === 1}
                      >
                        <Minus />
                      </Button>
                      <Input
                        type="string"
                        value={quantity?.quantity}
                        readOnly
                        className="w-12 text-center border-x-0 rounded-none"
                      />
                      <Button
                        type="button"
                        size="sm"
                        className="rounded-md px-3 bg-amber-400 hover:bg-amber-500"
                        onClick={() =>
                          handleIncrease(cartItem?.productId, v.variantId)
                        }
                      >
                        <Plus />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() =>
                        dispatch(
                          removeCardItem({
                            productId: cartItem.productId,
                            variantId: v.variantId,
                          })
                        )
                      }
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        });
      })}
    </div>
  );
};

export default CartOrder;
