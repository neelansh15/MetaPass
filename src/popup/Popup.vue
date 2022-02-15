<template>
  <main class="w-[300px] px-4 py-5 text-center text-gray-700">
    <div class="inline-flex space-x-1 items-center">
      <pixelarticons-lock class="icon-btn text-xl -ml-3" />
      <h1 class="text-xl">MetaPass</h1>
    </div>
    <div v-if="isLoggedIn" class="mt-3">
      <button class="btn" @click="openOptionsPage">Launch Vault</button>
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
      <div class="mt-1 space-x-1">
        <button class="btn mt-2" @click="authenticate(username, password)">
          Login
        </button>
        <button
          class="btn-inverted mt-2"
          @click="authenticate(username, password, false)"
        >
          Register
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { isLoggedIn, authenticate, logout } from "~/composables/useAuth";

const username = ref("");
const password = ref("");

function openOptionsPage() {
  browser.runtime.openOptionsPage();
}
</script>
