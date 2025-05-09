import { use, useEffect, useState } from "react";

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<null | string>(null);
  const [trace, setTrace] = useState<GeolocationPosition[]>([]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setTrace((prev) => [...prev, position]);
        setLocation(position);
        setError(null);
      },
      () => {
        setError("error detected");
      },
      { enableHighAccuracy: true },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return { error, location, trace };
};
