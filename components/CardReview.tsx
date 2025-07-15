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
  const data = reviewAll?.data;

  const average = data?.average ?? 0; // fallback 0
  const ratingCounts = {
    5: data?.countPerStar?.[5] ?? 0,
    4: data?.countPerStar?.[4] ?? 0,
    3: data?.countPerStar?.[3] ?? 0,
    2: data?.countPerStar?.[2] ?? 0,
    1: data?.countPerStar?.[1] ?? 0,
  };
  const totalReviews = data?.total ?? 0;

  return (
    <div className=" w-full  bg-white rounded-xl   shadow-sm p-4 inline-block sm:flex sm:justify-between sm:h-auto ">
      <div className="w-full space-x-3  flex sm:flex-col  sm:space-y-3">
        <h3 className="text-4xl font-bold">{average.toFixed(1)}</h3>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((rating) => {
            const filled = average >= rating;
            return (
              <StarIcon
                key={rating}
                data-testid={filled ? "star-filled" : "star-empty"}
                className={classNames(
                  filled ? "text-amber-400" : "text-gray-200",
                  "w-4 h-4 shrink-0"
                )}
              />
            );
          })}
        </div>
        <p className="text-sm mt-[10px] ">{totalReviews} reviews</p>
      </div>
      <div className="w-full my-3 ">
        <RatingBreakdown ratingCounts={ratingCounts} total={totalReviews} />
      </div>
    </div>
  );
};
export default CardReview;
