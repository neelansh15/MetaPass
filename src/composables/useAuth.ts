import { userDoc } from "~/logic/storage";
import { login, register } from "~/composables/useAPI";

export const isLoggedIn = computed(() =>
  userDoc.value.username && userDoc.value.masterPassword ? true : false
);

export async function authenticate(
  username: string,
  password: string,
  isLogin = true
) {
  let data: any = {};
  if (isLogin) {
    data = await login(username, password);
    if (data == []) {
      console.log("Cant login");
      data.pass = -1;
      return;
    }
    userDoc.value = {
      username,
      masterPassword: data.pass,
    };
  } else {
    data = await register(username, password);
    if (data == []) {
      console.log("Cant register");
      data.pass = -1;
      return;
    }
    userDoc.value = {
      username,
      masterPassword: data.pass,
    };
  }
}

export function logout() {
  userDoc.value = {
    username: null,
    masterPassword: null,
  };
}
