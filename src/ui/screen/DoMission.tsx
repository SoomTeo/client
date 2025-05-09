import { useRouter } from "router2";
import useSWR from "swr";

import { MissionData, MissionType } from "../../service/data-type";
import { useAuthNavigator } from "./Auth";
import { Diary } from "./Diary";
import { Gps } from "./Gps";
import { Read } from "./Read";
import { Receipt } from "./Receipt";
import { Voice } from "./Voice";

export const DoMission = () => {
  useAuthNavigator({ goToAuth: true });
  const { params } = useRouter();
  const missionId = params[":id"];
  const { data } = useSWR<MissionData>(`mission/${missionId}`);

  if (!data) return null;
  switch (data.type) {
    case MissionType.BUTTON:
      return <Read {...data} />;
    case MissionType.DIARY:
      return <Diary {...data} />;
    case MissionType.GPS:
      return <Gps {...data} />;
    case MissionType.RECEIPT:
      return <Receipt {...data} />;
    case MissionType.VOICE:
      return <Voice {...data} />;
  }
};
