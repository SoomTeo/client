import { BrowserRouter } from "router2";

import { Gps } from "./ui/screen/Gps";
import { Home } from "./ui/screen/Home";
import { InfoForm } from "./ui/screen/InfoForm";
import { Mission } from "./ui/screen/Mission";
import { Receipt } from "./ui/screen/Receipt";
import { Register } from "./ui/screen/Register";
import { Share } from "./ui/screen/Share";
import { SignIn } from "./ui/screen/SignIn";
import { Splash } from "./ui/screen/Splash";
import { TestForm } from "./ui/screen/TestForm";

export const App = () => {
  return (
    <Splash>
      <BrowserRouter
        routes={{
          "/": () => <Home />,
          "/404": () => <div>404</div>,
          "/gps": () => <Gps />,
          "/info-form": () => <InfoForm />,
          "/mission": () => <Mission />,
          "/receipt": () => <Receipt />,
          "/register": () => <Register />,
          "/share": () => <Share />,
          "/sign-in": () => <SignIn />,
          "/test-form": () => <TestForm />,
        }}
      >
        {(Page) => <Page />}
      </BrowserRouter>
    </Splash>
  );
};
