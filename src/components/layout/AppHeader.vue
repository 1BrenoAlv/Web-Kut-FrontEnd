<template>
  <div
    class="max-w-full bg-[#111222] flex items-center p-10 font-bold justify-around shadow-[0_4px_0_0_#6560EA]"
  >
    <p>{{ horaFormatada }}</p>
    <RouterLink to="/"
      ><img src="/src/assets/img/logo-ws.png" alt="logo da WebSupply" class="w-90"
    /></RouterLink>
    <div v-if="!isAuthenticated">
      <RouterLink
        to="/login"
        class="bg-[#6560EA] hover:bg-[#3e39d3] rounded-lg py-3 px-9 transition duration-200 ease-linear"
        >Entrar</RouterLink>
    </div>
    <div v-else class="flex items-center space-x-4 text-white">
      <p>Olá, {{ user?.username }}</p>
       <RouterLink to="/meus-posts" class="bg-[#6560EA] hover:bg-[#3e39d3] rounded-lg py-2 px-6  transition duration-200 ease-linear">Meus Posts</RouterLink>
      <button
        @click="handleLogout"
        class="bg-[#E1706E] hover:bg-[#d84341] rounded-lg py-2 px-6 cursor-pointer"
      >
        Sair
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const dataAtualHora = ref(new Date())
const horaFormatada = computed(() => dataAtualHora.value.toLocaleString('pt-BR'))
let intervaloId = null;
const isModalVisible = ref(false)

onMounted(() => {
  intervaloId = setInterval(() => {
    dataAtualHora.value = new Date()
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(intervaloId)
})

const router = useRouter()
const authStore = useAuthStore()
const { isAuthenticated, user } = storeToRefs(authStore)

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>
