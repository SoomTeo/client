import { BrowserRouter } from "router2";

import { Home } from "./ui/screen/Home";
import { Splash } from "./ui/screen/Splash";

export const App = () => {
  return (
    <Splash>
      <BrowserRouter
        routes={{
          "/": () => <Home />,
          "/404": () => <div>404</div>,
        }}
      >
        {(Page) => <Page />}
      </BrowserRouter>
    </Splash>
  );
};
