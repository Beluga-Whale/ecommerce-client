const ShopByCategory = () => {
  return (
    <section className="bg-white max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 py-10 ">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        Shop by Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mx-auto relative ">
        <div className="sm:col-span-2 relative">
          <img
            src="/images/t-shirt-category.jpg"
            alt=""
            className="w-full h-[250px] rounded-4xl object-cover"
          />
          <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl bg-black/40 rounded-4xl">
            T-Shirts
          </p>
        </div>
        <div className="relative">
          <img
            src="/images/t-shirt-category.jpg"
            alt=""
            className="w-full h-[250px] rounded-4xl object-cover"
          />
          <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl bg-black/40 rounded-4xl">
            Shirts
          </p>
        </div>
        <div className="relative">
          <img
            src="/images/t-shirt-category.jpg"
            alt=""
            className="w-full h-[250px] rounded-4xl object-cover"
          />
          <p className="absolute inset-0 flex items-center justify-center text-center text-white font-bold text-xl bg-black/40 rounded-4xl">
            Neutral Collection
          </p>
        </div>
        <div className="sm:col-span-2 relative">
          <img
            src="/images/t-shirt-category.jpg"
            alt=""
            className=" w-full h-[250px] rounded-4xl object-cover  "
          />
          <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl bg-black/40 rounded-4xl">
            Outerwear
          </p>
        </div>
        <a
          href="/products"
          className="text-sm font-semibold text-black hover:underline inline-flex items-center gap-1 justify-center md:col-span-2"
        >
          View All Products →
        </a>
      </div>
    </section>
  );
};
export default ShopByCategory;
