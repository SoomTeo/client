import { unstable_ViewTransition as ViewTransition } from "react";
import { BrowserRouter } from "router2";

import { Home } from "./ui/screen/Home";
import { Splash } from "./ui/screen/Splash";

export const App = () => {
  return (
    <BrowserRouter
      routes={{
        "/": () => <Home />,
        "/404": () => <div>404</div>,
      }}
    >
      {(Page) => (
        <Splash>
          <ViewTransition>
            <Page />
          </ViewTransition>
        </Splash>
      )}
    </BrowserRouter>
  );
};
