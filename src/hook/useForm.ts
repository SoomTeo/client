import { HTTPError } from "ky";
import { FormEvent, useState } from "react";

export const useForm = <T>(handleForm: (data: T) => Promise<unknown>) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      setPending(true);
      e.preventDefault();
      const data = Object.fromEntries(
        new FormData(e.currentTarget).entries(),
      ) as T;
      await handleForm(data);
      setError(null);
    } catch (err) {
      if (err instanceof HTTPError) {
        const response = await err.response.json();
        setError(response?.message ?? "다시 시도해주세요");
      } else {
        setError("다시 시도해주세요");
      }
    } finally {
      setPending(false);
    }
  };

  return {
    error,
    onSubmit,
    pending,
  };
};
