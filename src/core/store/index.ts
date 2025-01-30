import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import persistReducer from "./persistReducer";
import { rootReducer } from "./reducers";

export const store = configureStore({
  reducer: persistReducer(rootReducer),
  enhancers: (getDefaultEnhancers) =>
    console.tron?.createEnhancer
      ? getDefaultEnhancers().concat(console.tron.createEnhancer())
      : getDefaultEnhancers(),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
