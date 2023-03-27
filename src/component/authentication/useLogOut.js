import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { removeUserLocalStorageData } from "../common/StoreLocalData";

const useLogout = () => {
  const { setAuth } = useContext(AuthContext);

  const logout = () => {
    removeUserLocalStorageData();
    setAuth?.({});
  };
  return logout;
};

export default useLogout;
