import { BrowserRouter } from "router2";

import { Home } from "./ui/screen/Home";
import { Mission } from "./ui/screen/Mission";
import { Share } from "./ui/screen/Share";
import { Splash } from "./ui/screen/Splash";

export const App = () => {
  return (
    <Splash>
      <BrowserRouter
        routes={{
          "/": () => <Home />,
          "/404": () => <div>404</div>,
          "/mission": () => <Mission />,
          "/share": () => <Share />,
        }}
      >
        {(Page) => <Page />}
      </BrowserRouter>
    </Splash>
  );
};
