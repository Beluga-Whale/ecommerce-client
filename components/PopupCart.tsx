import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useMemo, useState } from "react";
import { ProductDTO } from "@/types";
import { getProductID } from "@/services/api/productsApi";
import { CldImage } from "next-cloudinary";
import { Button } from "./ui/button";
import {
  productItem,
  removeCardItem,
  variantItem,
} from "@/lib/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { getCookie } from "@/lib/getCookie";
import { setDialogLoginOpen } from "@/lib/features/dialog/dialogSlice";

const PopupCart = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const cart = useAppSelector((state) => state.cart);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const variantCount = cart.cartList.reduce(
    (total: number, item: productItem) => {
      return total + item.variant.length;
    },
    0
  );
  const totalPrice = useMemo(() => {
    return cart.cartList.reduce((sum: number, cartItem: productItem) => {
      const product = products.find((p) => p.id === cartItem.productId);
      if (!product) return sum;

      const itemTotal = cartItem.variant.reduce((subTotal, v) => {
        const variant = product.variants.find(
          (varnt) => varnt.variantID === v.variantId
        );
        return (
          subTotal +
          ((variant?.price ?? 0) - (product?.salePrice ?? 0)) * v.quantity
        );
      }, 0);

      return sum + itemTotal;
    }, 0);
  }, [cart.cartList, products]);

  const handlerOrderClick = async () => {
    const cookie = await getCookie();

    if (cookie == undefined) {
      return dispatch(setDialogLoginOpen());
    }

    router.push("/shop/order");
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
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={`
        group -m-2 flex items-center p-2
        ${variantCount === 0 ? "pointer-events-none opacity-50" : ""}
       hover:cursor-pointer`}
        >
          <ShoppingBagIcon
            aria-hidden="true"
            className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {variantCount}
          </span>
          <span className="sr-only">items in cart, view bag</span>
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-80 flex justify-between flex-col space-y-5">
        <p>Shopping Cart</p>
        <Separator />
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
                      Quantity: {quantity?.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <p className="text-amber-600 text-sm">
                    ฿
                    {((price?.price ?? 0) - (product?.salePrice ?? 0)) *
                      (quantity?.quantity ?? 0)}
                  </p>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="hover:cursor-pointer"
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
            );
          });
        })}
        <Separator />
        <Button
          className="bg-amber-400 font-bold hover:cursor-pointer"
          onClick={() => handlerOrderClick()}
          disabled={totalPrice <= 0}
        >
          Order(${totalPrice.toFixed(2)})
        </Button>
      </PopoverContent>
    </Popover>
  );
};
export default PopupCart;
