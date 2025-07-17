import { useGetAllProducts } from "@/services/productServices";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

const NewArrivals = () => {
  const { data: productAll } = useGetAllProducts(1, [], [], 4);
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-6 text-center">New Arrivals</h2>
      <div className="mt-6 grid max-w-5xl mx-auto grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {(productAll?.data?.products ?? []).slice(0, 4).map((item) => (
          <div key={item.id}>
            <Link href={`/shop/product/${item.id}`}>
              <CldImage
                src={item.images?.[0].url}
                alt={item.name}
                width={200}
                height={125}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
            </Link>
            <h3
              className="text-center font-medium mt-2"
              aria-label="categoryName"
            >
              {item?.categoryName}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};
export default NewArrivals;
