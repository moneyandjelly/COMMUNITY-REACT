import axios from "axios";
import { BASE_URL } from "../../../constants";

export const requestRegisterPost = async (title, content, userToken, s3url) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/board/create`,
      {
        title: title,
        content: content,
        userToken: userToken,
        s3url: s3url,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
