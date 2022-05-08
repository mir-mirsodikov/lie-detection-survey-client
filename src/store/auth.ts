import { defineStore } from 'pinia';
import { ref } from 'vue';
import { IUser } from '../model/user';
import { AuthService } from '../services/AuthService';

export const useAuthStore = defineStore('auth', () => {
  const auth = ref();

  async function signIn(username: string, password: string) {
    const token = await AuthService.signIn(username, password);
    setToken(token);
  }

  function isAuthenticated() {
    return auth.value !== undefined;
  }

  async function isAuthorized() {
    const token = localStorage.getItem('token');
    setToken(token as string);
    return await AuthService.authorize(auth.value);
  }

  function setToken(token: string) {
    auth.value = token;
    localStorage.setItem('token', auth.value);
  }

  return {
    auth,
    signIn,
    isAuthenticated,
    isAuthorized,
  };
});
