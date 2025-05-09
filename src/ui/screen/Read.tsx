import { XIcon } from "lucide-react";

import { MissionData } from "../../service/data-type";
import { Button } from "../base/Button";

export const Read = ({ description, title }: MissionData) => {
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
      <Button className="mt-20 block w-full">완료</Button>
    </main>
  );
};
