import axios from "axios";
import { API_URL } from "~/constants";
import { userDoc } from "~/logic/storage";

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
const addPass = async (website: String, username: String, password: String) => {
  console.log("passing data to addpass", {
    id: userDoc.value.username,
    website: website,
    username: username,
    password: password,
    key: userDoc.value.masterPassword,
  });

  const { data, status } = await axios.post(API_URL + "/addPass", {
    id: userDoc.value.username,
    website: website,
    username: username,
    password: password,
    key: userDoc.value.masterPassword,
  });
  if (status === 200) return data;
  else {
    console.error("Error while fetching user's sites");
    return [];
  }
};
const updatePass = async (
  website: String,
  username: String,
  password: String
) => {
  const { data, status } = await axios.post(API_URL + "/updatePass", {
    id: userDoc.value.username,
    website: website,
    username: username,
    password: password,
    key: userDoc.value.masterPassword,
  });
  if (status === 200) return data;
  else {
    console.error("Error while fetching user's sites");
    return [];
  }
};
const getPass = async (website: String, username: String) => {
  const { data, status } = await axios.post(API_URL + "/getPass", {
    id: userDoc.value.username,
    website: website,
    username: username,
    key: userDoc.value.masterPassword,
  });
  if (status === 200) return data;
  else {
    console.error("Error while fetching user's sites");
    return [];
  }
};

export { getSites, login, register, addPass, updatePass, getPass };
