import { XIcon } from "lucide-react";
import { useState } from "react";

import { useForm } from "../../hook/useForm";
import { MissionData } from "../../service/data-type";
import { Button } from "../base/Button";
import { Textarea } from "../base/Textarea";
import { useAuth, useAuthNavigator } from "./Auth";

export const Diary = ({ description, id, title }: MissionData) => {
  useAuthNavigator({ goToAuth: true });
  const client = useAuth((auth) => auth.client);

  const [feedback, setFeedback] = useState<null | string>(null);

  const { onSubmit, pending } = useForm<{ text: string }>(async (data) => {
    const { feedback } = await client
      .post<{ feedback: string }>(`mission/${id}/complete`, {
        json: { diaryText: data.text },
      })
      .json();
    setFeedback(feedback);
  });
  return (
    <main className="p-8 pb-32">
      <div className="flex justify-between">
        <h2 className="mb-8 text-xl font-medium">{title}</h2>
        <Button onClick={() => history.back()} size="icon" variant="outline">
          <XIcon />
        </Button>
      </div>
      {feedback == null && (
        <form onSubmit={onSubmit}>
          <Textarea name="text" placeholder={description} rows={16} />
          <Button className="mt-20 block w-full" disabled={pending}>
            완료
          </Button>
        </form>
      )}
      {typeof feedback === "string" && (
        <div className="animate-in slide-in-from-bottom-2 fade-in duration-700">
          <p className="rounded-xl bg-zinc-900 px-5 py-3 break-keep text-white/90">
            {feedback}
          </p>
          <Button
            className="mt-20 block w-full"
            onClick={() => history.back()}
            type="button"
          >
            완료
          </Button>
        </div>
      )}
    </main>
  );
};
