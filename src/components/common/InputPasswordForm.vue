<template>
  <div class="mb-4">
    <label :for="uniqueId" class="block text-sm font-medium text-gray-300 mb-1">
      {{ label }}
    </label>
    <div class="relative">
      <input 
        :id="uniqueId"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
        required
        class="w-full px-3 py-2 text-white bg-[#2d2e5a] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6560EA] pr-10"
      />
      <button 
        type="button" 
        @click="toggleVisibility" 
        class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white"
        aria-label="Mostrar ou ocultar senha"
      >
        <svg v-if="inputType === 'password'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zM10 12a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          <path d="M2 10s.943 3.027 3.038 5.252l1.557-1.557A4.004 4.004 0 016 10a4 4 0 012.38-3.682L6.15 4.03A9.982 9.982 0 00.458 10z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  modelValue: { 
    type: String,
    required: true
  },
  placeholder: String
})

defineEmits(['update:modelValue'])

const uniqueId = computed(() => `password-input-${Math.random().toString(36).substring(2, 9)}`)

const inputType = ref('password')

function toggleVisibility() {
  inputType.value = inputType.value === 'password' ? 'text' : 'password'
}
</script>