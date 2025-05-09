import { FormEvent, useState } from "react";

export const useForm = <T>(handleForm: (data: T) => Promise<unknown>) => {
  const [pending, setPending] = useState(false);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      setPending(true);
      e.preventDefault();
      const data = Object.fromEntries(
        new FormData(e.currentTarget).entries(),
      ) as T;
      await handleForm(data);
    } finally {
      setPending(false);
    }
  };

  return {
    onSubmit,
    pending,
  };
};
