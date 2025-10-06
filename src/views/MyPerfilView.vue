<template>
  <div class="flex justify-around">
    <div class="flex flex-col p-10 w-[50%]">
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
          <PostItem
           v-for="post in posts"
            :key="post.id"
            :post="post"
            @edit="modalEdit"
            @delete="deletePost"
          />
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
    <div class="flex flex-col p-10 mt-10">
      <EditPerfil class="mb-15" />
      <ChangePasswordForm />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useAuthStore } from '@/stores/authStore'
import EditPostModal from '@/components/posts/EditPostModal.vue'
import EditPerfil from '@/components/user/EditPerfil.vue'
import ChangePasswordForm from '@/components/user/ChangePasswordForm.vue'
import PostItem from '@/components/posts/PostItem.vue'

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
      posts.value = response.data.reverse()
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
    alert('DELETE FROM posts WHERE id = ... concluído. O post agora vive apenas na memória (cache do seu navegador, talvez).')
  } catch (err) {
    console.error('Erro ao excluir post:', err)
    alert('Falha ao excluir o post.')
  }
}

onMounted(() => {
  listPost()
})
</script>
