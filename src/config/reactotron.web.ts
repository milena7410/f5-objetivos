import Reactotron from "reactotron-react-js";
import { reactotronRedux } from "reactotron-redux";

const reactotronConfig = Reactotron.configure({
  name: "SHX Todo List",
})
  .use(reactotronRedux())
  .connect();

export type ReactotronConfig = typeof reactotronConfig;

console.tron = Reactotron;
