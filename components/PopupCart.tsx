import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
const cartList = [
  {
    name: "T-shirt",
    price: "2,000",
  },
  {
    name: "T-shirt",
    price: "2,000",
  },
  {
    name: "T-shirt",
    price: "2,000",
  },
];

const PopupCart = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="group -m-2 flex items-center p-2">
          <ShoppingBagIcon
            aria-hidden="true"
            className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            0
          </span>
          <span className="sr-only">items in cart, view bag</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 flex justify-between flex-col space-y-5">
        <p>Shopping Cart</p>
        <Separator />
        {cartList?.map((item, index) => (
          <div className="flex justify-between" key={index}>
            <div className="flex">
              <div className="w-14 h-14">
                <img
                  src="/images/cozy-hoodie.jpg"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <p>{item.name}</p>
            </div>
            <div>
              <p className="text-amber-600">${item?.price}</p>
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};
export default PopupCart;
