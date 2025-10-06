<template>
  <div
    class="flex w-full max-w-5xl bg-[#22255B] border-b-[2px] border-[#6560EA] rounded-xl overflow-hidden"
    :class="isExpanded ? 'h-auto' : 'h-[300px]'"
  >
    <div class="w-[40%] aspect-square" v-if="imagePost">
      <img class="w-full h-full object-fill" :src="imagePost" />
    </div>
    <div class="flex flex-col p-6 w-[60%]" :class="imagePost ? 'w-[60%]' : 'w-full'">
      <h2 class="text-[20px] font-bold text-[#6560EA] mb-2">{{ username }}</h2>
      <h3 class="text-2xl font-bold text-white mb-2 flex-grow break-words">{{ title }}</h3>

      <p
        ref="contentRef"
        class="text-white leading-relaxed flex-grow break-words"
        :class="{ 'line-clamp-5': !isExpanded }"
      >
        {{ content }}
      </p>
      <div class="">
        <button v-if="contentIsClamped && !isExpanded"
        @click="toggleExpanded"
        class="text-[#6560EA] font-bold hover:underline cursor-pointer"
        >
        Ver mais
        </button>
        <button
          v-if="isExpanded"
          @click="toggleExpanded"
          class="text-[#6560EA] font-bold hover:underline cursor-pointer"
        >
          Ver menos
        </button>
      </div>
      <div
        v-if="auth.isAuthenticated"
        class="flex items-end justify-end mt-4 pt-4 border-t border-gray-700"
      >
        <p class="text-white font-bold text-lg mr-2">{{ currentLikesCount }}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6560EA"
          stroke-width="3"
          :class="[
            'w-7 h-7 cursor-pointer transition-transform hover:scale-110 active:scale-95',
            { liked: isLiked },
          ]"
          @click="toggleLike"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
<script setup>
import api from '@/services/api'
import { ref, defineProps, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()

const props = defineProps({
  username: String,
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

const isExpanded = ref(false)
const contentIsClamped = ref(false)
const contentRef = ref(null)

const checkIfClamped = () => {
  const element = contentRef.value
  if (element) contentIsClamped.value = element.scrollHeight > element.clientHeight
}

onMounted(() => {
  checkIfClamped()
})

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}
</script>
<style scoped>
.liked {
  fill: #e1706e; /*fundo like*/
  stroke: #e1706e; /*borda like*/
}
</style>
