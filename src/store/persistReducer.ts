import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

import { rootReducer } from "./reducers";

export default (reducers: typeof rootReducer) => {
  const persistedReducer = persistReducer(
    {
      key: "shx-todo",
      storage: AsyncStorage,
      whitelist: ["todos"],
    },
    reducers
  );

  return persistedReducer;
};
