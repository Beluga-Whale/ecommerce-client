"use client";
import { Star } from "lucide-react";
import { useState } from "react";

const RatingStars = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(0);
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
