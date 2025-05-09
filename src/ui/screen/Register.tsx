import { useRouter } from "router2";

import { Button } from "../base/Button";
import { Input } from "../base/Input";
import { Label } from "../base/Label";

export const Register = () => {
  const { push } = useRouter();
  return (
    <main className="p-8">
      <h2 className="text-xl font-medium">회원가입</h2>
      <div className="pt-8"></div>
      <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          push({ pathname: "/info-form" });
        }}
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">닉네임</Label>
          <Input id="name" type="text" />
        </div>
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
