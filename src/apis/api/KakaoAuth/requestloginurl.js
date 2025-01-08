import axios from "axios";
import { BASE_URL } from "../../../constants";

export const requestKakaoLoginUrl = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/kakao-authentication/request-login-url`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
