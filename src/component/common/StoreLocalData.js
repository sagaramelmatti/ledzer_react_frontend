export const getUserLocalStorageData = () => {
  const userInfo = {
    username: localStorage.getItem("username") || "",
    token: localStorage.getItem("token") || "",
  };
  return userInfo;
};

export const removeUserLocalStorageData = () => {
  const userInfo = {
    username: localStorage.removeItem("username") || "",
    token: localStorage.removeItem("token") || "",
  };
  return userInfo;
};
