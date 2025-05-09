import { useRouter } from "router2";

import { useForm } from "../../hook/useForm";
import { client } from "../../service/api";
import { Button } from "../base/Button";
import { ErrorMessage } from "../base/ErrorMessage";
import { Input } from "../base/Input";
import { Label } from "../base/Label";
import { useAuth } from "./Auth";

export const Register = () => {
  const { push } = useRouter();
  const setToken = useAuth((auth) => auth.setToken);
  const { error, onSubmit, pending } = useForm<{
    email: string;
    nickname: string;
    password: string;
  }>(async (data) => {
    await client.post("auth/signup", { json: data });
    const { accessToken } = await client
      .post<{ accessToken: string }>("auth/login", {
        json: { email: data.email, password: data.password },
      })
      .json();
    setToken(accessToken);
    push({ pathname: "/info-form" });
  });
  return (
    <main className="p-8 pb-32">
      <h2 className="text-xl font-medium">회원가입</h2>
      <div className="pt-8"></div>
      <ErrorMessage error={error} />
      <form className="space-y-8" onSubmit={onSubmit}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="nickname">닉네임</Label>
          <Input id="nickname" name="nickname" type="text" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">이메일</Label>
          <Input id="email" name="email" type="email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">비밀번호</Label>
          <Input id="password" name="password" type="password" />
        </div>
        <Button disabled={pending}>완료</Button>
      </form>
    </main>
  );
};
