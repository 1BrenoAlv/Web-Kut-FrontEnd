<template>
  <div class="flex flex-col items-center justify-center py-30">
    <div class="w-full max-w-md p-8 space-y-6 bg-[#292A39] rounded-xl shadow-lg border border-[#6560EA]">
      <h2 class="text-3xl font-bold text-center">Acesse sua conta</h2>
      <form class="space-y-6">
        <div>
          <label for="email" class="block mb-2 text-sm font-medium ">
            Seu email
          </label>
          <input
            type="email"
            id="email"
            class="w-full px-3 py-2  border border-[#6F95C7] rounded-md placeholder-[#6F95C7] focus:outline-none focus:ring-2 focus:ring-[#6560EA] focus:border-transparent"
            placeholder="nome@email.com"
            required
          />
        </div>

        <div>
          <label for="password" class="block mb-2 text-sm font-medium ">
            Sua senha
          </label>
          <input
            type="password"
            id="password"
            class="w-full px-3 py-2  border border-[#6F95C7] rounded-md placeholder-[#6F95C7] focus:outline-none focus:ring-2 focus:ring-[#6560EA] focus:border-transparent"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full py-2 px-4 bg-[#6560EA] hover:bg-[#6560EA] focus:ring-[#6560EA] focus:ring-offset-slate-800  font-semibold rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300"
        >
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
}
</script>
