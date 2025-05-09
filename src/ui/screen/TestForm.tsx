import { useRouter } from "router2";
import useSWR from "swr";

import { useForm } from "../../hook/useForm";
import { Button } from "../base/Button";
import { ErrorMessage } from "../base/ErrorMessage";
import { Label } from "../base/Label";
import { RadioGroup, RadioGroupItem } from "../base/Radio";
import { useAuth, useAuthNavigator } from "./Auth";

export const TestForm = () => {
  useAuthNavigator({ goToAuth: true });
  const { push } = useRouter();
  const client = useAuth((auth) => auth.client);
  const { data } = useSWR<
    {
      content: string;
      order: number;
      questionId: number;
    }[]
  >("survey/questions");

  const { error, onSubmit, pending } = useForm<{
    [a: string]: string;
  }>(async (form) => {
    const answers = Object.entries(form).map(([key, value]) => ({
      questionId: Number(key),
      score: Number(value),
    }));

    if (answers.length < (data?.length ?? 0)) {
      window.scrollTo(0, 0);
      throw new Error("모든 질문에 답변해주세요.");
    }

    await client.post("survey/submit", { json: { answers } });

    push({ pathname: "/" });
  });

  return (
    <main className="p-8 pb-32">
      <h2 className="text-xl font-medium">기본 검사</h2>
      <div className="pt-8"></div>
      <ErrorMessage error={error} />
      <form onSubmit={onSubmit}>
        {data && (
          <div className="animate-in slide-in-from-bottom-2 fade-in space-y-12">
            {data.map((item) => (
              <div className="space-y-3" key={item.questionId}>
                <label className="block text-lg">{item.content}</label>
                <RadioGroup
                  className="flex flex-col space-y-1"
                  name={String(item.questionId)}
                >
                  {[
                    ["해당되지 않는다.", "1"],
                    ["별로 해당되지 않는다.", "2"],
                    ["어느 쪽도 아니다.", "3"],
                    ["조금 해당된다.", "4"],
                    ["해당된다.", "5"],
                  ].map((option, index) => (
                    <div
                      className="flex items-center space-y-0 space-x-3"
                      key={index}
                    >
                      <RadioGroupItem value={option[1]} />
                      <Label className="font-normal">{option[0]}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
            <Button disabled={pending}>완료</Button>
          </div>
        )}
      </form>
    </main>
  );
};
