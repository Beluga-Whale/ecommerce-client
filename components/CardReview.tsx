import { StarIcon } from "@heroicons/react/20/solid";
import RatingBreakdown from "./RatingBreakdown";

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
const reviews = { href: "#", average: 4, totalCount: 119 };
const CardReview = () => {
  return (
    <div className=" w-full  bg-white rounded-xl   shadow-sm p-4 inline-block sm:flex sm:justify-between sm:h-auto ">
      <div className="w-full space-x-3  flex sm:flex-col  sm:space-y-3">
        <h3 className="text-4xl font-bold">4.1</h3>
        <div className="flex items-center">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              aria-hidden="true"
              className={classNames(
                reviews.average > rating ? "text-amber-400" : "text-gray-200",
                "size-4 shrink-0"
              )}
            />
          ))}
        </div>
        <p className="text-sm mt-[10px] ">54 reviews</p>
      </div>
      <div className="w-full my-3 ">
        <RatingBreakdown
          ratingCounts={{ 5: 20, 4: 6, 3: 3, 2: 1, 1: 0 }}
          total={30}
        />
      </div>
    </div>
  );
};
export default CardReview;
