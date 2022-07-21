import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ListPostsVue from '@/components/ListPosts.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: ListPostsVue,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
