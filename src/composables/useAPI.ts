import axios from "axios";
import { API_URL } from "~/constants";

export const getSites = async (id = "vedant32") => {
  const { data, status } = await axios.post(API_URL + "/getAllPass", {
    id,
  });
  console.log({ data });

  if (status === 200) return data;
  else {
    console.error("Error while fetching user's sites");
    return [];
  }
};
