const AES = require("crypto-js/aes");
const enc = require("crypto-js/enc-utf8");

function encryptPass(password, key) {
  return AES.encrypt(password, key).toString();
}

function decryptPass(encryptedText, key) {
  var bytes = AES.decrypt(encryptedText, key);
  return bytes.toString(enc);
}

function generateRandomPassword() {
  let passwordLength = Math.random() * 15;
  while (passwordLength < 8 || passwordLength > 15) {
    passwordLength = Math.random() * 15;
  }
  password = "";
  while (password.length < passwordLength) {
    let type = Math.random();
    if (type < 0.3) {
      let charCase = Math.random();
      if (charCase < 0.3) {
        password += String.fromCharCode(
          Math.floor(Math.random() * 26) + 65,
        ).toLowerCase();
      } else if (charCase < 0.6) {
        password += String.fromCharCode(
          Math.floor(Math.random() * 26) + 65,
        ).toUpperCase();
      }
    } else if (type < 0.6) {
      password += String(Math.floor(Math.random() * 10));
    } else {
      let chance = Math.random();
      if (chance < 0.3) {
        password += String.fromCharCode(Math.floor(Math.random() * 15) + 33);
      } else if (chance < 0.6) {
        password += String.fromCharCode(Math.floor(Math.random() * 7) + 58);
      }
    }
  }
  return password;
}

export { encryptPass, decryptPass, generateRandomPassword };
