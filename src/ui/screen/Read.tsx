import { XIcon } from "lucide-react";

import { Button } from "../base/Button";
import { useAuthNavigator } from "./Auth";

export const Read = () => {
  useAuthNavigator({ goToAuth: true });
  return (
    <main className="p-8 pb-32">
      <div className="flex justify-between">
        <h2 className="mb-8 text-xl font-medium">긍정적인 글귀 읽기</h2>
        <Button onClick={() => history.back()} size="icon" variant="outline">
          <XIcon />
        </Button>
      </div>
      <div className="rounded-xl bg-zinc-900 p-4 break-keep">
        여기에 이제 어쩌구 저쩌구 긍정적인 글이 들어갑니다. 오늘도 화이팅
        !여기에 이제 어쩌구 저쩌구 긍정적인 글이 들어갑니다. 오늘도 화이팅
        !여기에 이제 어쩌구 저쩌구 긍정적인 글이 들어갑니다. 오늘도 화이팅
        !여기에 이제 어쩌구 저쩌구 긍정적인 글이 들어갑니다. 오늘도 화이팅
        !여기에 이제 어쩌구 저쩌구 긍정적인 글이 들어갑니다. 오늘도 화이팅
        !여기에 이제 어쩌구 저쩌구 긍정적인 글이 들어갑니다. 오늘도 화이팅 !
      </div>
      <Button className="mt-20 block w-full">완료</Button>
    </main>
  );
};
