import Image from "next/image";

const NewArrivals = () => {
  const newList = [
    {
      category: "Oversize T-Shirt",
      image: "/images/oversize.jpg",
    },
    {
      category: "Cozy Hoodie",
      image: "/images/cozy-hoodie.jpg",
    },
    {
      category: "Linen Shirt",
      image: "/images/linen-shirt.jpg",
    },
    {
      category: "Zip-Up Jacket",
      image: "/images/jacket.jpg",
    },
  ];

  return (
    <section className="pt-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-6 text-center">New Arrivals</h2>
      <div className="flex flex-wrap justify-center gap-4 ">
        {newList?.map((item) => (
          <div key={item.category}>
            <img
              src={item?.image}
              alt=""
              className="w-auto h-80 rounded-2xl "
            />
            <h3 className="text-center font-medium mt-2">{item.category}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
export default NewArrivals;
