import classNames from "classnames";
import { XIcon } from "lucide-react";
import { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { Button } from "../base/Button";
import { useAuthNavigator } from "./Auth";

export const Voice = () => {
  useAuthNavigator({ goToAuth: true });
  const { listening, transcript } = useSpeechRecognition();

  const score = transcript.split("안녕").length - 1;

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true, language: "ko-KR" });
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  return (
    <main className="p-8 pb-32">
      <div className="flex justify-between">
        <h2 className="mb-8 text-xl font-medium">긍정적인 말하기</h2>
        <Button onClick={() => history.back()} size="icon" variant="outline">
          <XIcon />
        </Button>
      </div>
      <div className="flex aspect-square items-center justify-center">
        <div
          className={classNames(
            "size-20 rounded-full bg-white",
            listening && "animate-pulse",
          )}
        ></div>
      </div>
      <h2 className="text-center text-xl font-medium">{`'사랑해' 라고 10번 말하세요`}</h2>

      <div className="mt-10">
        <span className="font-mono text-4xl">{score}/10</span>
      </div>
      <Button className="mt-20 block w-full" disabled={score < 10}>
        완료
      </Button>
    </main>
  );
};
