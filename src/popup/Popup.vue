<template>
  <main class="w-[300px] px-4 py-5 text-center text-gray-700">
    <Logo />
    <div>MetaPass</div>
    <div v-if="userDoc">
      <button class="btn mt-2" @click="openOptionsPage">Launch Vault</button>
      <div class="mt-2 text-teal-700">
        <span class="hover:underline cursor-pointer">Switch account</span> |
        <span class="hover:underline cursor-pointer" @click="logout"
          >Logout</span
        >
      </div>
    </div>
    <div class="space-x-1" v-else>
      <button class="btn mt-2" @click="loginOrRegister">Login</button>
      <button class="btn-inverted mt-2" @click="loginOrRegister">Register</button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { userDoc } from "~/logic/storage";

function openOptionsPage() {
  browser.runtime.openOptionsPage();
}

function logout() {
  userDoc.value = null;
}

function loginOrRegister() {
  userDoc.value = {
    username: "neelansh",
    masterPassword: "ereeffe",
  };
  console.log("login or register");
}
</script>
