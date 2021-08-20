import * as React from "react";
import { useState } from "react";

import { AuthContext } from "./src/utils/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

import Main from "./src";

function App() {
  const [userToken, setUserToken] = useState(null);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ userToken, setUserToken }}>
        <Main />
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
