import * as React from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useThemeColors } from "~/hooks/useThemeColor";
import { Portal } from "@gorhom/portal";

type BottomSheetMethods = {
  close: VoidFunction;
  open: VoidFunction;
};

type ThemedModalProps = React.PropsWithChildren<{ onClose?: VoidFunction }>;

const ThemedModal = React.forwardRef<BottomSheetMethods, ThemedModalProps>(
  ({ children, onClose }, ref) => {
    const { background, tint } = useThemeColors();
    const bottomSheetRef = React.useRef<BottomSheet>(null);

    const handleChange = React.useCallback((index: number) => {
      console.log("ModalChange", index);
    }, []);

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
          onPress={handleClose}
        />
      ),
      []
    );
    return (
      <Portal hostName="ThemedModal">
        <BottomSheet
          enableDynamicSizing
          enablePanDownToClose
          onClose={onClose}
          index={-1}
          handleStyle={{
            backgroundColor: background,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
          handleIndicatorStyle={{ backgroundColor: tint }}
          backdropComponent={renderBackdrop}
          ref={bottomSheetRef}
          onChange={handleChange}
        >
          <BottomSheetView className="pb-safe-or-12 bg-white dark:bg-black">
            {children}
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    );
  }
);

export { ThemedModal, BottomSheetMethods };
