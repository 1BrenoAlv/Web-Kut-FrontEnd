<template>
  <div class="flex flex-col items-center justify-center py-30">
    <div
      class="w-full max-w-md p-8 space-y-6 bg-[#292A39] rounded-xl shadow-lg border border-[#6560EA]"
    >
      <h2 class="text-3xl font-bold text-center">Acesse sua conta</h2>
      <form class="space-y-6" @submit.prevent="handleLogin">
        <InputForm
          valueLabel="E-mail"
          valueType="email"
          valueFor="email"
          valueId="email"
          valuePlaceholder="exemplo@email.com"
          v-model="email"
        />
        <InputPasswordForm label="Senha" placeholder="Digite sua senha" v-model="password" />

        <div v-if="errorMessage" class="text-center text-red-400">{{ errorMessage }}</div>
        <input
          type="submit"
          value="Entrar"
          class="w-full py-4 px-4 bg-[#6560EA] hover:bg-[#3e39d3] focus:ring-[#6560EA] focus:ring-offset-slate-800 font-semibold rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300"
        />
      </form>
      <div class="text-center">
        <RouterLink to="/cadastro" class="font-medium text-[#6F95C7] hover:underline">
          Não possui conta? Crie aqui
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
import { RouterLink } from 'vue-router'
import InputPasswordForm from '@/components/common/InputPasswordForm.vue'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    const credentials = {
      email: email.value,
      password: password.value,
    }

    await authStore.login(credentials)
    router.push('/')
    alert('Se Logou!🎉🎉')
  } catch (error) {
    errorMessage.value = 'Email ou senha estão incorretos!'
  }
}
</script>
