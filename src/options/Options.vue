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
      <table v-if="sites.length > 0" class="table mt-2">
        <tr>
          <th>Site</th>
          <th>Email / Username</th>
          <th>Password</th>
        </tr>
        <template v-for="site in sites" :key="site.site">
          <tr>
            <td class="font-semibold">
              {{ site.site }}
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr v-for="(value, key) in site" :key="key">
            <template v-if="key.toString() !== 'site'">
              <td></td>
              <td>{{ key }}</td>
              <td><password :value="value" /></td>
            </template>
          </tr>
        </template>

        <!-- <tr v-for="site in sites" :key="site.site">
          <td :rowspan="site.values.length">{{ site.site }}</td>
          <td>
            <p v-for="pair in site.values" :key="pair[0]" class="py-1">
              {{ pair[0] }}
            </p>
          </td>
          <td>
            <p v-for="pair in site.values" :key="pair[0]" class="py-1">
              <password1 :value="pair[1]" />
            </p>
          </td>
        </tr> -->
      </table>
      <div v-else>No site data found. Add your first one!</div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { userDoc } from "~/logic";
import { isLoggedIn, authenticate, logout } from "~/composables/useAuth";
import { getSites } from "~/composables/useAPI";
import Password from "~/components/Password.vue";

const username = ref("");
const password = ref("");

const sites = ref([] as any[]);

watchEffect(() => {
  if (isLoggedIn.value === true) fetchData();
});

async function fetchData() {
  // Fetch sites for user
  sites.value = await getSites(userDoc.value.username?.toLowerCase());
}
</script>
