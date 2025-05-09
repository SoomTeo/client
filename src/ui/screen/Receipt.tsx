import { XIcon } from "lucide-react";
import { toast } from "sonner";

import { usePromise } from "../../hook/usePromise";
import { MISSION_POINTS, MissionData } from "../../service/data-type";
import { Button } from "../base/Button";
import { ErrorMessage } from "../base/ErrorMessage";
import { Webcam } from "../base/Webcam";
import { useAuth } from "./Auth";

export const Receipt = ({ id, title, type }: MissionData) => {
  const client = useAuth((auth) => auth.client);
  const { error, pending, run } = usePromise(async (image: string) => {
    const blob = await (await fetch(image)).blob();
    const form = new FormData();
    form.append("receiptImage", blob, "receipt.jpg");

    await client.post<{ feedback: string }>(`mission/${id}/complete`, {
      body: form,
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
      <ErrorMessage error={error} />
      <Webcam className="aspect-[3/4] rounded-md object-cover">
        {({ takeScreenshot }) => (
          <Button
            className="mt-20 block w-full"
            disabled={pending}
            onClick={() => {
              const image = takeScreenshot();

              if (image) {
                run(image);
              }
            }}
          >
            완료
          </Button>
        )}
      </Webcam>
    </main>
  );
};
