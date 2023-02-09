import { createRouter, createWebHistory } from 'vue-router';
import StartPage from '@/views/startPage/startPage.vue';
import LessonLayout from '@/views/lessons/lessonLayout.vue';
import { authContext } from '@/stores/authContext.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'StartPage',
      component: StartPage,
      //component: () => import('@/views/startPage/startPage.vue'),
    },
    {
      path: '/lessonLayout',
      name: 'LessonLayout',
      component: LessonLayout,
    },
    {
      path: '/lessonsList',
      name: 'LessonsList',
      component: () => import('@/views/lessonsList/lessonsList.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/auth/authVue.vue'),
    },
  ],
});

router.beforeEach((to) => {
  const storeAuthContext = authContext();
  if (to.path == '/auth' && storeAuthContext.user) return '/';
});

export default router;
