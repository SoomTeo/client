/* eslint-disable react-refresh/only-export-components */
import { KyInstance } from "ky";
import { ReactNode, useLayoutEffect, useState } from "react";
import { SWRConfig } from "swr";
import { create } from "zustand";

import { client } from "../../service/api";

export const useAuth = create<{
  client: KyInstance;
  setToken: (accessToken: string) => void;
}>((set) => ({
  client,
  setToken: (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    set(() => ({
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
