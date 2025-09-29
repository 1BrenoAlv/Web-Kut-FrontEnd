<template>
  <div v-if="show" class="fixed inset-0 bg-transparent backdrop-blur-sm flex justify-center items-center">
    <div class="bg-[#22255B] p-6 rounded-lg shadow-xl w-[30%]">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Criar Novo Post</h2>
        <button @click="closeModal" class="text-[#6560EA] hover:scale-110 active:scale-95 text-3xl">&times;</button>
      </div>
      <form class="flex-col" @submit.prevent="createPostForm">
        <InputForm
          valueLabel="Título"
          valueType="text"
          valueFor="title"
          valueId="title"
          valuePlaceholder="Digite seu titulo"
          v-model="title"
          required
        />
        <InputForm
          valueLabel="Conteúdo"
          valueType="text"
          valueFor="content"
          valueId="content"
          valuePlaceholder="Digite o conteúdo do post"
           v-model="content"
          required
        />
        <div class="my-4">
            <label for="imageUpload" class="block text-white mb-2">Adicionar Imagem (Opcional)</label>
            <input 
                id="imageUpload"
                type="file" 
                @change="handleFileChange"
                class="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:text-sm file:font-semibold file:bg-[#2d2e5a] file:border-1 file:border-gray-700 file:text-[#6560EA] hover:file:bg-[#111222]"
            >
        </div>
    <input type="submit" value="Criar Post" class="bg-[#6560EA] hover:bg-[#3e39d3] rounded-lg py-2 px-4 transition duration-200 ease-linear">
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import InputForm from '../common/InputForm.vue'
import api from '@/services/api'

const title = ref('')
const content = ref('')
const image = ref(null)
const typeContentId = computed(() => {
  return image.value ? 2 : 1
})

function handleFileChange(event) {
  image.value = event.target.files[0] || null
}

const props = defineProps({
  show: Boolean,
})

const emit = defineEmits(['close'])

const createPostForm = async () => {
  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('content', content.value)
  formData.append('typeContentId', typeContentId.value)

 if (typeContentId.value === 2 && image.value) {
    formData.append('imageFile', image.value)
  }

  try {
    await api.postPost(formData)
    closeModal()
    window.location.reload()
  } 
  catch (error) {
    console.error("Erro ao criar post:", error.response?.data || error.message)
    alert('Erro ao tentar criar um post. Tente novamente!')
  }
}
function closeModal() {
  emit('close')
}
</script>