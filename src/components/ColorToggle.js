import * as React from "react";
import { useColorMode, MoonIcon, IconButton, SunIcon } from "native-base";

function ColorToggle() {
  const { toggleColorMode, colorMode } = useColorMode();
  return colorMode === "dark" ? (
    <SunIcon onPress={toggleColorMode} />
  ) : (
    <MoonIcon onPress={toggleColorMode} />
  );
}
export default ColorToggle;
