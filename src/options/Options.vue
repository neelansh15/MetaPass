<template>
  <main class="px-6 py-10 text-gray-700 dark:text-gray-200">
    <div class="flex items-center justify-between">
      <!-- Left side -->
      <div class="flex space-x-1 items-center">
        <pixelarticons-lock class="icon-btn text-2xl" />
        <h1 class="text-3xl">MetaPass</h1>
      </div>
      <!-- Right side -->
      <div v-if="isLoggedIn" class="space-x-2">
        <span>Hello {{ userDoc.username }}!</span>
        <span class="hover:underline cursor-pointer" @click="logout"
          >Logout</span
        >
      </div>
    </div>

    <!-- Authentication -->
    <section v-if="!isLoggedIn" class="mt-5">
      <div class="space-x-1">
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
    </section>

    <section v-else class="mt-6">
      <h2 class="text-xl">Sites</h2>
      <table class="table mt-2">
        <tr>
          <th>Site</th>
          <th>Email / Username</th>
          <th>Password</th>
        </tr>
        <tr v-for="n in 10" :key="n">
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
      </table>
    </section>
  </main>
</template>

<script setup lang="ts">
import { userDoc } from "~/logic";
import { isLoggedIn, authenticate, logout } from "~/composables/useAuth";
import { getSites } from "~/composables/useAPI";

const username = ref("");
const password = ref("");

const sites = ref([]);

onMounted(async () => {
  // Fetch sites for user
  if (isLoggedIn.value) {
    sites.value = await getSites();
  }
});
</script>
