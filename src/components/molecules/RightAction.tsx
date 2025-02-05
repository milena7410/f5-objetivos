import * as React from "react";
import { Pressable, View } from "react-native";
import { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Task } from "~/core/domain/Task";
import { useTodos } from "~/store/reducers/todos/actions";
import * as Atoms from "../atoms";

type RightActionProps = {
  progressAnimatedValue: SharedValue<number>;
  dragAnimatedValue: SharedValue<number>;
  swipeable: SwipeableMethods;
  item: Task;
};

const RightAction = ({ dragAnimatedValue, item }: RightActionProps) => {
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
};

export { RightAction };
