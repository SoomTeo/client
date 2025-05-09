import type { ReactNode } from "react";

import classNames from "classnames";
import { CalendarCheck, TrendingUp, Users } from "lucide-react";
import { useRouter } from "router2";

const Button = ({
  icon,
  label,
  onClick,
  selected,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  selected: boolean;
}) => {
  return (
    <button
      className={classNames(
        "flex flex-1 flex-col items-center gap-1 pt-2 pb-2",
        selected ? "text-lime-400" : "text-zinc-500",
      )}
      onClick={onClick}
      type="button"
    >
      <span>{icon}</span>
      <span className="text-xs">{label}</span>
    </button>
  );
};

export const BottomNavigation = () => {
  const { path, replace } = useRouter();
  return (
    <nav className="fixed inset-x-0 bottom-0 flex justify-between bg-white/10 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg">
      <Button
        icon={<TrendingUp />}
        label="요약"
        onClick={() => {
          replace({ pathname: "/" });
        }}
        selected={path == "/"}
      />
      <Button
        icon={<CalendarCheck />}
        label="미션"
        onClick={() => replace({ pathname: "/mission" })}
        selected={path == "/mission"}
      />
      <Button
        icon={<Users />}
        label="공유하기"
        onClick={() => replace({ pathname: "/share" })}
        selected={path == "/share"}
      />
    </nav>
  );
};
