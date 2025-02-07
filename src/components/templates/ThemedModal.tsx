import * as React from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";

import { useThemeColors } from "~/hooks/useThemeColor";

type BottomSheetMethods = {
  close: VoidFunction;
  open: VoidFunction;
};

type ThemedModalProps = React.PropsWithChildren<{ onClose?: VoidFunction }>;

const ThemedModal = React.forwardRef<BottomSheetMethods, ThemedModalProps>(
  ({ children, onClose }, ref) => {
    const { background, tint } = useThemeColors();
    const bottomSheetRef = React.useRef<BottomSheet>(null);

    const handleClose = React.useCallback(() => {
      bottomSheetRef.current?.close();
    }, []);

    const handleOpen = React.useCallback(() => {
      bottomSheetRef.current?.collapse();
    }, []);

    React.useImperativeHandle(ref, () => ({
      close: handleClose,
      open: handleOpen,
    }));
    const renderBackdrop = React.useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          onPress={onClose}
        />
      ),
      []
    );
    return (
      <Portal hostName="ThemedModal">
        <BottomSheet
          enableDynamicSizing
          enablePanDownToClose
          index={-1}
          handleStyle={{
            backgroundColor: background,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
          android_keyboardInputMode="adjustResize"
          handleIndicatorStyle={{ backgroundColor: tint }}
          backdropComponent={renderBackdrop}
          ref={bottomSheetRef}
        >
          <BottomSheetView
            key={Date.now()}
            className="pb-safe-or-12 bg-white dark:bg-black"
          >
            {children}
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    );
  }
);

export { ThemedModal, BottomSheetMethods };
