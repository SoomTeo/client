import { useRouter } from "router2";

import { BottomNavigation } from "../base/BottomNavigation";
import { Header } from "../base/Header";

type MissionData = {
  id: number;
  score: number;
  title: string;
};

const items: MissionData[] = [
  { id: 0, score: 1, title: "스타벅스 가서 아메리카노 한 잔 마시기" },
  { id: 1, score: 2, title: "스타벅스 가서 아메리카노 두 잔 마시기" },
  { id: 2, score: 3, title: "스타벅스 가서 아메리카노 세 잔 마시기" },
  { id: 3, score: 4, title: "스타벅스 가서 아메리카노 네 잔 마시기" },
  { id: 4, score: 5, title: "스타벅스 가서 아메리카노 다섯 잔 마시기" },
];

export const Mission = () => {
  return (
    <main className="min-h-screen min-w-screen p-5 pb-40 text-sm text-white/90">
      <Header title="미션" />
      <div className="mt-5">
        <div className="animate-in slide-in-from-bottom-2 fade-in flex flex-col gap-1 duration-700">
          {items.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </div>
      </div>
      <BottomNavigation />
    </main>
  );
};

const Item = ({ score, title }: MissionData) => {
  const { push } = useRouter();
  return (
    <button
      className="mb-3 flex justify-between rounded-xl bg-zinc-900 p-3 duration-200 active:scale-95 active:opacity-95"
      onClick={() => push({ pathname: "/receipt" })}
    >
      <p>{title}</p>
      <span className="text-xs text-zinc-700">{score}점</span>
    </button>
  );
};
