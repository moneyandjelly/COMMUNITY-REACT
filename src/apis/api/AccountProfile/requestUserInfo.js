import axios from "axios";
import { BASE_URL } from "../../../constants";

export const requestUserInfo = async (userToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/userinfo`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
