import * as React from "react";
import { Pressable } from "react-native";

import * as Atoms from "~/components/atoms";
import * as Templates from "~/components/templates";

type Item = { label: string; value: string; Icon?: React.FC };

type ThemedPickerProps = {
  list: Item[];
  onValueChange: (itemValue: string) => void;
  selected: string;
};

const ThemedPicker = React.forwardRef<
  Templates.BottomSheetMethods,
  ThemedPickerProps
>(({ list, onValueChange, selected }, modalRef) => {
  return (
    <Templates.ThemedModal ref={modalRef}>
      <Atoms.ThemedView
        key={Date.now()}
        className="justify-between bg-gray-200 dark:bg-gray-50 gap-0.5"
      >
        {list.map(({ value, label, Icon }) => (
          <Pressable
            key={value}
            onPress={() => {
              onValueChange(value);
            }}
          >
            <Atoms.ThemedView
              className={`flex-row justify-between p-4 align-center ${
                selected === value ? "text-primary dark:text-primary" : ""
              }`}
            >
              <Atoms.ThemedText>{label}</Atoms.ThemedText>
              {Icon && <Icon />}
            </Atoms.ThemedView>
          </Pressable>
        ))}
      </Atoms.ThemedView>
    </Templates.ThemedModal>
  );
});

export { ThemedPicker };
