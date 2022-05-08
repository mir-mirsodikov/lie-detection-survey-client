import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../views/SignIn.vue';

export const routes = [
  {
    path: '/login',
    name: 'Log In',
    component: SignIn
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;