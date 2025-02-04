import * as React from "react";

import { Provider } from "react-redux";

import "react-native-reanimated";

import { store } from "~/store";
import { ThemeProvider } from "~/contexts/ThemeContext";
import { EntryPoint } from "~/components/page/EntryPoint";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout = () => (
  <Provider store={store}>
    <ThemeProvider>
      <GestureHandlerRootView>
        <EntryPoint />
      </GestureHandlerRootView>
    </ThemeProvider>
  </Provider>
);

export default RootLayout;
