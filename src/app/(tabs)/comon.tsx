import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";

const styles = StyleSheet.create({
  lipsum: {
    padding: 10,
  },
});

type Props = {
  words?: number;
  style?: StyleProp<TextStyle>;
};

export const USE_NATIVE_DRIVER = true;

export const LoremIpsum: React.FC<Props> = ({
  words = 1000,
  style = styles.lipsum,
}) => {
  const theme = useTheme();

  const loremIpsum = () => {
    return LOREM_IPSUM.split(" ").slice(0, words).join(" ");
  };

  return (
    <Text style={[style, { color: theme.colors.text }]}>{loremIpsum()}</Text>
  );
};

export const COLORS = {
  offWhite: "#f8f9ff",
  headerSeparator: "#eef0ff",
};

const LOREM_IPSUM = `
Curabitur accumsan sit amet massa quis cursus. Fusce sollicitudin nunc nisl, quis efficitur quam tristique eget. Ut non erat molestie, ullamcorper turpis nec, euismod neque. Praesent aliquam risus ultricies, cursus mi consectetur, bibendum lorem. Nunc eleifend consectetur metus quis pulvinar. In vitae lacus eu nibh tincidunt sagittis ut id lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque sagittis mauris rhoncus, maximus justo in, consequat dolor. Pellentesque ornare laoreet est vulputate vestibulum. Aliquam sit amet metus lorem.

Morbi tempus elit lorem, ut pulvinar nunc sagittis pharetra. Nulla mi sem, elementum non bibendum eget, viverra in purus. Vestibulum efficitur ex id nisi luctus egestas. Quisque in urna vitae leo consectetur ultricies sit amet at nunc. Cras porttitor neque at nisi ornare, mollis ornare dolor pharetra. Donec iaculis lacus orci, et pharetra eros imperdiet nec. Morbi leo nunc, placerat eget varius nec, volutpat ac velit. Phasellus pulvinar vulputate tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce elementum dui at ipsum hendrerit, vitae consectetur erat pulvinar. Sed vehicula sapien felis, id tristique dolor tempor feugiat. Aenean sit amet erat libero.

Nam posuere at mi ut porttitor. Vivamus dapibus vehicula mauris, commodo pretium nibh. Mauris turpis metus, vulputate iaculis nibh eu, maximus tincidunt nisl. Vivamus in mauris nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse convallis ornare finibus`;
