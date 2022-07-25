import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ListPosts from '@/views/ListPosts.vue';
import ViewPost from '@/views/ViewPost.vue';
import EditPost from '@/views/EditPost.vue';
import AddPost from '@/views/AddPost.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: ListPosts,
  },
  {
    path: '/posts',
    name: 'ListPost',
    component: ListPosts,
  },
  {
    path: '/posts/view/:postId',
    name: 'ViewPost',
    component: ViewPost,
  },
  {
    path: '/posts/edit/:postId',
    name: 'EditPost',
    component: EditPost,
  },
  {
    path: '/posts/add',
    name: 'AddPost',
    component: AddPost,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
