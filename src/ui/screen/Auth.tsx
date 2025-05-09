/* eslint-disable react-refresh/only-export-components */
import { KyInstance } from "ky";
import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "router2";
import { SWRConfig } from "swr";
import { create } from "zustand";

import { client } from "../../service/api";

export const useAuth = create<{
  authorized: boolean;
  client: KyInstance;
  setToken: (accessToken: string) => void;
}>((set) => ({
  authorized: false,
  client,
  setToken: (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    set(() => ({
      authorized: true,
      client: client.extend({
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    }));
  },
}));

export const Auth = ({ children }: { children: ReactNode }) => {
  const [initialized, setInitialized] = useState(false);
  const { client, setToken } = useAuth();

  useLayoutEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setToken(accessToken);
    }
    setInitialized(true);
  }, [setToken]);

  if (!initialized) {
    return null;
  }
  return (
    <SWRConfig value={{ fetcher: (key: string) => client.get(key).json() }}>
      {children}
    </SWRConfig>
  );
};

const RETURN_URL_KEY = "return-url";
export const useAuthNavigator = ({
  goToApp,
  goToAuth,
}: {
  goToApp?: boolean | string;
  goToAuth?: boolean | string;
}) => {
  const authorized = useAuth((auth) => auth.authorized);
  const { params, path, replace } = useRouter();

  useEffect(() => {
    const authPath = typeof goToAuth === "string" ? goToAuth : "/sign-in";
    const appPath = typeof goToApp === "string" ? goToApp : "/";
    if (goToAuth && !authorized) {
      replace({
        pathname: authPath,
        ...(path && { query: { ...params, [RETURN_URL_KEY]: path } }),
      });
    }

    if (goToApp && authorized) {
      const pathname = params[RETURN_URL_KEY] ?? appPath;
      replace({
        pathname,
        query: { ...params },
      });
    }
  }, [goToApp, goToAuth, authorized, params, path, replace]);
};
