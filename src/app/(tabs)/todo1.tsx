import React, { useRef, useState } from "react";
import { Animated, StyleProp, StyleSheet, ViewStyle } from "react-native";
import {
  PanGestureHandler,
  State,
  PanGestureHandlerStateChangeEvent,
  PanGestureHandlerGestureEvent,
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { LoremIpsum, USE_NATIVE_DRIVER } from "./comon";

type DraggableBoxProps = {
  minDist?: number;
  boxStyle?: StyleProp<ViewStyle>;
};

const DraggableBox: React.FC<DraggableBoxProps> = (props) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const lastOffset = useRef({ x: 0, y: 0 }).current;

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: USE_NATIVE_DRIVER }
  );

  const onHandlerStateChange = (event: PanGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastOffset.y += event.nativeEvent.translationY;
      translateY.setOffset(lastOffset.y);
      translateY.setValue(0);
    }
  };

  return (
    <PanGestureHandler
      {...props}
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
      minDist={props.minDist}
    >
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{ translateX: translateX }, { translateY: translateY }],
          },
          props.boxStyle,
        ]}
      />
    </PanGestureHandler>
  );
};

const Example: React.FC = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <LoremIpsum words={10} />
        <DraggableBox />
        <LoremIpsum words={20} />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  box: {
    width: 150,
    height: 150,
    alignSelf: "center",
    backgroundColor: "plum",
    margin: 10,
    zIndex: 200,
  },
});

export default Example;
