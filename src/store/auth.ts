import { defineStore } from 'pinia';
import { ref } from 'vue';
import { IUser } from '../model/user';
import { AuthService } from '../services/AuthService';

export const useAuthStore = defineStore('auth', () => {
  const auth = ref({});

  async function signIn(username: string, password: string) {
    auth.value = await AuthService.signIn(username, password);
  }

  return {
    auth,
    signIn,
  }
});