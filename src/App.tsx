import { BrowserRouter } from "router2";

import { Auth } from "./ui/screen/Auth";
import { DoMission } from "./ui/screen/DoMission";
import { Home } from "./ui/screen/Home";
import { InfoForm } from "./ui/screen/InfoForm";
import { Mission } from "./ui/screen/Mission";
import { Register } from "./ui/screen/Register";
import { Share } from "./ui/screen/Share";
import { SignIn } from "./ui/screen/SignIn";
import { Splash } from "./ui/screen/Splash";
import { TestForm } from "./ui/screen/TestForm";

export const App = () => {
  return (
    <Splash>
      <Auth>
        <BrowserRouter
          routes={{
            "/": () => <Home />,
            "/404": () => <div>404</div>,
            "/info-form": () => <InfoForm />,
            "/mission": () => <Mission />,
            "/mission/:id": () => <DoMission />,
            "/register": () => <Register />,
            "/share": () => <Share />,
            "/sign-in": () => <SignIn />,
            "/test-form": () => <TestForm />,
          }}
        >
          {(Page) => <Page />}
        </BrowserRouter>
      </Auth>
    </Splash>
  );
};
