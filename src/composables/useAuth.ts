import { userDoc } from "~/logic/storage";

export const isLoggedIn = computed(() =>
  userDoc.value.username && userDoc.value.masterPassword ? true : false
);

export function authenticate(
  username: string,
  password: string,
  isLogin = true
) {
  userDoc.value = {
    username,
    masterPassword: password,
  };
}

export function logout() {
  userDoc.value = {
    username: null,
    masterPassword: null,
  };
}
