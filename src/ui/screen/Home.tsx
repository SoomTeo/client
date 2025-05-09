import dayjs from "dayjs";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

import { BottomNavigation } from "../base/BottomNavigation";

const chartData = [{ visitors: 62 }];

export const Home = () => {
  return (
    <main className="min-h-screen min-w-screen bg-black p-5 pb-40 text-sm text-white/90">
      <Header />
      <div className="mt-5">
        <div className="rounded-xl bg-zinc-900">
          <div className="border-b border-zinc-800 px-3 py-1.5 font-medium">
            점수 링
          </div>
          <div className="flex items-center gap-4 p-5">
            <TotalChart />
            <div className="flex flex-col text-lg leading-5 font-light">
              <span>목표 채우기</span>
              <span className="text-rose-600">64 / 82점</span>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </main>
  );
};

const today = dayjs();
const week = ["일", "월", "화", "수", "목", "금", "토"];
const Header = () => {
  return (
    <header className="flex items-end justify-between">
      <div>
        <span className="block text-sm font-medium text-zinc-500">
          {today.format("M월 D일")} {week[today.get("day")]}요일
        </span>
        <span className="block pt-1 text-3xl font-semibold">요약</span>
      </div>
      <div>
        <span className="block size-8 rounded-full bg-gradient-to-br from-pink-300 to-emerald-500"></span>
      </div>
    </header>
  );
};
const TotalChart = () => {
  return (
    <RadialBarChart
      cx="50%"
      cy="50%"
      data={chartData}
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
        dataKey="visitors"
      />
      <PolarAngleAxis
        axisLine={false}
        domain={[0, 100]}
        tick={false}
        type="number"
      />
    </RadialBarChart>
  );
};
