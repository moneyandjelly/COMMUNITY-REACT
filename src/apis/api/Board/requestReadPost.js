import axios from "axios";
import { BASE_URL } from "../../../constants";

export const requestReadPost = async (boardId) => {
  try {
    const response = await axios.get(`${BASE_URL}/board/${boardId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
