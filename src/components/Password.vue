<script lang="ts" setup>
const props = defineProps({
  value: String,
});

// TODO: Add eye symbol for revealing password by entering master password. Don't ask for master password if last time asked was a specific time like 5min ago
</script>

<template>
  <input type="password" :value="props.value" size="25" disabled />
</template>
