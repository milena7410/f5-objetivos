import * as React from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

type BottomSheetMethods = {
  close: VoidFunction;
  open: VoidFunction;
};

type ThemeModalProps = React.PropsWithChildren<{ onClose?: VoidFunction }>;

const ThemeModal = React.forwardRef<BottomSheetMethods, ThemeModalProps>(
  ({ children, onClose }, ref) => {
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
      <BottomSheet
        enableDynamicSizing
        enablePanDownToClose
        onClose={onClose}
        index={-1}
        backdropComponent={renderBackdrop}
        ref={bottomSheetRef}
        onChange={handleChange}
      >
        <BottomSheetView className="pb-safe">{children}</BottomSheetView>
      </BottomSheet>
    );
  }
);

export { ThemeModal, BottomSheetMethods };
