import dayjs from "dayjs";

import { BottomNavigation } from "../base/BottomNavigation";

const today = dayjs();
const week = ["일", "월", "화", "수", "목", "금", "토"];
export const Home = () => {
  return (
    <main className="min-h-screen min-w-screen bg-black p-5 pb-40 text-white">
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
      <BottomNavigation />
    </main>
  );
};
