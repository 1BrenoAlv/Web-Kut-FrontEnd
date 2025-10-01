<!-- <template>
  <div v-if="show" class="fixed inset-0 bg-transparent backdrop-blur-sm flex justify-center items-center z-50">
    <div class="bg-[#22255B] p-6 rounded-lg shadow-xl w-[30%]">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Editar Post</h2>
        <button @click="closeModal" class="text-[#6560EA] hover:scale-110 active:scale-95 text-3xl">&times;</button>
      </div>

      <form class="flex-col" @submit.prevent="updatePostForm">
        <InputForm
          valueLabel="Título"
          valueType="text"
          v-model="editablePost.title"
          required
        />
        <InputForm
          valueLabel="Conteúdo"
          valueType="text"
          v-model="editablePost.content"
          required
        />

        <div class="my-4">
          <label class="block text-white mb-2">Alterar Imagem (Opcional)</label>
          <img v-if="currentImageUrl" :src="currentImageUrl" class="w-full h-32 object-cover rounded-lg mb-2" alt="Imagem atual">
          <input 
            type="file" 
            @change="handleFileChange"
            class="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:text-sm file:font-semibold file:bg-[#2d2e5a] file:border-1 file:border-gray-700 file:text-[#6560EA] hover:file:bg-[#111222]"
          >
        </div>

        <input type="submit" value="Salvar Alterações" class="bg-[#6560EA] hover:bg-[#3e39d3] rounded-lg py-2 px-4 transition duration-200 ease-linear cursor-pointer">
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import InputForm from '../common/InputForm.vue'
import api from '@/services/api'

const props = defineProps({
  show: Boolean,
  postToEdit: Object,
})

const emit = defineEmits(['close', 'post-updated'])

const editablePost = ref({ title: '', content: '' })
const newImageFile = ref(null)
const currentImageUrl = ref(null)
watch(() => props.postToEdit, (newPost) => {
  if (newPost) {
    editablePost.value = { ...newPost } 
    newImageFile.value = null 
    currentImageUrl.value = `https://localhost:7132/${newPost.imageUrl}` 
  }
})

function handleFileChange(event) {
  newImageFile.value = event.target.files[0] || null
}

const updatePostForm = async () => {
  if (!props.postToEdit) return;

  const formData = new FormData()
  formData.append('id', props.postToEdit.id)
  formData.append('title', editablePost.value.title)
  formData.append('content', editablePost.value.content)
  formData.append('typeContentId', newImageFile.value ? 2 : 1)

  if (newImageFile.value) {
    formData.append('imageFile', newImageFile.value)
  }

  try {
    const response = await api.updatePost(props.postToEdit.id, formData)
    
    emit('post-updated', response.data)
    closeModal()
  } 
  catch (error) {
    console.error("Erro ao atualizar post:", error.response?.data || error.message)
    alert('Erro ao tentar atualizar o post. Tente novamente!')
  }
}

function closeModal() {
  emit('close')
}
</script> -->