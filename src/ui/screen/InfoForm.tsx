import { useRouter } from "router2";

import { useForm } from "../../hook/useForm";
import { Button } from "../base/Button";
import { ErrorMessage } from "../base/ErrorMessage";
import { Input } from "../base/Input";
import { Label } from "../base/Label";
import { RadioGroup, RadioGroupItem } from "../base/Radio";
import { useAuth, useAuthNavigator } from "./Auth";

export const InfoForm = () => {
  useAuthNavigator({ goToAuth: true });
  const { push } = useRouter();
  const client = useAuth((auth) => auth.client);
  const { error, onSubmit, pending } = useForm<{
    age: string;
    gender: "female" | "male";
  }>(async (data) => {
    await client.post("survey/profile", {
      json: { age: Number(data.age), gender: data.gender },
    });
    push({ pathname: "/test-form" });
  });
  return (
    <main className="p-8 pb-32">
      <h2 className="text-xl font-medium">정보 입력</h2>
      <div className="pt-8"></div>
      <ErrorMessage error={error} />
      <form className="space-y-8" onSubmit={onSubmit}>
        <div className="space-y-3">
          <Label className="block">성별</Label>
          <RadioGroup className="flex flex-col space-y-1" name="gender">
            {[
              ["남성", "male"],
              ["여성", "female"],
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
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="age">나이</Label>
          <Input id="age" name="age" type="number" />
        </div>
        <Button disabled={pending}>완료</Button>
      </form>
    </main>
  );
};
