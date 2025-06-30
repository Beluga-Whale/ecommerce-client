import { StarIcon } from "@heroicons/react/20/solid";
import RatingBreakdown from "./RatingBreakdown";
import { ReviewAllProductSummaryApiResponse } from "@/types";

type CardReviewProps = {
  reviewAll: ReviewAllProductSummaryApiResponse | undefined;
};

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

const CardReview = ({ reviewAll }: CardReviewProps) => {
  const ratingCounts = {
    5: reviewAll?.data.countPerStar[5] ?? 0,
    4: reviewAll?.data.countPerStar[4] ?? 0,
    3: reviewAll?.data.countPerStar[3] ?? 0,
    2: reviewAll?.data.countPerStar[2] ?? 0,
    1: reviewAll?.data.countPerStar[1] ?? 0,
  };

  return (
    <div className=" w-full  bg-white rounded-xl   shadow-sm p-4 inline-block sm:flex sm:justify-between sm:h-auto ">
      <div className="w-full space-x-3  flex sm:flex-col  sm:space-y-3">
        <h3 className="text-4xl font-bold">
          {reviewAll?.data?.average.toFixed(1)}
        </h3>
        <div className="flex items-center">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              aria-hidden="true"
              className={classNames(
                (reviewAll?.data?.average ?? 0) > rating
                  ? "text-amber-400"
                  : "text-gray-200",
                "size-4 shrink-0"
              )}
            />
          ))}
        </div>
        <p className="text-sm mt-[10px] ">
          {reviewAll?.data?.reviewList.length} reviews
        </p>
      </div>
      <div className="w-full my-3 ">
        <RatingBreakdown ratingCounts={ratingCounts} total={30} />
      </div>
    </div>
  );
};
export default CardReview;
