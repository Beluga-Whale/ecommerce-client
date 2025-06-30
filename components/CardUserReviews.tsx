import { StarIcon } from "@heroicons/react/20/solid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
const reviews = { href: "#", average: 4, totalCount: 119 };
const CardUserReviews = () => {
  return (
    <div className="w-full sm:max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-4 my-4">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>Thanathat Jivapaiboonsak</p>
      </div>
      <div className="my-3">
        <div className="flex items-center ">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              aria-hidden="true"
              className={classNames(
                reviews.average > rating ? "text-amber-400" : "text-gray-200",
                "size-3 shrink-0"
              )}
            />
          ))}
          <p className="text-xs text-gray-400 ml-3">7 วันที่ผ่านมา</p>
        </div>
      </div>
      <div>
        <p>อร่อยมากกกก</p>
      </div>
    </div>
  );
};
export default CardUserReviews;
