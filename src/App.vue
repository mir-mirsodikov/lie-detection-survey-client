<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './store/auth';

onMounted(async () => {
  const authStore = useAuthStore();
  await authStore.isAuthorized(); 
  console.log('updated');
});
</script>

<template>
  <router-view></router-view>
</template>
