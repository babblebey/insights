import EChartsReact from "echarts-for-react";
import { useMemo } from "react";
import { StatsType } from "lib/hooks/api/useFetchMetricStats";
import Card from "components/atoms/Card/card";
import humanizeNumber from "lib/utils/humanizeNumber";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

type MetricCardProps = {
  stats: StatsType[] | undefined;
  variant: "stars" | "forks";
  range: 7 | 30 | 90;
  isLoading: boolean;
};

export default function MetricCard({ stats, variant, range, isLoading }: MetricCardProps) {
  const countProperty = variant === "stars" ? "star_count" : "forks_count";
  const seriesData = useMemo(() => stats?.map((stat) => stat[countProperty] ?? 0) ?? [], [countProperty, stats]);
  const bucketData = useMemo(() => stats?.map((stat) => new Date(stat.bucket).toDateString()) ?? [], [stats]);

  const option = useMemo(() => {
    return {
      xAxis: {
        type: "category",
        data: bucketData,
        show: false,
      },
      yAxis: {
        type: "value",
        show: false,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      series: [
        {
          data: seriesData,
          symbol: "none",
          type: variant === "stars" ? "line" : "bar",
        },
      ],
      color: "hsla(19, 100%, 50%, 1)",
    };
  }, [bucketData, seriesData, variant]);

  const total = useMemo(
    () => seriesData?.reduce((stat, currentValue) => (stat || 0) + (currentValue || 0), 0),
    [seriesData]
  );

  return (
    <Card className="w-full xl:max-w-lg h-fit p-5 pl-6 flex flex-col gap-4">
      <h2 className="flex gap-2 items-center text-xl font-semibold capitalize">
        {variant}{" "}
        {isLoading ? (
          <span>
            <SkeletonWrapper width={100} height={24} />
          </span>
        ) : (
          <span className="font-medium text-base text-slate-500">{range} days</span>
        )}
      </h2>

      {isLoading ? (
        <SkeletonWrapper width={300} height={95} />
      ) : (
        <div className="flex justify-between items-center px-2 gap-4 md:gap-8">
          <p className="text-5xl font-bold">{humanizeNumber(total!, "abbreviation")}</p>
          <div className="h-fit">
            <EChartsReact option={option} style={{ height: "100%", width: "100%" }} />
          </div>
        </div>
      )}
    </Card>
  );
}
