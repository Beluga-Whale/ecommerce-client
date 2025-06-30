import { Progress } from "@/components/ui/progress";

type RatingBreakdownProps = {
  ratingCounts: Record<number, number>; // เช่น {5: 12, 4: 3, 3: 2, 2: 1, 1: 0}
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
            {/* ความกว้างตัวเลขดาวแค่ 18 px */}
            <span className="w-[18px] text-right flex items-center ">
              {star} <span className="text-amber-400">★</span>{" "}
            </span>

            {/* h-2 = bar เตี้ยลง, rounded-full ทำให้แท่งมนๆ  */}
            <Progress value={percent} className="h-2 rounded-full flex-1 " />

            {/* ตัวเลขจำนวนรีวิวชิดขวาเล็กน้อย */}
            <span className="w-8 text-right">{count}</span>
          </div>
        );
      })}
    </div>
  );
};

export default RatingBreakdown;
