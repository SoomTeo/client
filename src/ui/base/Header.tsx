import dayjs from "dayjs";
import { Check } from "lucide-react";
import useSWR from "swr";

import { usePromise } from "../../hook/usePromise";
import { useAuth } from "../screen/Auth";
import { Button } from "./Button";
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
  const client = useAuth((auth) => auth.client);
  const { data } = useSWR<{
    email: string;
    level: "high" | "low" | "middle";
    nickname: string;
  }>(`user/profile`);
  const { data: friendRequests, mutate } = useSWR<
    {
      fromUserNickname: string;
      id: 11;
    }[]
  >(`friend/requests`);
  const { pending, run } = usePromise(
    async (payload: { accept: boolean; requestId: number }) => {
      await client.post(`friend/respond`, { json: payload });
      await mutate();
    },
  );
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
            {friendRequests && (
              <div className="mt-9 h-[30vh] overflow-y-scroll rounded-xl bg-zinc-900 px-5 py-2">
                {friendRequests?.map((user) => (
                  <div
                    className="flex items-center justify-between py-2"
                    key={user.id}
                  >
                    <div className="flex items-center gap-2">
                      <span className="block size-8 rounded-full bg-gradient-to-br from-pink-300 to-emerald-500"></span>
                      <span>{user.fromUserNickname}</span>
                    </div>
                    <Button
                      disabled={pending}
                      onClick={() => run({ accept: true, requestId: user.id })}
                      size="icon"
                      variant="secondary"
                    >
                      <Check />
                    </Button>
                  </div>
                ))}
                {friendRequests.length === 0 && (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-sm text-zinc-500">
                      친구 요청이 없습니다.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
};
