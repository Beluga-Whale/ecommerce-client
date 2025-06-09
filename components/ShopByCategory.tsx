const ShopByCategory = () => {
  return (
    <section className="px-6 py-16 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Shop by Category</h2>
      <div className="grid grid-cols-2 gap-4">
        <img
          src="/images/t-shirt-category.jpg"
          alt=""
          className="row-span-2 h-80"
        />
        <div className="grid gap-4">
          <img src="/images/t-shirt-category.jpg" alt="" className="h-80" />
          <img src="/images/t-shirt-category.jpg" alt="" className="h-80" />
        </div>
      </div>
      {/* <div className="mt-6 text-right">
        <a
          href="/products"
          className="text-sm font-semibold text-black hover:underline inline-flex items-center gap-1"
        >
          View All Products →
        </a>
      </div> */}
    </section>
  );
};
export default ShopByCategory;
