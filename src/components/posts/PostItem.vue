<template>
  <li
    class="flex w-full max-w-5xl bg-[#22255B] border-b-[2px] border-[#6560EA] rounded-xl overflow-hidden transition-all duration-300"
    :class="isExpanded ? 'h-auto' : 'h-[400px]'"
  >
    <div v-if="post.imageUrl" class="w-[40%] aspect-square">
      <img
        class="w-full h-full object-fill"
        :src="`https://localhost:7132/${post.imageUrl}`"
        alt="Imagem do post"
      />
    </div>

    <div class="flex flex-col p-6" :class="post.imageUrl ? 'w-[60%]' : 'w-full'">
      <h2 class="text-2xl font-bold w-full text-white mb-2 break-words">{{ post.title }}</h2>

      <p
        ref="contentRef"
        class="text-white leading-relaxed break-words flex-grow"
        :class="{ 'line-clamp-5': !isExpanded }"
      >
        {{ post.content }}
      </p>

      <div class="mt-2 flex-shrink-0">
        <button
          v-if="contentIsClamped && !isExpanded"
          @click="toggleExpanded"
          class="text-[#6560EA] font-bold hover:underline cursor-pointer"
        >
          Ver mais
        </button>
        <button
          v-if="isExpanded"
          @click="toggleExpanded"
          class="text-[#6560EA] font-bold hover:underline cursor-pointer"
        >
          Ver menos
        </button>
      </div>

      <div class="flex justify-end items-center gap-4 mt-auto pt-4 border-t border-gray-700 flex-shrink-0">
        <svg
          @click="emit('edit', post)"
          class="w-7 h-7 cursor-pointer transition-transform hover:scale-110 active:scale-95"
          xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
          >
           <g fill="#6560EA" fill-rule="evenodd" clip-rule="evenodd">
                    <path
                      d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352z"
                    />
                    <path
                      d="M19.846 4.318a2.2 2.2 0 0 0-.437-.692a2 2 0 0 0-.654-.463a1.92 1.92 0 0 0-1.544 0a2 2 0 0 0-.654.463l-.546.578l2.852 3.02l.546-.579a2.1 2.1 0 0 0 .437-.692a2.24 2.24 0 0 0 0-1.635M17.45 8.721L14.597 5.7L9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.5.5 0 0 0 .255-.145l4.778-5.06Z"
                    />
                  </g>
          </svg>

        <svg
          @click="emit('delete', post.id)"
          class="w-7 h-7 cursor-pointer transition-transform hover:scale-110 active:scale-95"
           xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#E1706E"
                    d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                  />
          </svg>
      </div>
    </div>
  </li>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onUpdated, defineProps, defineEmits } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['edit', 'delete'])

const isExpanded = ref(false)
const contentIsClamped = ref(false)
const contentRef = ref(null)
let observer = null

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

const checkIfClamped = () => {
  const element = contentRef.value
  if (element) {
    contentIsClamped.value = element.scrollHeight > element.clientHeight
  }
}

onMounted(() => {
  checkIfClamped()
  if (contentRef.value) {
    observer = new ResizeObserver(checkIfClamped)
    observer.observe(contentRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

onUpdated(() => {
  checkIfClamped()
})
</script>