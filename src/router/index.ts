import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../views/SignIn.vue';
import Admin from '../views/Admin.vue';
import { useAuthStore } from '../store/auth';

export const routes = [
  {
    path: '/login',
    name: 'Log In',
    component: SignIn,
    meta: { guest: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  document.title = to.name as string;
  const authStore = useAuthStore();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (await authStore.isAuthorized()) {
      next();
      return;
    }
    next('/login');
    return;
  }
  else if (to.matched.some(record => record.meta.guest)) {
    if (await authStore.isAuthorized()) {
      next('/admin');
      return;
    }
    next();
    return;
  }
  else {
    next();
  }
});

export default router;
