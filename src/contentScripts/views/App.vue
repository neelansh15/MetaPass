<template>
  <div
    class="fixed right-0 bottom-0 m-5 z-100 flex font-sans select-none leading-1em"
  >
    <div
      class="bg-white text-gray-800 rounded-full shadow w-max h-min"
      p="x-4 y-2"
      m="y-auto r-2"
      transition="opacity duration-300"
      :class="show ? 'opacity-100' : 'opacity-0'"
    >
      MetaPass {{ url }}!
      <button @click="doThis">CLCK</button>
    </div>
    <div
      class="flex w-10 h-10 rounded-full shadow cursor-pointer"
      bg="teal-600 hover:teal-700"
      @click="toggle()"
    >
      <pixelarticons-lock class="block m-auto text-white text-lg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from "@vueuse/core";
import { addPass } from "~/composables/useAPI";
import "virtual:windi.css";
import { userDoc } from "~/logic";

const [show, toggle] = useToggle(false);

const url = ref("");

function domain_from_url(url: string) {
  var result;
  var match;
  if (
    (match = url.match(
      /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im
    ))
  ) {
    result = match[1];
    if ((match = result.match(/^[^\.]+\.(.+\..+)$/))) {
      result = match[1];
    }
  }
  return result;
}

function doThis() {
  const domainName: any = domain_from_url(window.location.href);
  addPass(domainName, "HELUTHERE", "heluteepadjaisfaj");
}
</script>
