import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Game } from "./features/Game";
import { Global, css } from "@emotion/core";

import { GameLayout } from "./features/GameLayout";

export const App: React.FunctionComponent = () => (
  <Provider store={store}>
    <GameLayout>
      <Game />
    </GameLayout>
  </Provider>
);
