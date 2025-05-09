import type { ReactNode } from "react";

import classNames from "classnames";

export const Card = ({
  children,
  className,
  title,
}: {
  children: ReactNode;
  className?: string;
  title: string;
}) => {
  return (
    <div className={classNames("rounded-xl bg-zinc-900", className)}>
      <div className="border-b border-zinc-800 px-3 py-1.5 font-medium">
        {title}
      </div>
      {children}
    </div>
  );
};
