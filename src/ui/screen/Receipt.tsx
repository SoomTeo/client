import { XIcon } from "lucide-react";
import Webcam from "react-webcam";
import { toast } from "sonner";

import { usePromise } from "../../hook/usePromise";
import { MISSION_POINTS, MissionData } from "../../service/data-type";
import { Button } from "../base/Button";
import { ErrorMessage } from "../base/ErrorMessage";
import { useAuth } from "./Auth";

const createBlobFromBase64 = (image: string) => {
  const [meta, base64] = image.split(",");
  const mimeMatch = meta.match(/data:(.*);base64/);
  const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";

  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  const blob = new Blob([bytes], { type: mimeType });
  return blob;
};

export const Receipt = ({ id, title, type }: MissionData) => {
  const client = useAuth((auth) => auth.client);
  const { error, pending, run } = usePromise(async (image: string) => {
    const form = new FormData();
    form.append("receiptImage", createBlobFromBase64(image), "receipt.jpg");

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
      <Webcam
        audio={false}
        autoPlay
        className="aspect-[3/4] rounded-md object-cover"
        muted
        playsInline
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: { ideal: "environment" } }}
      >
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        {({ getScreenshot }) => (
          <Button
            className="mt-20 block w-full"
            disabled={pending}
            onClick={() => {
              const image = getScreenshot();

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
