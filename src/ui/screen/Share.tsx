import { BottomNavigation } from "../base/BottomNavigation";
import { useAuthNavigator } from "./Auth";

export const Share = () => {
  useAuthNavigator({ goToAuth: true });
  return (
    <main>
      공유하기!
      <BottomNavigation />
    </main>
  );
};
