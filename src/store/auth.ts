import { defineStore } from 'pinia';
import { ref, toHandlerKey } from 'vue';
import { IUser } from '../model/user';
import { AuthService } from '../services/AuthService';

export const useAuthStore = defineStore('auth', () => {
  const authToken = ref();
  const userId = ref();
  const name = ref();

  async function signIn(username: string, password: string) {
    const response = await AuthService.signIn(username, password);
    setToken(response.token);
    setUserId(response.id);
    setName(response.name);
  }

  async function signUp(_name: string, username: string, password: string) {
    const response = await AuthService.signUp(_name, username, password);
    setToken(response.token);
    setUserId(response.id);
    setName(response.name);
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
    setUserId(parseInt(localStorage.getItem('userId') as string));
    setName(localStorage.getItem('name') as string);
    const result = await AuthService.authorize(localToken);
    return result;
  }

  function setToken(token: string) {
    authToken.value = token;
    localStorage.setItem('token', token);
  }

  function setUserId(id: number) {
    userId.value = id;
    localStorage.setItem('userId', id.toString());
  }

  function setName(_name: string) {
    name.value = _name;
    localStorage.setItem('name', _name);
  }

  function getUserId() {
    return userId.value ?? localStorage.getItem('userId');
  }

  function getName() {
    return name.value ?? localStorage.getItem('name');
  }

  function signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    authToken.value = undefined;
    userId.value = undefined;
    name.value = undefined;
  }

  return {
    token: authToken,
    signIn,
    isAuthenticated,
    isAuthorized,
    signOut,
    signUp,
    getUserId,
    getName,
  };
});
