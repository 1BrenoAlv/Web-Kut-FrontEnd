<template>
  <div class="bg-[#22255B] p-8 rounded-lg shadow-lg w-[500px]">
    <h2 class="text-2xl font-bold text-white mb-6">Editar Perfil</h2>
    
    <div v-if="isLoading" class="text-center text-gray-400">
      Carregando dados...
    </div>
    
    <form v-else class="flex-col" @submit.prevent="updateUserForm">
      <InputForm
        valueLabel="Nome Completo"
        valueType="text"
        v-model="editableUser.fullname"
        required
         class="mb-6"
           :valueLength="fullnameLength"
      />
      <InputForm
        valueLabel="Nome de Usuário"
        valueType="text"
        v-model="editableUser.username"
        required
        class="mb-6" 
        :valueLength="usernameLength"
      />
      <InputForm
        valueLabel="Email"
        valueType="email"
        v-model="editableUser.email"
        required
         class="mb-6"
      />
      <div class="mt-6 flex justify-end">
        <input 
          type="submit" 
          value="Salvar Alterações" 
          class="bg-[#6560EA] text-white font-semibold hover:bg-[#3e39d3] rounded-lg py-2 px-5 transition duration-200 ease-linear cursor-pointer"
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import InputForm from '../common/InputForm.vue'
import api from '@/services/api'
import { useAuthStore } from '@/stores/authStore' 

const authStore = useAuthStore()

const editableUser = ref({ fullname: '', username: '', email: '' })
const isLoading = ref(true)
const usernameLength = ref(20)
const fullnameLength = ref(150)

onMounted(() => {
  if (authStore.user) {
    editableUser.value.fullname = authStore.user.fullname
    editableUser.value.username = authStore.user.username
    editableUser.value.email = authStore.user.email
  }
  isLoading.value = false
})

async function updateUserForm() {
  if (!authStore.user) {
    alert('Usuário não autenticado.');
    return;
  }

  const payload = {
    fullname: editableUser.value.fullname,
    username: editableUser.value.username,
    email: editableUser.value.email,
  }

  try {
    const response = await api.updateUsers(authStore.user.id, payload)
    
    authStore.setUser(response.data)

    alert('Tudo certo! Perfil novinho em folha.');
  } 
  catch (error) {
    console.error("Erro ao atualizar os dados:", error.response?.data || error.message)
    alert('Erro ao tentar atualizar os dados. Tente novamente!')
  }
}
</script>