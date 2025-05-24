import { createRouter,createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'saver',
    component: () => import('/src/view/saver.vue')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('/src/components/content/news.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('/src/view/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('/src/view/register.vue')
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('/src/components/content/my.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('/src/components/content/home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('/src/components/content/about.vue')
  },
  {
    path: '/classify',
    name: 'classify',
    component: () => import('/src/components/content/classify.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('/src/components/content/settings.vue')
  },
  {
    path: '/toolbox',
    name: 'toolbox',
    component: () => import('/src/components/content/toolbox.vue')
  },
  {
    path: '/post',
    name: 'post',
    component: () => import('/src/components/content/post.vue')
  },
  {
    path: '/content',
    name: 'content',
    component: () => import('/src/components/content/content.vue')
  },
  {
    path: '/tag',
    name: 'tag',
    component: () => import('/src/components/content/tag.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;