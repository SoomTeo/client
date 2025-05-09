import { BrowserRouter } from "router2";

import { Home } from "./ui/screen/Home";
import { InfoForm } from "./ui/screen/InfoForm";
import { Mission } from "./ui/screen/Mission";
import { Register } from "./ui/screen/Register";
import { Share } from "./ui/screen/Share";
import { Splash } from "./ui/screen/Splash";
import { TestForm } from "./ui/screen/TestForm";

export const App = () => {
  return (
    <Splash>
      <BrowserRouter
        routes={{
          "/": () => <Home />,
          "/404": () => <div>404</div>,
          "/info-form": () => <InfoForm />,
          "/mission": () => <Mission />,
          "/register": () => <Register />,
          "/share": () => <Share />,
          "/test-form": () => <TestForm />,
        }}
      >
        {(Page) => <Page />}
      </BrowserRouter>
    </Splash>
  );
};
