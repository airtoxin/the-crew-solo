import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Game } from "./features/Game";

export const App: React.FunctionComponent = () => (
  <Provider store={store}>
    <Game />
  </Provider>
);
