import App from '@/App.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'home', component:  HomeView},
    {path: '/login', name: 'login', component:  () => import('../views/LoginView.vue')},
    {path: '/cadastro', name: 'cadastro', component:  () => import('../views/CadastroView.vue')},
    // {path: '/meus-posts', name: 'meusPosts', component:  () => import('../views/MyPostsView.vue')},
  ],
})

export default router
