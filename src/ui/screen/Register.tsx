import { useRouter } from "router2";

import { useForm } from "../../hook/useForm";
import { client } from "../../service/api";
import { Button } from "../base/Button";
import { Input } from "../base/Input";
import { Label } from "../base/Label";

export const Register = () => {
  const { push } = useRouter();
  const { onSubmit } = useForm<{
    email: string;
    nickname: string;
    password: string;
  }>(async (data) => {
    console.log(data);
    // push({ pathname: "/sign-in" });
    await client.post("auth/signup", { json: data });
    const { accessToken } = await client
      .post<{ accessToken: string }>("auth/login", {
        json: { email: data.email, password: data.password },
      })
      .json();
  });
  return (
    <main className="p-8 pb-32">
      <h2 className="text-xl font-medium">회원가입</h2>
      <div className="pt-8"></div>
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
        <Button>완료</Button>
      </form>
    </main>
  );
};
