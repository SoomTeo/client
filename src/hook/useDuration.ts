import { useEffect, useState } from "react";

export const useDuration = () => {
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setDuration((p) => p + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return duration;
};
