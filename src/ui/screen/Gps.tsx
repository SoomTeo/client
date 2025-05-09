import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { XIcon } from "lucide-react";

import { useDuration } from "../../hook/useDuration";
import { useGeolocation } from "../../hook/useGeolocation";
import { getDistanceFromLatLonInMeters } from "../../service/util";
import { Button } from "../base/Button";

dayjs.extend(duration);

export const Gps = () => {
  const duration = useDuration();
  const { trace } = useGeolocation();

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

  return (
    <main className="p-8 pb-32">
      <div className="flex justify-between">
        <h2 className="mb-8 text-xl font-medium">산책 인증하기</h2>
        <Button onClick={() => history.back()} size="icon" variant="outline">
          <XIcon />
        </Button>
      </div>
      <div className="flex aspect-square items-center justify-center">
        <div className="size-20 animate-bounce rounded-full bg-white"></div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-mono text-4xl">{distance.toLocaleString()}m</span>
        <span className="font-mono text-4xl">
          {dayjs
            .duration(duration, "second")
            .format(duration > 60 ? "m분 s초" : "s초")}
        </span>
      </div>
      <Button className="mt-20 block w-full" disabled>
        완료
      </Button>
    </main>
  );
};
