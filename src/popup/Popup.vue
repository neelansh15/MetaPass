<template>
  <main class="w-[300px] px-4 py-5 text-center text-gray-700">
    <Logo />
    <div>MetaPass</div>
    <div v-if="userDoc && userDoc.username && userDoc.masterPassword">
      <button class="btn mt-2" @click="openOptionsPage">Launch Vault</button>
      <div class="mt-2 text-teal-700">
        <a
          href="https://github.com/neelansh15/MetaPass"
          target="_blank"
          class="hover:underline cursor-pointer"
          >Github</a
        >
        |
        <span class="hover:underline cursor-pointer" @click="logout"
          >Logout</span
        >
      </div>
    </div>
    <div v-else>
      <div class="mt-2 space-y-2">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="input-field"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="input-field"
        />
      </div>
      {{ username }}
      {{ password }}
      <div class="mt-1 space-x-1">
        <button class="btn mt-2" @click="loginOrRegister">Login</button>
        <button class="btn-inverted mt-2" @click="loginOrRegister">
          Register
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { userDoc } from "~/logic/storage";
import { ref } from "vue";

const username = ref("");
const password = ref("");

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
