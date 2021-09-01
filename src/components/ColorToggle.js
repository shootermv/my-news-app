import * as React from "react";
import {
  useColorMode,
  MoonIcon,
  IconButton,
  SunIcon,
} from "native-base";

function ColorToggle() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <IconButton
      onPress={toggleColorMode}
      variant="solid"
      icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
    />
  );
}
export default ColorToggle;
