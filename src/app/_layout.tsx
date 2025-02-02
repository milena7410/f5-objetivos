import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";

import "react-native-reanimated";

import { store } from "~/store";
import { ThemeProvider } from "~/contexts/ThemeContext";
import { EntryPoint } from "~/components/page/EntryPoint";

if (__DEV__) {
  require("~/config/reactotron");
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("~/assets/fonts/SpaceMono-Regular.ttf"),
  });

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <EntryPoint />
      </ThemeProvider>
    </Provider>
  );
};

export default RootLayout;
