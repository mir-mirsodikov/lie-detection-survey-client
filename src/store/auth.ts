import { defineStore } from 'pinia';
import { ref, toHandlerKey } from 'vue';
import { IUser } from '../model/user';
import { AuthService } from '../services/AuthService';

export const useAuthStore = defineStore('auth', () => {
  const authToken = ref();

  async function signIn(username: string, password: string) {
    const response = await AuthService.signIn(username, password);
    setToken(response);
  }

  function isAuthenticated() {
    return authToken.value !== undefined;
  }

  async function isAuthorized() {
    const localToken = localStorage.getItem('token');
    if (!localToken) {
      return false;
    }
    setToken(localToken as string);
    const result = await AuthService.authorize(localToken);
    return result;
  }

  function setToken(token: string) {
    authToken.value = token;
    localStorage.setItem('token', token);
  }

  function signOut() {
    localStorage.removeItem('token');
    authToken.value = undefined;
  }

  return {
    token: authToken,
    signIn,
    isAuthenticated,
    isAuthorized,
    signOut,
  };
});
