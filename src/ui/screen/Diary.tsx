import { XIcon } from "lucide-react";

import { MissionData } from "../../service/data-type";
import { Button } from "../base/Button";
import { Textarea } from "../base/Textarea";
import { useAuthNavigator } from "./Auth";

export const Diary = ({ title }: MissionData) => {
  useAuthNavigator({ goToAuth: true });
  return (
    <main className="p-8 pb-32">
      <div className="flex justify-between">
        <h2 className="mb-8 text-xl font-medium">{title}</h2>
        <Button onClick={() => history.back()} size="icon" variant="outline">
          <XIcon />
        </Button>
      </div>
      <Textarea placeholder="오늘 하루는 어땠나요?" rows={16} />
      <Button className="mt-20 block w-full">완료</Button>
    </main>
  );
};
