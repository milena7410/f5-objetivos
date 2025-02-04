import * as React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { cssInterop } from "nativewind";
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Task } from "~/core/domain/Task";
import { useTodos } from "~/store/reducers/todos/actions";
import * as Atoms from "../atoms";

type TodoListItemProps = {
  onLongPress?: (event: GestureResponderEvent) => void;
  task: Task;
  isActive?: boolean;
  index?: number;
};

type RightActionProps = {
  progressAnimatedValue: SharedValue<number>;
  dragAnimatedValue: SharedValue<number>;
  swipeable: SwipeableMethods;
  item: Task;
};
function RightAction({ dragAnimatedValue, item }: RightActionProps) {
  const { deleteTask } = useTodos();
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: dragAnimatedValue.value + 70 }],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Pressable
        className="flex-1"
        onPress={() => {
          deleteTask(item.id);
        }}
      >
        <View className="flex-1 w-20 bg-danger items-center justify-center">
          <Atoms.Icons
            type="feather"
            name="trash-2"
            className="text-white size-7"
          />
        </View>
      </Pressable>
    </Reanimated.View>
  );
}

type SwipeableProps = React.PropsWithChildren<{
  containerStyle?: {};
  item: Task;
  startOpened?: boolean;
}>;

export const Swipeable = cssInterop(
  ({ children, item, startOpened, ...rest }: SwipeableProps) => {
    const openAnimation = React.useRef(startOpened);
    const [rerender, setRerender] = React.useState(false);
    const reanimated = React.useRef<SwipeableMethods>(null);

    React.useEffect(() => {
      if (!openAnimation.current) {
        return;
      }
      setTimeout(() => {
        reanimated.current?.openRight();
      }, 1000);
      setRerender(true);
    }, [rerender]);

    return (
      <ReanimatedSwipeable
        ref={reanimated}
        friction={2}
        enableTrackpadTwoFingerGesture
        onSwipeableOpen={() => {
          if (openAnimation.current) {
            openAnimation.current = false;
            reanimated.current?.close();
          }
        }}
        rightThreshold={70}
        renderRightActions={(
          progressAnimatedValue,
          dragAnimatedValue,
          swipeable
        ) =>
          RightAction({
            progressAnimatedValue,
            dragAnimatedValue,
            swipeable,
            item,
          })
        }
        {...rest}
      >
        {children}
      </ReanimatedSwipeable>
    );
  },
  {
    className: {
      target: "containerStyle",
    },
  }
);

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    borderTopWidth: 1,
  },
  swipeable: {
    height: 50,
    backgroundColor: "papayawhip",
    alignItems: "center",
  },
});

const TodoListItem = ({
  isActive,
  onLongPress,
  task,
  index,
}: TodoListItemProps) => (
  <Swipeable item={task} startOpened={index === 0} className="flex-1 shrink-0">
    <TouchableOpacity
      className="flex-1 self-stretch"
      onLongPress={onLongPress}
      disabled={isActive}
    >
      <Atoms.ThemedView
        className={`h-20 shrink-0 items-center justify-center ${
          isActive ? "bg-primary/60 dark:bg-primary/30" : ""
        }`}
      >
        <Atoms.ThemedText className="text-center text-xl">
          {task.title}
        </Atoms.ThemedText>
      </Atoms.ThemedView>
    </TouchableOpacity>
  </Swipeable>
);

export { TodoListItem };
