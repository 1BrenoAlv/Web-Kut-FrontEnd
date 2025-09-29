<template>
  <div>
    <aside class="border-l-[4px] border-[#6560EA] pl-6 pb-3 pt-3">
      <h2 class="text-shadow-white text-[25px] font-bold mb-4 text-lg">Últimas Postagens</h2>

      <p v-if="loading" class="text-gray-400">Carregando...</p>

      <ul v-else class="space-y-4">
        <li v-for="post in latestPosts" :key="post.id">
          <h3 class="text-[#6560EA] text-[20px] font-semibold">{{ post.title }}</h3>
          <p class="text-gray-400 text-sm">{{ formatarData(post.updatedAt) }}</p>
        </li>
      </ul>

      <p v-if="error" class="text-red-500">{{ error }}</p>
    </aside>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'

const allPosts = ref([])
const loading = ref(false)
const error = ref(null)

const latestPosts = computed(() => {
  return allPosts.value.slice(0, 5)
})

function formatarData(dataISO) {
  if (!dataISO) return ''
  const data = new Date(dataISO)
  return data.toLocaleString('pt-BR')
}

const fetchPosts = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await api.getPosts()
    allPosts.value = response.data.reverse()
  } catch (err) {
    error.value = 'Não foi possível carregar as postagens.'
    console.error('Erro ao buscar posts:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPosts()
})
</script>
