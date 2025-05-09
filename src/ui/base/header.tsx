import dayjs from "dayjs";

const today = dayjs();
const week = ["일", "월", "화", "수", "목", "금", "토"];
export const Header = ({ title }: { title: string }) => {
  return (
    <header className="flex items-end justify-between">
      <div>
        <span className="block text-sm font-medium text-zinc-500">
          {today.format("M월 D일")} {week[today.get("day")]}요일
        </span>
        <span className="block pt-1 text-3xl font-semibold">{title}</span>
      </div>
      <div>
        <span className="block size-8 rounded-full bg-gradient-to-br from-pink-300 to-emerald-500"></span>
      </div>
    </header>
  );
};
