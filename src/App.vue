<template>
  <div class="flex flex-col min-h-screen bg-[#111222]">
    <header>
      <AppHeader />
    </header>
    <main>
      <RouterView />
    </main>
    <footer class="mt-auto">
      <AppFooter />
    </footer>
  </div>
</template>
<script setup>
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { RouterView } from 'vue-router'

const authStore = useAuthStore()

onMounted(() => {
  authStore.checkAuth()
})
</script>
