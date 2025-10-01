<!-- <template>
  <div class="flex flex-col justify-between gap-8 p-8">
    <div v-if="isLoading" class="text-center text-gray-400">
      <p>Carregando seus posts...</p>
    </div>

    <div v-else-if="error" class="text-[#E1706E] px-4 py-3" role="alert">
      <span class="block sm:inline">{{ error }}</span>
    </div>

    <div v-else>
      <h1 class="text-3xl font-bold text-white mb-8">Meus Posts</h1>

      <div
        v-if="posts.length === 0"
        class="bg-[#22255B] border border-[#6560EA] text-gray-300 p-8 rounded-lg text-center"
      >
        <p class="text-lg font-semibold">Você ainda não criou nenhum post.</p>
      </div>

      <ul v-else class="space-y-6">
        <li
          v-for="post in posts"
          :key="post.id"
          class="flex w-full max-w-4xl bg-[#22255B] border-b-[2px] border-[#6560EA] rounded-xl overflow-hidden"
        >
          <div class="w-[40%] flex-shrink-0">
  <img
    v-if="post.imageUrl"
    class="w-full h-full object-cover"
    :src="`https://localhost:7132/${post.imageUrl}`"
    alt="Imagem do post"
  />
</div>

          <div class="flex flex-col p-6 w-[100%]">
            <h2 class="text-2xl font-bold text-white mb-2">{{ post.title }}</h2>
            <p class="text-white leading-relaxed flex-grow">{{ post.content }}</p>

            <div class="flex justify-end items-center gap-4 mt-auto pt-4 border-t border-gray-700">
              <svg
                @click="modalEdit(post)"
                class="w-7 h-7 cursor-pointer transition-transform hover:scale-110 active:scale-95"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <g fill="#6560EA" fill-rule="evenodd" clip-rule="evenodd">
                  <path
                    d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352z"
                  />
                  <path
                    d="M19.846 4.318a2.2 2.2 0 0 0-.437-.692a2 2 0 0 0-.654-.463a1.92 1.92 0 0 0-1.544 0a2 2 0 0 0-.654.463l-.546.578l2.852 3.02l.546-.579a2.1 2.1 0 0 0 .437-.692a2.24 2.24 0 0 0 0-1.635M17.45 8.721L14.597 5.7L9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.5.5 0 0 0 .255-.145l4.778-5.06Z"
                  />
                </g>
              </svg>

              <svg
                @click="deletePost(post.id)"
                class="w-7 h-7 cursor-pointer transition-transform hover:scale-110 active:scale-95"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#E1706E"
                  d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                />
              </svg>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <EditPostModal
        :show="isEditModalOpen"
        :post-to-edit="postSelecionado"
        @close="isEditModalOpen = false"
        @post-updated="handlePostUpdate"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useAuthStore } from '@/stores/authStore'
import EditPostModal from '@/components/posts/EditPostModal.vue'

const posts = ref([])
const isLoading = ref(true)
const error = ref(null)
const auth = useAuthStore()

const isEditModalOpen = ref(false)
const postSelecionado = ref(null)

function modalEdit(post) {
  postSelecionado.value = post
  isEditModalOpen.value = true
}

function handlePostUpdate(updatedPost) {
  const index = posts.value.findIndex((p) => p.id === updatedPost.id)
  if (index !== -1) {
    posts.value[index] = updatedPost
  }
}

const listPost = async () => {
  try {
    const user = auth.isAuthenticated
    if (user) {
      const response = await api.getMyPosts()
      posts.value = response.data
    }
  } catch (err) {
    error.value = `Ocorreu um erro ao buscar seus posts.`
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const deletePost = async (postId) => {
  if (!confirm('Você tem certeza que deseja excluir este post?')) {
    return
  }

  try {
    await api.deletePost(postId)
    posts.value = posts.value.filter((p) => p.id !== postId)
    alert('Post excluído com sucesso!')
  } catch (err) {
    console.error('Erro ao excluir post:', err)
    alert('Falha ao excluir o post.')
  }
}

onMounted(() => {
  listPost()
})
</script> -->
