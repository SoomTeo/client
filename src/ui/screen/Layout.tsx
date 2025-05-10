import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto max-w-[600px]">{children}</div>;
};
