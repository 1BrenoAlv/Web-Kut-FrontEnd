<template>
    <div class="max-w-full  bg-[#111222] flex items-center p-10 font-bold justify-around shadow-[0_4px_0_0_#6560EA]">
        <p>{{ horaFormatada }}</p>
        <RouterLink to="/"><img src="/src/assets/img/logo-ws.png" alt="logo da WebSupply" class="w-90"></RouterLink>
        <RouterLink to="/login" class="bg-[#6560EA] rounded-lg py-1.5 px-6 " >Entrar</RouterLink>
    </div>
</template>
<script>
export default {
    name: 'AppHeader',

    data(){
        return{
            dataAtualHora: new Date(),
            intervaloId: null,
        }
    },
    computed:{
        horaFormatada(){
            return this.dataAtualHora.toLocaleString('pt-BR')
        }
    },
    mounted(){
        this.intervaloId = setInterval(()=>{
            this.dataAtualHora = new Date();
        }, 1000)
    },
    beforeUnmount(){
        clearInterval(this.intervaloId)
    }

}
</script>