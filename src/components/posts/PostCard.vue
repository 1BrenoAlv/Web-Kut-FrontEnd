<template>
  <div class="flex w-full max-w-3xl bg-[#22255B] border-slate-200 rounded-xl shadow-md overflow-hidden">
    
    <img class="w-48 flex-shrink-0 object-cover h-full" src="" alt="Imagem de demonstração">
    
    <div class="flex flex-col p-6">
      
      <h3 class="text-2xl font-bold text-white mb-2">Batman e Mulher Maravilha Felizes!</h3>
      
      <p class="text-white leading-relaxed flex-grow">
        Batman e Mulher Maravilha estão felizes após curso do Saber Aprendizes, eles estão anciosos para combater bugs e quebra de códigos!
      </p>
      
      <img src="/public/hearth.svg" alt="coração para curtir post" class="w-7 h-7 cursor-pointer transition-transform hover:scale-110 active:scale-95 self-end mt-4">
      
    </div>
    
  </div>
</template>
<script setup>
import { ref } from 'vue'


const idPost = ref('')
const titlePost = ref('')
const contentPost = ref('')
const typeContentPost = ref('')
const likeCountPost = ref('')
const imagePost = ref('')

const getAllPosts = async () => {
  try {
    const credentials = {
      id: idPost.value,
      title: titlePost.value, content: contentPost.value, typeContent: typeContentPost, likesCount: likeCountPost, imageUrl: imagePost,
    }
  } catch (error) {
    errorMessage.value = 'Post não encontrado!';
  }
}



</script>