import axios from "axios";
import { API_URL } from "~/constants";

const getSites = async (id = "vedant32") => {
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

const login = async (email: String, password: String) => {
  const { data, status } = await axios.post(API_URL + "/login", {
    username: email,
    password: password,
  });
  if (status === 200) return data;
  else {
    console.error("Error while fetching user's sites");
    return [];
  }
};
const register = async (email: String, password: String) => {
  const { data, status } = await axios.post(API_URL + "/register", {
    username: email,
    password: password,
  });
  if (status === 200) return data;
  else {
    console.error("Error while fetching user's sites");
    return [];
  }
};

export { getSites, login, register };
