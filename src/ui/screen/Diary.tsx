import { XIcon } from "lucide-react";

import { Button } from "../base/Button";
import { Textarea } from "../base/TextArea";

export const Diary = () => {
  return (
    <main className="p-8 pb-32">
      <div className="flex justify-between">
        <h2 className="mb-8 text-xl font-medium">일기 작성하기</h2>
        <Button onClick={() => history.back()} size="icon" variant="outline">
          <XIcon />
        </Button>
      </div>
      <Textarea placeholder="오늘 하루는 어땠나요?" rows={16} />
      <Button className="mt-20 block w-full">완료</Button>
    </main>
  );
};
