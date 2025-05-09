import { BrowserRouter } from "router2";

import { Auth } from "./ui/screen/Auth";
import { Diary } from "./ui/screen/Diary";
import { Gps } from "./ui/screen/Gps";
import { Home } from "./ui/screen/Home";
import { InfoForm } from "./ui/screen/InfoForm";
import { Mission } from "./ui/screen/Mission";
import { Read } from "./ui/screen/Read";
import { Receipt } from "./ui/screen/Receipt";
import { Register } from "./ui/screen/Register";
import { Share } from "./ui/screen/Share";
import { SignIn } from "./ui/screen/SignIn";
import { Splash } from "./ui/screen/Splash";
import { TestForm } from "./ui/screen/TestForm";
import { Voice } from "./ui/screen/Voice";

export const App = () => {
  return (
    <Splash>
      <Auth>
        <BrowserRouter
          routes={{
            "/": () => <Home />,
            "/404": () => <div>404</div>,
            "/diary": () => <Diary />,
            "/gps": () => <Gps />,
            "/info-form": () => <InfoForm />,
            "/mission": () => <Mission />,
            "/read": () => <Read />,
            "/receipt": () => <Receipt />,
            "/register": () => <Register />,
            "/share": () => <Share />,
            "/sign-in": () => <SignIn />,
            "/test-form": () => <TestForm />,
            "/voice": () => <Voice />,
          }}
        >
          {(Page) => <Page />}
        </BrowserRouter>
      </Auth>
    </Splash>
  );
};
