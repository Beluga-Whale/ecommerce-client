const ShopByCategory = () => {
  return (
    <section className="px-6 py-16 bg-white max-w-7xl mx-auto  ">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        Shop by Category
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-red-400 ">
        <img
          src="/images/t-shirt-category.jpg"
          alt=""
          className=" w-full h-full object-cover md:col-span-2 "
        />
        <img
          src="/images/t-shirt-category.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <img
          src="/images/t-shirt-category.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <img
          src="/images/t-shirt-category.jpg"
          alt=""
          className=" w-full h-full object-cover  md:col-span-2"
        />
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
