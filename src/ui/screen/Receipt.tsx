import { XIcon } from "lucide-react";
import Webcam from "react-webcam";

import { Button } from "../base/Button";
import { useAuthNavigator } from "./Auth";

export const Receipt = () => {
  useAuthNavigator({ goToAuth: true });
  return (
    <main className="p-8 pb-32">
      <div className="flex justify-between">
        <h2 className="mb-8 text-xl font-medium">영수증 인증하기</h2>
        <Button onClick={() => history.back()} size="icon" variant="outline">
          <XIcon />
        </Button>
      </div>
      <Webcam
        audio={false}
        className="aspect-[3/4] rounded-md object-cover"
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: { ideal: "environment" } }}
      >
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        {({ getScreenshot }) => (
          <Button
            className="mt-5 block w-full"
            onClick={() => {
              const image = getScreenshot();
              console.log(image);
            }}
          >
            완료
          </Button>
        )}
      </Webcam>
    </main>
  );
};
