import type { ReactNode } from "react";

import classNames from "classnames";
import { TrendingUp, Users } from "lucide-react";

const Button = ({
  icon,
  label,
  selected,
}: {
  icon: ReactNode;
  label: string;
  selected: boolean;
}) => {
  return (
    <button
      className={classNames(
        "flex flex-1 flex-col items-center gap-1 pt-2 pb-4",
        selected ? "text-lime-400" : "text-zinc-500",
      )}
      type="button"
    >
      <span className="text-">{icon}</span>
      <span className="text-xs">{label}</span>
    </button>
  );
};

export const BottomNavigation = () => {
  return (
    <nav className="fixed inset-x-0 bottom-0 flex justify-between bg-white/10 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg">
      <Button icon={<TrendingUp />} label="요약" selected={true} />
      <Button icon={<Users />} label="공유하기" selected={false} />
    </nav>
  );
};
