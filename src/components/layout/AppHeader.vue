<template>
  <div
    class="max-w-full bg-[#111222] flex items-center p-10 font-bold justify-around shadow-[0_4px_0_0_#6560EA]">
    <p>{{ horaFormatada }}</p>
    <RouterLink to="/"
      ><img src="/src/assets/img/logo-ws.png" alt="logo da WebSupply" class="w-90"
    /></RouterLink>
    <div v-if="!isAuthenticated">
        <RouterLink to="/login" class="bg-[#6560EA] hover:bg-[#3e39d3] rounded-lg py-3 px-9"
        >Entrar</RouterLink>
    </div>
    <div v-else class="flex items-center space-x-4 text-white">
                <span>Olá, {{ user?.username }}</span>
                <button @click="handleLogout" class="bg-[#E1706E] hover:bg-[#d84341] rounded-lg py-2 px-6">
                    Sair
                </button>
            </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

export default {
  name: 'AppHeader',

  data() {
    return {
      dataAtualHora: new Date(),
      intervaloId: null,
    }
  },
  computed: {
    horaFormatada() {
      return this.dataAtualHora.toLocaleString('pt-BR')
    },
    ...mapState(useAuthStore, ['isAuthenticated', 'user']),
  },
  methods: {
    ...mapActions(useAuthStore, ['logout']),
    handleLogout() {
            this.logout();
        }
  },
  mounted() {
    this.intervaloId = setInterval(() => {
      this.dataAtualHora = new Date()
    }, 1000)
  },
  beforeUnmount() {
    clearInterval(this.intervaloId)
  },
}
</script>
