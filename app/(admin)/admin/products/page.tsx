"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ProductsPage = () => {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.push("/admin/products/addproduct")}>
        Add Products
      </Button>
    </div>
  );
};
export default ProductsPage;
