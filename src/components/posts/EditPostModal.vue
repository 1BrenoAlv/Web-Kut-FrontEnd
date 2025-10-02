<template>
  <div v-if="show" class="fixed inset-0 bg-transparent backdrop-blur-sm flex justify-center items-center z-50">
    <div class="bg-[#22255B] p-6 rounded-lg shadow-xl w-[30%]">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Editar Post</h2>
        <button @click="closeModal" class="text-[#6560EA] hover:scale-110 active:scale-95 text-3xl">&times;</button>
      </div>

      <form class="flex-col" @submit.prevent="updatePostForm">
        <InputForm
        class="mb-6"
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
        
        <div class="mt-6 flex justify-end">
          <input type="submit" value="Salvar Alterações" class="bg-[#6560EA] hover:bg-[#3e39d3] rounded-lg py-2 px-6  transition duration-200 ease-linear">
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import InputForm from '../common/InputForm.vue'
import api from '@/services/api'

const props = defineProps({
  show: Boolean,
  postToEdit: Object,
})

const emit = defineEmits(['close', 'post-updated'])

const editablePost = ref({ title: '', content: '' })

watch(() => props.postToEdit, (newPost) => {
  if (newPost) {
    editablePost.value = { ...newPost }
  }
})

async function updatePostForm() {
  if (!props.postToEdit) return;
  const payload = {
    title: editablePost.value.title,
    content: editablePost.value.content,
    typeContentId: 1 
  }

  try {
    const response = await api.updatePost(props.postToEdit.id, payload)
    
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
</script>