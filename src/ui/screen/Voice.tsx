import classNames from "classnames";
import { XIcon } from "lucide-react";
import { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { toast } from "sonner";

import { useForm } from "../../hook/useForm";
import { MISSION_POINTS, MissionData } from "../../service/data-type";
import { Button } from "../base/Button";
import { useAuth } from "./Auth";

export const Voice = ({ description, id, title, type }: MissionData) => {
  const client = useAuth((auth) => auth.client);

  const { onSubmit, pending } = useForm(async () => {
    await client.post<{ feedback: string }>(`mission/${id}/complete`, {
      json: { isSuccess: true },
    });
    history.back();
    toast(`${MISSION_POINTS[type]}점이 추가되었습니다.`);
  });

  const { listening, transcript } = useSpeechRecognition();

  const score = transcript.split(title).length - 1;

  useEffect(() => {
    toast("흰색 점을 탭해서 시작하세요.");
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  return (
    <main className="p-8 pb-32">
      <div className="flex justify-between">
        <h2 className="mb-8 text-xl font-medium">{title}</h2>
        <Button onClick={() => history.back()} size="icon" variant="outline">
          <XIcon />
        </Button>
      </div>
      <div
        className="flex aspect-square items-center justify-center"
        onClick={() =>
          SpeechRecognition.startListening({
            continuous: true,
            language: "ko-KR",
          })
        }
      >
        <div
          className={classNames(
            "size-20 rounded-full bg-white",
            listening && "animate-pulse",
          )}
        ></div>
      </div>
      <h2 className="text-center text-xl font-medium">{description}</h2>
      <div className="mt-10">
        <span className="font-mono text-4xl">{score}/10</span>
      </div>
      <form onSubmit={onSubmit}>
        <Button className="mt-20 block w-full" disabled={score < 10 || pending}>
          완료
        </Button>
      </form>
    </main>
  );
};
