import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const reactotronConfig = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: "SHX Todo List",
  })
  .use(reactotronRedux())
  .useReactNative({
    asyncStorage: false,
    networking: {
      ignoreUrls: /symbolicate/,
    },
    editor: false,
    errors: { veto: (stackFrame) => false },
    overlay: false,
  })
  .connect();

reactotronConfig.clear!();
reactotronConfig.log = reactotronConfig.log!;

export type ReactotronConfig = typeof reactotronConfig;

console.tron = reactotronConfig;
