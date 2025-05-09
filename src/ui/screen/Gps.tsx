import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { XIcon } from "lucide-react";
import { toast } from "sonner";

import { useDuration } from "../../hook/useDuration";
import { useForm } from "../../hook/useForm";
import { useGeolocation } from "../../hook/useGeolocation";
import { MISSION_POINTS, MissionData } from "../../service/data-type";
import { getDistanceFromLatLonInMeters } from "../../service/util";
import { Button } from "../base/Button";
import { useAuth } from "./Auth";

dayjs.extend(duration);

export const Gps = ({
  description,
  id,
  title,
  type,
  verificationData: { minDistance = 0, minDuration = 0 } = {},
}: MissionData) => {
  const duration = useDuration();
  const { trace } = useGeolocation();

  const client = useAuth((auth) => auth.client);

  const { onSubmit, pending } = useForm(async () => {
    await client.post<{ feedback: string }>(`mission/${id}/complete`, {
      json: { isSuccess: true },
    });
    history.back();
    toast(`${MISSION_POINTS[type]}점이 추가되었습니다.`);
  });

  const { distance } = trace.slice(1).reduce(
    (acc, cur) => {
      const distance = getDistanceFromLatLonInMeters(
        acc.coords.latitude,
        acc.coords.longitude,
        cur.coords.latitude,
        cur.coords.longitude,
      );
      return {
        coords: {
          latitude: cur.coords.latitude,
          longitude: cur.coords.longitude,
        },
        distance: acc.distance + distance,
      };
    },
    {
      coords: {
        latitude: trace[0]?.coords.latitude || 0,
        longitude: trace[0]?.coords.longitude || 0,
      },
      distance: 0,
    },
  );

  const isValid = distance >= minDistance && duration >= minDuration;

  return (
    <main className="p-8">
      <div className="flex justify-between">
        <h2 className="mb-8 text-xl font-medium">{title}</h2>
        <Button onClick={() => history.back()} size="icon" variant="outline">
          <XIcon />
        </Button>
      </div>
      <div className="flex aspect-square items-center justify-center">
        <div className="size-20 animate-bounce rounded-full bg-white"></div>
      </div>
      <h2 className="text-center text-xl font-medium">{description}</h2>
      <div className="mt-10 flex flex-col gap-1">
        <span className="font-mono text-4xl">{distance.toLocaleString()}m</span>
        <span className="font-mono text-4xl">
          {dayjs
            .duration(duration, "second")
            .format(duration > 60 ? "m분 s초" : "s초")}
        </span>
      </div>
      <form onSubmit={onSubmit}>
        <Button className="mt-20 block w-full" disabled={!isValid || pending}>
          완료
        </Button>
      </form>
    </main>
  );
};
