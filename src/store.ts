import { configureStore } from "@reduxjs/toolkit";
import { gameSlice } from "./the-crew/game";

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
});
