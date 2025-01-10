import axios from "axios";
import { BASE_URL } from "../../../constants";

export const requestBoardList = async (page, perPage) => {
  try {
    const response = await axios.get(`${BASE_URL}/board/list`, {
      params: {
        page: page,
        perPage: perPage,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
