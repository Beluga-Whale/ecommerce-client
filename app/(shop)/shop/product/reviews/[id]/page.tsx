import CardReview from "@/components/CardReview";
import CardUserReviews from "@/components/CardUserReviews";

const ReviewPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-5">
      <div className="mx-auto max-w-5xl px-6 ">
        <CardReview />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <CardUserReviews />
          <CardUserReviews />
        </div>
      </div>
    </div>
  );
};
export default ReviewPage;
