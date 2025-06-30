import { Progress } from "@/components/ui/progress";

type RatingBreakdownProps = {
  ratingCounts: Record<number, number>;
  total: number;
};

const RatingBreakdown = ({ ratingCounts, total }: RatingBreakdownProps) => {
  return (
    <div className="space-y-1 max-w-xs text-xs">
      {[5, 4, 3, 2, 1].map((star) => {
        const count = ratingCounts[star] ?? 0;
        const percent = total ? (count / total) * 100 : 0;

        return (
          <div key={star} className="flex items-center space-x-1">
            <span className="w-[18px] text-right flex items-center ">
              {star} <span className="text-amber-400">★</span>{" "}
            </span>

            <Progress value={percent} className="h-2 rounded-full flex-1 " />
          </div>
        );
      })}
    </div>
  );
};

export default RatingBreakdown;
