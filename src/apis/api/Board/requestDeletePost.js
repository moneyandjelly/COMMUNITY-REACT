import axios from "axios";
import { BASE_URL } from "../../../constants";

export const requestDeletePost = async (
  boardId,
  userToken,
  accountProfileId
) => {
  try {
    const response = await axios.delete(`${BASE_URL}/board/${boardId}`, {
      data: {
        userToken: userToken,
        accountProfileId: accountProfileId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
