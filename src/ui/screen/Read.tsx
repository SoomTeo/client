import { XIcon } from "lucide-react";
import { toast } from "sonner";

import { useForm } from "../../hook/useForm";
import { MISSION_POINTS, MissionData } from "../../service/data-type";
import { Button } from "../base/Button";
import { useAuth } from "./Auth";

export const Read = ({ description, id, title, type }: MissionData) => {
  const client = useAuth((auth) => auth.client);

  const { onSubmit, pending } = useForm(async () => {
    await client.post<{ feedback: string }>(`mission/${id}/complete`, {
      json: { isSuccess: true },
    });
    history.back();
    toast(`${MISSION_POINTS[type]}점이 추가되었습니다.`);
  });
  return (
    <main className="p-8 pb-32">
      <div className="flex justify-between">
        <h2 className="mb-8 text-xl font-medium">{title}</h2>
        <Button onClick={() => history.back()} size="icon" variant="outline">
          <XIcon />
        </Button>
      </div>
      <div className="rounded-xl bg-zinc-900 p-4 break-keep whitespace-pre-wrap">
        {description}
      </div>
      <form onSubmit={onSubmit}>
        <Button className="mt-20 block w-full" disabled={pending}>
          완료
        </Button>
      </form>
    </main>
  );
};
