"use client";
import { Star } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type RatingStarsProps = {
  setRating: Dispatch<SetStateAction<number>>;
  rating: number;
};

const RatingStars = ({ rating, setRating }: RatingStarsProps) => {
  const totalStars = 5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: totalStars }, (_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 cursor-pointer transition-all ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => setRating(i + 1)}
        />
      ))}
    </div>
  );
};

export default RatingStars;
