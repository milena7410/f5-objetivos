import * as React from "react";

import * as Atoms from "../atoms";
import * as Templates from "../templates";
import { ModalHeader } from "./ModalHeader";

export type ConfirmModalProps = {
  modalTitle: string;
  confirmButtonVariant?: keyof Atoms.Variant;
  confirmButtonTitle: string;
  onConfirm: VoidFunction;
  cancelButtonTitle: string;
  cancelButtonVariant?: keyof Atoms.Variant;
  onCancel: VoidFunction;
};

const ConfirmModal = React.forwardRef<
  Templates.BottomSheetMethods,
  ConfirmModalProps
>(
  (
    {
      modalTitle,
      confirmButtonTitle,
      confirmButtonVariant,
      onConfirm,
      cancelButtonTitle,
      cancelButtonVariant = "secondary",
      onCancel,
    },
    ref
  ) => (
    <Templates.ThemedModal onClose={onCancel} ref={ref}>
      <ModalHeader title={modalTitle} />
      <Atoms.ThemedView className="flex-row gap-4 justify-center">
        <Atoms.ThemedButton
          variant={confirmButtonVariant}
          onPress={onConfirm}
          title={confirmButtonTitle}
        />
        <Atoms.ThemedButton
          variant={cancelButtonVariant}
          onPress={onCancel}
          title={cancelButtonTitle}
        />
      </Atoms.ThemedView>
    </Templates.ThemedModal>
  )
);

export { ConfirmModal };
