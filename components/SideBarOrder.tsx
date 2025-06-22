import React, { useEffect, useMemo, useState } from "react";
import { Separator } from "./ui/separator";
import { useAppSelector } from "@/lib/hooks";
import { productItem } from "@/lib/features/cart/cartSlice";
import { ProductDTO } from "@/types";
import { getProductID } from "@/services/api/productsApi";

const SideBarOrder = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const cart = useAppSelector((state) => state.cart);

  const totalPrice = useMemo(() => {
    return cart.cartList.reduce((sum: number, cartItem: productItem) => {
      const product = products.find((p) => p.id === cartItem.productId);
      if (!product) return sum;

      const itemTotal = cartItem.variant.reduce((subTotal, v) => {
        const variant = product.variants.find(
          (varnt) => varnt.variantID === v.variantId
        );
        return subTotal + (variant?.price ?? 0) * v.quantity;
      }, 0);

      return sum + itemTotal - (product?.salePrice ?? 0);
    }, 0);
  }, [cart.cartList, products]);

  const priceBeforVat = totalPrice * 0.7;
  const vat = totalPrice - totalPrice * 0.7;

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
    <div className="bg-white text-2xl font-bold p-4 rounded-2xl ">
      <h3 className="mb-5">Order Summery</h3>
      <Separator />
      <div className="flex items-center justify-between my-3">
        <p className="text-gray-500 text-base  font-normal">Delivery : </p>
        <p className="text-base">$0.00</p>
      </div>
      <div className="flex items-center justify-between my-3">
        <p className="text-gray-500 text-base  font-normal">
          Price befor vat :{" "}
        </p>
        <p className="text-base">${priceBeforVat.toFixed(2)}</p>
      </div>
      <div className="flex items-center justify-between my-3">
        <p className="text-gray-500 text-base  font-normal">Vat 7% : </p>
        <p className="text-base">${vat.toFixed(2)}</p>
      </div>

      <div className="flex items-center justify-between my-3">
        <p className="text-gray-500 text-base  font-bold">Discount Total </p>
      </div>
      <div className="flex items-center justify-between my-3">
        <p className="text-gray-500 text-base  font-normal">Discount : </p>
        <p className="text-base">$0.0</p>
      </div>
      <Separator />
      <div className="flex items-center justify-between my-3">
        <p className=" font-bold">Total </p>
        <p className="font-bold">${totalPrice.toFixed(2)}</p>
      </div>
      <div className="flex items-center justify-between my-3">
        <p className=" text-base  font-normal">Total(including VAT)</p>
      </div>
    </div>
  );
};

export default SideBarOrder;
