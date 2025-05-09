const data = [
  {
    content:
      "거의 집 밖으로 나가지 않고 대부분의 시간을 집이나 자신의 방 안에서 보낸다.",
    order: 1,
    questionId: 1,
  },
  {
    content:
      "최근 6개월 이상 학교나 직장 등에 나가지 않고 지낸 상태이다 (학업이나 일을 중단한 상태이다).",
    order: 2,
    questionId: 2,
  },
  {
    content: "생활 리듬이 불규칙하거나 밤낮이 바뀌어 생활하고 있다.",
    order: 3,
    questionId: 3,
  },
  {
    content:
      "외모 관리나 개인 위생에 신경 쓰지 않는다 (옷차림이나 머리 단정, 청결 등을 거의 돌보지 않는다).",
    order: 4,
    questionId: 4,
  },
  {
    content:
      "사람을 만나면 긴장되거나 불안하여, 가능하면 만남 자체를 피하고 싶다.",
    order: 5,
    questionId: 5,
  },
  {
    content:
      "다른 사람들의 시선을 받는 것이 부담스럽다 (밖에 나가 사람들 눈에 띄는 상황이 두렵다).",
    order: 6,
    questionId: 6,
  },
  {
    content:
      "다른 사람들과 함께 있으면 귀찮고 짜증이 난다 (타인과 어울리는 것이 거북하고 거슬린다).",
    order: 7,
    questionId: 7,
  },
  {
    content:
      "혼자 있을 때 가장 마음이 편안하다 (다른 사람과 함께 있을 때보다).",
    order: 8,
    questionId: 8,
  },
  {
    content: "친한 친구나 가까운 지인이 거의 없다.",
    order: 9,
    questionId: 9,
  },
  {
    content: "가족과도 대화를 거의 하지 않고 지낸다.",
    order: 10,
    questionId: 10,
  },
  {
    content: "자신의 고민이나 중요한 이야기를 털어놓을 사람이 주변에 없다.",
    order: 11,
    questionId: 11,
  },
  {
    content: "부모나 가족의 경제적 지원에 의존하며 생활하고 있다.",
    order: 12,
    questionId: 12,
  },
  {
    content: "다른 사람들과 전화 통화나 온라인 연락조차 거의 하지 않는다.",
    order: 13,
    questionId: 13,
  },
  {
    content:
      "사회 일반의 규칙이나 가치관에 동의하지 않거나 따르고 싶지 않다 (스스로 사회와 동떨어져 있다는 느낌이 있다).",
    order: 14,
    questionId: 14,
  },
  {
    content:
      "장래(미래)에 대한 계획을 세우거나 이야기를 나누는 일이 거의 없다 (앞날에 대한 관심이나 논의를 피한다).",
    order: 15,
    questionId: 15,
  },
  {
    content: "스스로 현재 심각하게 사회와 단절되어 있다고 느낀다.",
    order: 16,
    questionId: 16,
  },
];

export const TestForm = () => {
  return (
    <main className="p-8">
      <h2 className="text-xl font-medium">기본 검사</h2>
      <div className="pt-8"></div>
      <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      ></form>
    </main>
  );
};
