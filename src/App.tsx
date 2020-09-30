import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Game } from "./features/Game";
import { Global, css } from "@emotion/core";

// @ts-expect-error
import galaxySrc from "./files/galaxy-1837306_1920.jpg";

export const App: React.FunctionComponent = () => (
  <Provider store={store}>
    <Global
      styles={css({
        "html,body,#app": {
          width: "100vw",
          height: "100vh",
          margin: 0,
        },
        "#app": {
          display: "flex",
          flexDirection: "column",
          backgroundImage: `url(${galaxySrc})`,
        },
      })}
    />
    <Game />
  </Provider>
);
