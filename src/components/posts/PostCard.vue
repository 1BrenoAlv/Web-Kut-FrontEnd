<template>
  <div
    class="flex w-full max-w-4xl bg-[#22255B]  rounded-xl overflow-hidden"
  >
  <div class="w-[40%]">
    <img v-if="imagePost" class="w-60 h-[100%] flex-shrink-0 object-cover h-full" :src="imagePost" />
  </div>

    <div class="flex flex-col p-6 w-[100%]">
      <h3 class="text-2xl font-bold text-white mb-2">{{ title  }}</h3>

      <p class="text-white leading-relaxed flex-grow">
        {{ content }}
      </p>

      <div v-if="auth.isAuthenticated" class="flex items-endr justify-end mt-4">
        <span class="text-white text-lg mr-2">{{ currentLikesCount }}</span>
        <img
          src="/public/hearth.svg"
          alt="coração para curtir post"
          :class="[
            'w-7 h-7 cursor-pointer transition-transform hover:scale-110 active:scale-95',
            { 'fill-red-500': isLiked },
          ]"
          @click="toggleLike"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import api from '@/services/api'
import { ref, defineProps } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()

const props = defineProps({
  title: String,
  content: String,
  postId: Number,
  initialLikesCount: Number,
  userHasLiked: Boolean,
  imagePost: {
    type: String,
    default: null,
  },
})
const isLiked = ref(props.userHasLiked)
const currentLikesCount = ref(props.initialLikesCount)

const toggleLike = async () => {
  try {
    const response = await api.postLike(props.postId)
    isLiked.value = response.data.isLiked
    currentLikesCount.value = response.data.likeCount
  } catch (error) {
    console.error('Erro ao curtir/descurtir o post:', error)
  }
}
</script>
<style scoped>
.fill-red-500 {
  filter: invert(27%) sepia(85%) saturate(3065%) hue-rotate(334deg) brightness(97%) contrast(100%); /*CSS PARA O LIKE FICAR BONITO*/
}
</style>
