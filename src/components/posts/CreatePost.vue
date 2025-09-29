<template>
  <div class="ml-[30px]">
    <div v-if="auth.isAuthenticated" class="">
      <button
        @click="isModalVisible = true"
        class="bg-[#6560EA] hover:bg-[#3e39d3] text-[20px] text-white font-bold py-2 px-4 rounded-[10px] cursor-pointer transition duration-200 ease-linear"
      >
        Criar Novo Post
      </button>
      <CreatePostModal :show="isModalVisible" @close="isModalVisible = false" />
    </div>
    <div v-else>
      <h2 class="text-[25px] font-bold">Últimos Posts:</h2>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CreatePostModal from './CreatePostModal.vue'
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()
const isModalVisible = ref(false)
</script>
