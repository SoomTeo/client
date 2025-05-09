import { UsersRound } from "lucide-react";

import { BottomNavigation } from "../base/BottomNavigation";
import { Button } from "../base/Button";
import { Header } from "../base/Header";
import { useAuthNavigator } from "./Auth";

export const Share = () => {
  useAuthNavigator({ goToAuth: true });
  return (
    <main className="min-h-screen min-w-screen p-5 pb-40 text-sm text-white/90">
      <Header title="공유하기" />
      <div className="mt-5"></div>
      <div className="flex flex-col items-center rounded-xl bg-zinc-900 py-7">
        <UsersRound className="text-zinc-500" size={40} />
        <span className="mt-2 text-base font-medium">활동 공유</span>
        <p className="pt-1 text-center text-zinc-500">
          다른 사람들과 활동을 공유하고,
          <br />
          서로의 성과를 응원해보세요.
        </p>
        <Button className="mt-3" variant="secondary">
          친구 찾기
        </Button>
      </div>
      <BottomNavigation />
    </main>
  );
};
