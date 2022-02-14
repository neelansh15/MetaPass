import * as functions from "firebase-functions";
import {
  encryptPass,
  decryptPass,
  generateRandomPassword,
} from "./crypto_functions";
import { firestore } from "./config";
var SHA256 = require("crypto-js/sha256");

const register = functions.https.onRequest(async (request, response) => {
  const { username, password } = request.body;
  const hashedPass = SHA256(password).toString();
  console.log(username, password, hashedPass);
  firestore
    .collection("users")
    .doc(username)
    .set({
      username: username,
      hashedPass: hashedPass,
    })
    .then(() => {
      return response.status(200).send({ msg: "Registered successfully" });
    })
    .catch((err: any) => {
      console.error(err);
      return response.status(404).send({
        error: "Unable to register",
        err,
      });
    });
});

const login = functions.https.onRequest((request, response) => {
  const { username, password } = request.body;
  const hashedPass = SHA256(password).toString();
  console.log(username, password, hashedPass);

  firestore
    .collection("users")
    .doc(username)
    .get()
    .then((doc: any) => {
      if (!(doc && doc.exists)) {
        return response.status(404).send({
          error: "Unable to find the document",
        });
      }
      const data = doc.data();
      const storedPass = data.hashedPass;
      if (!data) {
        return response.status(404).send({
          error: "Found document is empty",
        });
      }
      if (storedPass == hashedPass) {
        return response.status(200).send({ msg: "Passwords match" });
      } else {
        return response.status(200).send({ msg: "Passwords don't match" });
      }
    })
    .catch((err: any) => {
      console.error(err);
      return response.status(404).send({
        error: "Unable to retrieve the document",
        err,
      });
    });
});

const addPass = functions.https.onRequest((request, response) => {
  const { id, website, username, password, key } = request.body;

  const encryptedPass = encryptPass(password, key);
  const passwordObj = {};
  passwordObj[username] = encryptedPass;
  firestore
    .collection("users")
    .doc(id)
    .collection("sites")
    .doc(website)
    .set(passwordObj, { merge: true })
    .then(() => {
      return response.status(200).send({ msg: "Added password successfully" });
    })
    .catch((err: any) => {
      console.error(err);
      return response.status(404).send({
        error: "Unable to add password",
        err,
      });
    });
});
const updatePass = functions.https.onRequest((request, response) => {
  const { id, website, username, password, key } = request.body;

  const encryptedPass = encryptPass(password, key);
  console.log(encryptedPass, password, key);
  const passwordObj = {};
  passwordObj[username] = encryptedPass;
  firestore
    .collection("users")
    .doc(id)
    .collection("sites")
    .doc(website)
    .update(passwordObj)
    .then(() => {
      return response
        .status(200)
        .send({ msg: "Updated password successfully" });
    })
    .catch((err: any) => {
      console.error(err);
      return response.status(404).send({
        error: "Unable to add password",
        err,
      });
    });
});

const getPass = functions.https.onRequest((request, response) => {
  const { id, website, username, key } = request.body;

  firestore
    .collection("users")
    .doc(id)
    .collection("sites")
    .doc(website)
    .get()
    .then((doc: any) => {
      const encryptedPass = doc.get(username);
      const pass = decryptPass(encryptedPass, key);
      const result = {
        password: pass,
      };
      return response.status(200).send(result);
    })
    .catch((err: any) => {
      console.error(err);
      return response.status(404).send({
        error: "Unable to get password",
        err,
      });
    });
});

const getAllPass = functions.https.onRequest((request, response) => {
  const { id } = request.body;

  firestore
    .collection("users")
    .doc(id)
    .collection("sites")
    .get()
    .then((snapshot: any) => {
      let result = [];
      snapshot.docs.map(doc => {
        result.push({ ...doc.data(), site: doc.id });
      });
      return response.status(200).send(result);
    })
    .catch((err: any) => {
      console.error(err);
      return response.status(404).send({
        error: "Unable to get password",
        err,
      });
    });
});

const generatePassword = functions.https.onRequest(
  (request: any, response: any) => {
    try {
      const password = generateRandomPassword();
      const result = {
        password: password,
      };
      return response.status(200).send(result);
    } catch (err) {
      return response.status(400).send({
        error: "Unable to generate password",
        err,
      });
    }
  },
);

export {
  register,
  login,
  addPass,
  getPass,
  generatePassword,
  getAllPass,
  updatePass,
};
