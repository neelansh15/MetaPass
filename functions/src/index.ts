import * as functions from "firebase-functions";
// import { encryptPass } from "./crypto_functions";
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
      return response.status(200).send("Registered successfully");
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
        return response.status(200).send("Passwords match");
      } else {
        return response.status(200).send("Passwords don't match");
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

// const addPass = functions.https.onRequest((request, response) => {
//   const { id, website, username, password } = request.body;
//   const encryptedPass = encryptPass(password);
//   firestore
//     .collection("users")
//     .doc(id)
//     .collection("sites")
//     .doc(website)
//     .add({
//       username: encryptedPass,
//     })
//     .then(() => {
//       return response.status(200).send("Added pass successfully");
//     })
//     .catch((err: any) => {
//       console.error(err);
//       return response.status(404).send({
//         error: "Unable to add password",
//         err,
//       });
//     });
// });

export { register, login };
