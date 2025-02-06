import * as React from "react";

import * as Atoms from "~/components/atoms";
import * as Molecules from "~/components/templates";
import { Mode, useThemeContext } from "~/contexts/ThemeContext";
import { ThemedPicker } from "../atoms/ThemedPicker";

const modes = [
  {
    label: "Tema Claro",
    value: "light",
    Icon: () => (
      <Atoms.Icons className="size-8 text-primary" type="feather" name="sun" />
    ),
  },
  {
    label: "Tema Escuro",
    value: "dark",
    Icon: () => (
      <Atoms.Icons
        className="size-8  text-primary"
        type="feather"
        name="moon"
      />
    ),
  },
  {
    label: "Automático",
    value: "system",
    Icon: () => (
      <Atoms.Icons
        className="size-8  text-primary"
        type="feather"
        name="smartphone"
      />
    ),
  },
];

const ChangeThemePicker = () => {
  const { colorScheme, setColorScheme, openPicker, setOpenPicker } =
    useThemeContext();
  const pickerRef = React.useRef<Molecules.BottomSheetMethods>(null);

  React.useEffect(() => {
    if (openPicker) {
      pickerRef.current?.open();
      return;
    }
    pickerRef.current?.close();
  }, [openPicker]);

  const handleChange = (mode: string) => {
    setColorScheme(mode as Mode);
    setOpenPicker(false);
  };
  const onClose = React.useCallback(() => {
    setOpenPicker(false);
  }, []);

  return (
    <ThemedPicker
      onClose={onClose}
      ref={pickerRef}
      onValueChange={handleChange}
      list={modes}
      selected={colorScheme}
    />
  );
};

export { ChangeThemePicker };
