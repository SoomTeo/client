import dayjs from "dayjs";
import useSWR from "swr";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./Drawer";

const today = dayjs();
const week = ["일", "월", "화", "수", "목", "금", "토"];
export const Header = ({ title }: { title: string }) => {
  const { data } = useSWR<{
    email: string;
    level: "high" | "low" | "middle";
    nickname: string;
  }>(`user/profile`);
  return (
    <header className="flex items-end justify-between">
      <div>
        <span className="block text-sm font-medium text-zinc-500">
          {today.format("M월 D일")} {week[today.get("day")]}요일
        </span>
        <span className="block pt-1 text-3xl font-semibold">{title}</span>
      </div>
      <Drawer>
        <DrawerTrigger asChild>
          <span className="block size-8 rounded-full bg-gradient-to-br from-pink-300 to-emerald-500"></span>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>계정</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-32">
            <div className="flex items-center gap-3">
              <span className="block size-16 rounded-full bg-gradient-to-br from-pink-300 to-emerald-500"></span>
              <div className="flex flex-col">
                <span className="text-base font-medium">
                  {data?.nickname || "닉네임 없음"}
                </span>
                <span className="text-zinc-700">{data?.email}</span>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
};
