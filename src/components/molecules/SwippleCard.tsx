import * as React from "react";

import { cssInterop } from "nativewind";
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";

import { Task } from "~/core/domain/Task";
import { RightAction } from "./RightAction";

type SwipeableProps = React.PropsWithChildren<{
  containerStyle?: {};
  item: Task;
  startOpened?: boolean;
}>;

const SwippleCard = cssInterop(
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

export { SwippleCard };
