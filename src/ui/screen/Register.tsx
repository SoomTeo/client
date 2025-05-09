export const Register = () => {
  return (
    <main>
      <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-b from-[#f5f5f5] to-[#e0e0e0]">
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-8 shadow-lg">
          <h1 className="text-2xl font-bold">회원가입</h1>
          <form className="flex flex-col gap-4">
            <input
              className="rounded border border-gray-300 p-2"
              placeholder="이름"
              type="text"
            />
            <input
              className="rounded border border-gray-300 p-2"
              placeholder="이메일"
              type="email"
            />
            <input
              className="rounded border border-gray-300 p-2"
              placeholder="비밀번호"
              type="password"
            />
            <button
              className="rounded bg-blue-500 p-2 text-white"
              type="submit"
            >
              가입하기
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
