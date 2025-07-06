import { StarIcon } from "@heroicons/react/20/solid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReviewItem } from "@/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type CardUserReviews = {
  item: ReviewItem;
};

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
const CardUserReviews = ({ item }: CardUserReviews) => {
  console.log("item", item?.created_at);
  return (
    <div className="w-full sm:max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-4 my-4">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage
            src={item?.avatar}
            className="w-full h-full object-cover"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>
          {item?.firstName} {item?.lastName}
        </p>
      </div>
      <div className="my-3">
        <div className="flex items-center ">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              aria-hidden="true"
              className={classNames(
                item.rating > rating ? "text-amber-400" : "text-gray-200",
                "size-3 shrink-0"
              )}
            />
          ))}

          <p className="text-xs text-gray-400 ml-3">
            {dayjs(item?.created_at).fromNow()}
          </p>
        </div>
      </div>
      <div>
        <p>{item?.comment}</p>
      </div>
    </div>
  );
};
export default CardUserReviews;
