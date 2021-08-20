import * as React from "react";
import { useState } from "react";

import { AuthContext } from "./src/utils/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { NativeBaseProvider } from "native-base";
/* solve "setting a timer for a long period-of-time" warning */
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);

import Main from './src'

// providers
const queryClient = new QueryClient();

function App() {
  const [userToken, setUserToken] = useState(null);
  return (
    <NativeBaseProvider>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ userToken, setUserToken }}>
          <Main/>
        </AuthContext.Provider>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}

export default App;
