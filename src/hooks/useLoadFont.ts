import { useFonts } from "expo-font";

export const useLoadFont = () => {
  const [isLoaded] = useFonts({
    SpaceMono: require("~/assets/fonts/SpaceMono-Regular.ttf"),
  });

  return { isLoaded };
};
