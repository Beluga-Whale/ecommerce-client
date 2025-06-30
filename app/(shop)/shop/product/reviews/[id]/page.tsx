"use client";

import CardReview from "@/components/CardReview";
import CardUserReviews from "@/components/CardUserReviews";
import { useReviewAllProductById } from "@/services/reviewServices";
import { useParams } from "next/navigation";

const ReviewPage = () => {
  const { id } = useParams();
  const { data: reviewAll } = useReviewAllProductById(Number(id));
  return (
    <div className="bg-gray-100 min-h-screen py-5">
      <div className="mx-auto max-w-5xl px-6 ">
        <CardReview reviewAll={reviewAll} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {reviewAll?.data?.reviewList?.map((item, index) => (
            <div key={index}>
              <CardUserReviews item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ReviewPage;
