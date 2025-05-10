import useSWR from "swr";

import { Stat } from "../../service/data-type";
import { BottomNavigation } from "../base/BottomNavigation";
import { Card } from "../base/Card";
import { LineChart, TotalChart } from "../base/Chart";
import { Header } from "../base/Header";
import { useAuthNavigator } from "./Auth";

export const Home = () => {
  useAuthNavigator({ goToAuth: true });
  const { data } = useSWR<Stat>(`user/progress`);
  if (!data) return null;
  return (
    <main className="min-h-screen p-5 pb-40 text-sm text-white/90">
      <Header title="요약" />
      <div className="mt-5 grid grid-cols-2 gap-5">
        <Card className="col-span-2" title="오늘">
          <div className="flex items-center gap-4 p-5">
            <TotalChart data={data.today} />
            <div className="flex flex-col text-lg leading-5 font-light">
              <span>목표 채우기</span>
              <span className="text-rose-600">
                {data?.today.progress} / {data?.today.targetPoints}점
              </span>
            </div>
          </div>
        </Card>
        <Card title="일간 추세">
          <div className="aspect-square p-5">
            <div className="flex flex-col">
              <span className="text-sm font-light">최근 3일</span>
              <span className="text-lg text-purple-500">
                {data?.dailyLast3Avg}점
              </span>
            </div>
            <LineChart barClassName="fill-purple-500" data={data.dailyTrends} />
          </div>
        </Card>
        <Card title="주간 추세">
          <div className="aspect-square p-5">
            <div className="flex flex-col">
              <span className="text-sm font-light">최근 3주</span>
              <span className="text-lg text-sky-500">
                {data?.weeklyLast3Avg}점
              </span>
            </div>
            <LineChart barClassName="fill-sky-500" data={data.weeklyTrends} />
          </div>
        </Card>
      </div>
      <BottomNavigation />
    </main>
  );
};
