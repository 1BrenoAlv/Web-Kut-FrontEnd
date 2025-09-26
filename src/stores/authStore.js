import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import apiService from '@/services/api';
import { jwtDecode } from 'jwt-decode';
import router from '@/router';

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('authToken'))
    const user = ref(null);

    const isAuthenticated = computed(() => !!token.value);

    function setToken(newToken) {
        token.value = newToken;
        if (newToken) {
            localStorage.setItem('authToken', newToken);
            const decToken = jwtDecode(newToken);
            user.value = {
                id: decToken.nameid,
                email: decToken.email,
                username: decToken.unique_name
            };
        } else {
            localStorage.removeItem('authToken');
            user.value = null;
        }
    }

  async function login(credenciais) {
    const response = await apiService.login(credenciais);
    setToken(response.data.token);
  }
  
  async function register(userData) {
    await apiService.register(userData);
  }

  function logout() {
    setToken(null);
    router.push('/login');
  }

  function checkAuth() {
    const localToken = localStorage.getItem('authToken');
    if (localToken) {
      const decToken = jwtDecode(localToken);  
      if (decToken.exp * 1000 > Date.now()) { // Verifica se o token expirou
        setToken(localToken);
      } else {
        setToken(null);
      }
    }
  }

  return { token, user, isAuthenticated, login, register, logout, checkAuth };
})