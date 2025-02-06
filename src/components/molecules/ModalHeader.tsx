import { PropsWithChildren } from "react";
import * as Atoms from "../atoms";

type ModalHeaderProps = {
  title?: string;
} & PropsWithChildren;

const ModalHeader = ({ children, title }: ModalHeaderProps) => {
  if (children && title) {
    return (
      <Atoms.ThemedView className="border-b flex-row border-primary items-center p-4 pt-0 mb-4">
        <Atoms.ThemedText fontStyle="bold" className="text-xl">
          {title}
        </Atoms.ThemedText>
        {children}
      </Atoms.ThemedView>
    );
  }

  return (
    <Atoms.ThemedView className="border-b border-primary p-4 pt-0 mb-4">
      {children ?? (
        <Atoms.ThemedText fontStyle="bold" className="text-xl">
          {title}
        </Atoms.ThemedText>
      )}
    </Atoms.ThemedView>
  );
};

export { ModalHeader };
