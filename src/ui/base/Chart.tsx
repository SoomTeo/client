import {
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

import { Today } from "../../service/data-type";

export const TotalChart = ({ data }: { data: Today }) => {
  return (
    <RadialBarChart
      cx="50%"
      cy="50%"
      data={[data]}
      endAngle={-270}
      height={140}
      innerRadius="80%"
      outerRadius="130%"
      startAngle={90}
      width={140}
    >
      <RadialBar
        background={{ className: "fill-rose-600/10" }}
        className="fill-rose-600"
        cornerRadius={50}
        dataKey="progress"
      />
      <PolarAngleAxis
        axisLine={false}
        domain={[0, data.targetPoints]}
        tick={false}
        type="number"
      />
    </RadialBarChart>
  );
};
export function LineChart({
  barClassName,
  data,
}: {
  barClassName?: string;
  data: { progress: number }[];
}) {
  return (
    <ResponsiveContainer maxHeight={80}>
      <BarChart data={data}>
        <CartesianGrid
          className="stroke-zinc-800"
          horizontal={false}
          syncWithTicks
        />
        <Bar className={barClassName} dataKey="progress" radius={2} />
      </BarChart>
    </ResponsiveContainer>
  );
}
