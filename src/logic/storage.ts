import { useStorageLocal } from "~/composables/useStorageLocal";

export const storageDemo = useStorageLocal("webext-demo", "Storage Demo", {
  listenToStorageChanges: true,
});

export const username = useStorageLocal("username", null); // testing

export const userDoc = useStorageLocal(
  "userDoc",
  {
    username: null as string | null,
    masterPassword: null as string | null,
  },
  {
    listenToStorageChanges: true,
    deep: true,
  }
);
