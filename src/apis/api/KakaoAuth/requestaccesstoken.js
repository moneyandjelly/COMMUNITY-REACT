import axios from "axios";
import { BASE_URL } from "../../../constants";

export const requestAccessToken = async (code) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/kakao-authentication/request-access-token`,
      {
        code: code,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
