import * as React from "react";
import { useState } from "react";

import { AuthContext } from "./src/utils/AuthContext";

import Main from './src'


function App() {
  const [userToken, setUserToken] = useState(null);
  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
      <Main/>
    </AuthContext.Provider>
  );
}

export default App;
