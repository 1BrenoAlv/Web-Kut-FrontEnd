<template>
  <div class="flex flex-col items-center justify-center py-15">
    <div
      class="w-full max-w-md p-8 space-y-6 bg-[#292A39] rounded-xl shadow-lg border border-[#6560EA]"
    >
      <h2 class="text-3xl font-bold text-center">Acesse sua conta</h2>
      <form class="space-y-6" @submit.prevent="handleRegister">
        <InputForm
          valueLabel="Nome"
          valueType="text"
          valueFor="nome"
          valueId="nome"
          valuePlaceholder="Nome Completo"
          v-model="fullName"
        />
        <InputForm
          valueLabel="E-mail"
          valueType="email"
          valueFor="email"
          valueId="email"
          valuePlaceholder="exemplo@email.com"
          v-model="email"
        />
        <InputForm
          valueLabel="Senha"
          valueType="password"
          valueFor="password"
          valueId="password"
          valuePlaceholder="Digite sua senha (mín. 8 caracteres)"
          v-model="password"
        />
        <InputForm
          valueLabel="Nome de usuário"
          valueType="text"
          valueFor="username"
          valueId="username"
          valuePlaceholder="Nome123"
          v-model="username"
        />
        <div v-if="errorMessage" class="text-center text-red-400">{{ errorMessage }}</div>
        <div v-if="successMessage" class="text-center text-green-400">{{ successMessage }}</div>
        <input
          type="submit"
          :value="isLoading ? 'Cadastrando...' : 'Cadastrar'"
          :disabled="isLoading"
          class="w-full py-4 px-4 bg-[#6560EA] hover:bg-[#3e39d3] focus:ring-[#6560EA] focus:ring-offset-slate-800 font-semibold rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300"
        />
      </form>
      <div class="text-center">
        <RouterLink to="/login" class="font-medium text-[#6F95C7] hover:underline">
          Já possui conta? Entre aqui
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputForm from '@/components/common/InputForm.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const fullName = ref('')
const email = ref('')
const password = ref('')
const username = ref('')

const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)

const handleRegister = async () => {
      console.log('PASSO 1: handleRegister foi chamada.');
  if (password.value.length < 8) {
    errorMessage.value = 'A senha precisa ter no mínimo 8 caracteres.'
    return
  }
  
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const userData = {
      fullName: fullName.value,
      email: email.value,
      password: password.value,
      username: username.value,
    }
    console.log('PASSO 2: Dados coletados para enviar:', userData)
     console.log('PASSO 3: Tentando chamar authStore.register...')
    await authStore.register(userData)
    console.log('PASSO 4: Chamada para authStore.register foi bem-sucedida!')
    
    successMessage.value = 'Cadastro realizado com sucesso! Redirecionando...'
    setTimeout(() => {
      router.push('/login')
    }, 2000)

  } catch (error) {
      console.error('O objeto de erro completo que foi capturado é:', error)
    errorMessage.value = 'Erro ao cadastrar. O e-mail ou nome de usuário pode já estar em uso.'
  } finally {
    isLoading.value = false
  }
}
</script>