import axios from "axios";
import { BASE_URL } from "../../../constants";

export const requestRegisterPost = async (title, content, userToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/board/create`,
      {
        title: title,
        content: content,
        userToken: userToken,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
