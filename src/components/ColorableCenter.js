import React from "react"
import { 
  Center,
  useColorMode,
} from "native-base"


export default function ColorCenter({children}) {
  const { colorMode } = useColorMode();
  return (
    <Center flex={1} bg={colorMode === 'dark' ? 'black' : 'white'}>
      {children}
    </Center>
  ); 
}