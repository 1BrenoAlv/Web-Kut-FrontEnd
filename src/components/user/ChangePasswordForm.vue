<template>
  <div class="bg-[#22255B] p-8 rounded-lg shadow-lg w-full">
    <h2 class="text-2xl font-bold text-white mb-6">Alterar Senha</h2>

    <form class="flex-col space-y-4" @submit.prevent="handleChangePassword">
      <InputPasswordForm label="Senha Atual" v-model="currentPassword" />

      <InputPasswordForm label="Nova Senha" v-model="newPassword" />

      <InputPasswordForm label="Confirmar Nova Senha" v-model="confirmPassword" />
      <div v-if="error" class="text-[#E1706E] font-bold text-sm mt-2">{{ error }}</div>
      <div v-if="successMessage" class="text-green-400 font-bold text-sm mt-2">
        {{ successMessage }}
      </div>

      <div class="mt-6 flex justify-end">
        <button
          type="submit"
          :disabled="isLoading"
          class="bg-[#6560EA] text-white font-semibold hover:bg-[#3e39d3] rounded-lg py-2 px-5 transition duration-200 ease-linear cursor-pointer"
        >
          {{ isLoading ? 'Salvando...' : 'Alterar Senha' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputForm from '../common/InputForm.vue'
import api from '@/services/api'
import InputPasswordForm from '../common/InputPasswordForm.vue'

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const isLoading = ref(false)
const error = ref(null)
const successMessage = ref(null)

const currentPasswordType = ref('password')
const newPasswordType = ref('password')

function toggleVisibility(field) {
  if (field === 'current') {
    currentPasswordType.value = currentPasswordType.value === 'password' ? 'text' : 'password'
  } else if (field === 'new') {
    newPasswordType.value = newPasswordType.value === 'password' ? 'text' : 'password'
  }
}

async function handleChangePassword() {
  error.value = null
  successMessage.value = null

  if (newPassword.value !== confirmPassword.value) {
    error.value = 'A nova senha é diferente da confirmação!'
    alert('A nova senha é diferente da confirmação!')
    return
  }

  isLoading.value = true
  const payload = {
    OldPassword: currentPassword.value,
    NewPassword: newPassword.value,
    NewPasswordConfirmed: confirmPassword.value,
  }

  try {
    await api.changePassword(payload)
    successMessage.value = 'Senha alterada com sucesso!'
    alert('Senha alterada com sucesso!')
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (err) {
    error.value = err.response?.data?.message || 'Ocorreu um erro ao alterar a senha.'
  } finally {
    isLoading.value = false
  }
}
</script>
