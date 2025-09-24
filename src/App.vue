<template>
  <div class="flex flex-col min-h-screen bg-[#111222]">
    <header>
      <AppHeader/>
    </header>
    <router-view></router-view>
    <footer class="mt-auto">
      <AppFooter/>
    </footer>
  </div>
</template>
<script>
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
export default {
  name: 'App',
  components:{
    AppHeader,
    AppFooter
  }
}
</script>
