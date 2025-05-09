import { HTTPError } from "ky";
import { useState } from "react";

export const usePromise = <A>(getPromise: (a: A) => Promise<unknown>) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const run = async (a: A) => {
    try {
      setPending(true);
      await getPromise(a);
      setError(null);
    } catch (err) {
      if (err instanceof HTTPError) {
        const response = await err.response.json();
        setError(response?.message ?? "다시 시도해주세요");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("다시 시도해주세요");
      }
    } finally {
      setPending(false);
    }
  };

  return {
    error,
    pending,
    run,
  };
};
