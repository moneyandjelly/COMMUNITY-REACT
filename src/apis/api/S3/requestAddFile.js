import axios from "axios";
import { BASE_URL } from "../../../constants";

export const requestAddFile = async (fileName) => {
  try {
    const response = await axios.get(`${BASE_URL}/presigned-url`, {
      params: {
        fileName: fileName,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};