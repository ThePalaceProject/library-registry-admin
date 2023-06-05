import { configureStore } from "@reduxjs/toolkit";
import { Store } from "redux";
import reducers, { State } from "./reducers";

export default function buildStore(initialState?): Store<State> {
  return configureStore({
    reducer: reducers,
    preloadedState: initialState,
  });
}
