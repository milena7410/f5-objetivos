/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors, themeColors } from "~/constants/Colors";
import { useThemeContext } from "~/contexts/ThemeContext";

type LightOrDark = { light: string; dark: string };

function useThemeColors(props: LightOrDark): { value: string };
function useThemeColors(props?: undefined): Colors;

function useThemeColors(
  props: LightOrDark | undefined
): { value: string } | Colors {
  const { colorScheme } = useThemeContext();
  if (typeof props === "undefined") {
    return themeColors[colorScheme];
  }
  return { value: props[colorScheme] };
}

export { useThemeColors };
