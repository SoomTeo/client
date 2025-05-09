import { useRouter } from "router2";

import { Button } from "../base/Button";
import { Input } from "../base/Input";
import { Label } from "../base/Label";

export const SignIn = () => {
  const { push } = useRouter();
  return (
    <main className="p-8 pb-32">
      <h2 className="text-xl font-medium">로그인</h2>
      <div className="pt-8"></div>
      <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          push({ pathname: "/" });
        }}
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">비밀번호</Label>
          <Input id="password" type="password" />
        </div>
        <Button>완료</Button>
      </form>
    </main>
  );
};
