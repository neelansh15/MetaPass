<script lang="ts" setup>
const props = defineProps({
  value: String,
});
</script>

<template>
  <input type="password" :value="props.value" disabled />
</template>
