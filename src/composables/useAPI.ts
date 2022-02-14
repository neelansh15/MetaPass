import axios from "axios";
import { API_URL } from "~/constants";

export const getSites = async () => {
  const { data, status } = await axios.get(API_URL + "/getSites");
  if (status === 200) return data;
  else {
    console.error("Error while fetching user's sites");
    return [];
  }
};
