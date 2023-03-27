import axiosInstance from "../axiosInstance";
import { SIGN_IN, STUDENT } from "../component/constants";

export const signIn = async (data) => {
  const result = await axiosInstance
    .post(SIGN_IN, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  return result;
};

export const getStudents = async () => {
  const result = await axiosInstance
    .get(STUDENT)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  return result;
};
