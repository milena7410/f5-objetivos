import * as React from "react";
import { SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

export const useSplashScreen = (alowOpenApp: boolean) => {
  React.useEffect(() => {
    if (alowOpenApp) {
      SplashScreen.hideAsync();
    }
  }, [alowOpenApp]);

  return { alowOpenApp };
};
