import { useRouter } from "router2";
import useSWR from "swr";

import { MISSION_POINTS, MissionData } from "../../service/data-type";
import { BottomNavigation } from "../base/BottomNavigation";
import { Header } from "../base/Header";
import { useAuthNavigator } from "./Auth";

export const Mission = () => {
  useAuthNavigator({ goToAuth: true });
  const { data } = useSWR<MissionData[]>("mission");
  const newMissions = data
    ?.filter((mission) => mission.completions.length === 0)
    .slice()
    .reverse();
  return (
    <main className="min-h-screen min-w-screen p-5 pb-40 text-sm text-white/90">
      <Header title="미션" />
      <div className="mt-5">
        <div className="animate-in slide-in-from-bottom-2 fade-in flex flex-col gap-1 duration-700">
          {newMissions?.map((item) => <Item key={item.id} {...item} />)}
        </div>
      </div>
      <BottomNavigation />
    </main>
  );
};

const Item = ({ id, title, type }: MissionData) => {
  const { push } = useRouter();
  const score = MISSION_POINTS[type];
  return (
    <button
      className="mb-3 flex items-center justify-between rounded-xl bg-zinc-900 p-3 duration-200 active:scale-95 active:opacity-95"
      onClick={() => push({ pathname: `/mission/${id}` })}
    >
      <p>{title}</p>
      <span className="text-xs text-zinc-500">{score}점</span>
    </button>
  );
};
