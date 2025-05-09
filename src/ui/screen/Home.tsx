import dayjs from "dayjs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

import { BottomNavigation } from "../base/BottomNavigation";
import { Card } from "../base/Card";

const chartData = [{ visitors: 62 }];

const dailyData = [
  { desktop: 186 },
  { desktop: 305 },
  { desktop: 237 },
  { desktop: 73 },
  { desktop: 209 },
  { desktop: 214 },
  { desktop: 24 },
  { desktop: 183 },
  { desktop: 169 },
  { desktop: 30 },
];

export const Home = () => {
  return (
    <main className="min-h-screen min-w-screen bg-black p-5 pb-40 text-sm text-white/90">
      <Header />
      <div className="mt-5 grid grid-cols-2 gap-5">
        <Card className="col-span-2" title="오늘">
          <div className="flex items-center gap-4 p-5">
            <TotalChart />
            <div className="flex flex-col text-lg leading-5 font-light">
              <span>목표 채우기</span>
              <span className="text-rose-600">64 / 82점</span>
            </div>
          </div>
        </Card>
        <Card title="일간 추세">
          <div className="aspect-square p-5">
            <div className="flex flex-col">
              <span className="text-sm font-light">최근 3일</span>
              <span className="text-lg text-purple-500">64점</span>
            </div>
            <LineChart barClassName="fill-purple-500" />
          </div>
        </Card>
        <Card title="주간 추세">
          <div className="aspect-square p-5">
            <div className="flex flex-col">
              <span className="text-sm font-light">최근 3주</span>
              <span className="text-lg text-sky-500">120점</span>
            </div>
            <LineChart barClassName="fill-sky-500" />
          </div>
        </Card>
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
function LineChart({ barClassName }: { barClassName?: string }) {
  return (
    <ResponsiveContainer maxHeight={80}>
      <BarChart data={dailyData}>
        <CartesianGrid
          className="stroke-zinc-800"
          horizontal={false}
          syncWithTicks
        />
        <Bar className={barClassName} dataKey="desktop" radius={2} />
      </BarChart>
    </ResponsiveContainer>
  );
}
