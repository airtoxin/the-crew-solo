import { configureStore } from "@reduxjs/toolkit";
import { gameSlice } from "./the-crew/game";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
});
