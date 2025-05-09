import {
  type ReactNode,
  startTransition,
  useEffect,
  useState,
  unstable_ViewTransition as ViewTransition,
} from "react";

import { Logo } from "../base/Logo";

export const Splash = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      startTransition(() => {
        setIsLoading(false);
      });
    }, 1500);
  }, []);

  if (isLoading) {
    return (
      <ViewTransition>
        <div className="fixed inset-0 flex items-center justify-center">
          <Logo />
        </div>
      </ViewTransition>
    );
  }
  return children;
};
