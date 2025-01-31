import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import persistReducer from "./persistReducer";
import { rootReducer } from "./reducers";
import { tasksGatewayHttp } from "../core/infra/TaskGatewayHttp";
import { api } from "../core/infra/adapters/httpClient";
import { TaskGateway } from "../core/infra/TaskGateway";

export type ThunkAPIExtras = { taskGateway: TaskGateway };

export type AppAsyncThunkConfig = {
  state: RootState;
  extra?: ThunkAPIExtras;
};

export const store = configureStore({
  reducer: persistReducer(rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: { taskGateway: tasksGatewayHttp(api) } },
    }),
  enhancers: (getDefaultEnhancers) =>
    console.tron?.createEnhancer
      ? getDefaultEnhancers().concat(console.tron.createEnhancer())
      : getDefaultEnhancers(),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
