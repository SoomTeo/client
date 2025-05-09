import { Plus, UsersRound } from "lucide-react";
import { useRouter } from "router2";
import useSWR from "swr";

import { usePromise } from "../../hook/usePromise";
import { BottomNavigation } from "../base/BottomNavigation";
import { Button } from "../base/Button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../base/Drawer";
import { ErrorMessage } from "../base/ErrorMessage";
import { Header } from "../base/Header";
import { useAuth, useAuthNavigator } from "./Auth";

export const Share = () => {
  useAuthNavigator({ goToAuth: true });
  const { push } = useRouter();
  const { data } = useSWR<{ id: number; nickname: string }[]>(`friend`);
  return (
    <main className="min-h-screen min-w-screen p-5 pb-40 text-sm text-white/90">
      <Header title="공유하기" />
      <div className="mt-5"></div>
      <div className="flex flex-col items-center rounded-xl bg-zinc-900 py-7">
        <UsersRound className="text-zinc-500" size={40} />
        <span className="mt-2 text-lg font-medium">활동 공유</span>
        <p className="pt-1 text-center text-zinc-500">
          다른 사람들과 활동을 공유하고,
          <br />
          서로의 성과를 응원해보세요.
        </p>
        <FindFriendDrawer />
      </div>
      {data && data.length > 0 && (
        <div className="animate-in slide-in-from-bottom-2 fade-in mt-9 rounded-xl bg-zinc-900 px-5 py-2 duration-700">
          {data.map((user) => (
            <button
              className="flex items-center justify-between py-2 duration-200 active:scale-95 active:opacity-95"
              key={user.id}
              onClick={() => push({ pathname: `/user/${user.id}` })}
            >
              <div className="flex items-center gap-2">
                <span className="block size-8 rounded-full bg-gradient-to-br from-pink-300 to-emerald-500"></span>
                <span>{user.nickname}</span>
              </div>
            </button>
          ))}
        </div>
      )}
      <BottomNavigation />
    </main>
  );
};

const FindFriendDrawer = () => {
  const client = useAuth((auth) => auth.client);
  const { data, mutate } =
    useSWR<{ id: number; nickname: string }[]>(`friend/random`);
  const { error, pending, run } = usePromise(async (id: number) => {
    await client.post(`friend/request`, { json: { toUserId: id } });
    await mutate();
  });
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="mt-3" variant="secondary">
          친구 찾기
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>친구 찾기</DrawerTitle>
        </DrawerHeader>
        <ErrorMessage error={error} />
        <div className="p-5 pb-16">
          <div className="h-[50vh] overflow-y-scroll rounded-xl bg-zinc-900 p-5">
            {data?.map((user) => (
              <div
                className="flex items-center justify-between py-2"
                key={user.id}
              >
                <div className="flex items-center gap-2">
                  <span className="block size-8 rounded-full bg-gradient-to-br from-pink-300 to-emerald-500"></span>
                  <span>{user.nickname}</span>
                </div>
                <Button
                  disabled={pending}
                  onClick={() => run(user.id)}
                  size="icon"
                  variant="secondary"
                >
                  <Plus />
                </Button>
              </div>
            ))}
            {data?.length == 0 && (
              <div className="flex h-full items-center justify-center">
                <span className="text-sm text-zinc-500">
                  이미 친구가 많네요. 당신은 인싸!
                </span>
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
