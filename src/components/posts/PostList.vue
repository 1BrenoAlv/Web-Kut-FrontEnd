<template>
  <div
    v-if="posts.length === 0"
    class="bg-[#22255B] w-[500px] border border-[#6560EA] mt-10 text-gray-300 p-8 rounded-lg text-center"
  >
    <p class="text-lg font-semibold">Não existe post criado!</p>
  </div>
  
  <div class="flex flex-col gap-8 p-8">
    <PostCard
      v-for="post in posts"
      :key="post.id"
      :username="post.user.username"
      :title="post.title"
      :content="post.content"
      :image-post="post.imageUrl ? `https://localhost:7132/${post.imageUrl}` : null"
      :postId="post.id"
      :initialLikesCount="post.likesCount"
      :userHasLiked="post.userHasLiked"
    />
    <p v-if="carregar" class="text-white">Carregando posts...</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>
  </div>
</template>
<script setup>
import PostCard from './PostCard.vue'
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const posts = ref([]) // guarda os posts em uma lista
const carregar = ref(false)
const error = ref(null)


const getAllPosts = async () => {
  carregar.value = true
  error.value = null
  try {
    const response = await api.getPosts()
    posts.value = response.data.reverse()
  } catch (erro) {
    error.value = 'Post não encontrado!'
  } finally {
    carregar.value = false
  }
}
onMounted(() => {
  getAllPosts()
})
</script>
