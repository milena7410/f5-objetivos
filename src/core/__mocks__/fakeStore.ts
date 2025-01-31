import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "../../store/reducers";
import { TaskGatewayInMemory } from "../infra/TaskGatewayInMemory";

export const store = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: { extraArgument: { taskGateway: TaskGatewayInMemory() } },
      }),
  });
};
