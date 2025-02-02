import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "../reducers";
import { TaskGatewayInMemory } from "../../core/infra/TaskGatewayInMemory";

export const store = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: { extraArgument: { taskGateway: TaskGatewayInMemory() } },
      }),
  });
};
