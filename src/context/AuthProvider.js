import React, { createContext, useState, useMemo } from "react";

import { getUserLocalStorageData } from "../component/common/StoreLocalData";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getUserLocalStorageData());
  const authState = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);
  // const selectedFilters
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
