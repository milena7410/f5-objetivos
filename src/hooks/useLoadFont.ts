import { useFonts } from "expo-font";
import {
  Urbanist_500Medium,
  Urbanist_500Medium_Italic,
  Urbanist_600SemiBold_Italic,
  Urbanist_700Bold,
} from "@expo-google-fonts/urbanist";

export const useLoadFont = () => {
  const [isLoaded] = useFonts({
    SpaceMono: require("~/assets/fonts/SpaceMono-Regular.ttf"),
    Urbanist: Urbanist_500Medium,
    UrbanistItalic: Urbanist_500Medium_Italic,
    UrbanistSemibold: Urbanist_600SemiBold_Italic,
    UrbanistBold: Urbanist_700Bold,
  });

  return { isLoaded };
};
