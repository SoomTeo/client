import { KyInstance } from "ky";
import { ReactNode } from "react";
import { create } from "zustand";

import { client } from "../../service/api";

export const useAuth = create<{
  client: KyInstance;
  setToken: (accessToken: string) => void;
}>((set) => ({
  client,
  setToken: (accessToken: string) => {
    set(() => ({
      client: client.extend({
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    }));
  },
}));

export const Auth = ({ children }: { children: ReactNode }) => {
  return children;
};
