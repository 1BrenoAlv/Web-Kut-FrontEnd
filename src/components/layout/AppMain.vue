<template>
<main>
    <CreatePost/>
    <div class="flex gap-[20rem]">
        <PostList/>
        <LatestPostsSidebar/>
    </div>
</main>
</template>
<script setup>
import PostList from '../posts/PostList.vue'
import CreatePost from '../posts/CreatePost.vue'
import LatestPostsSidebar from '../posts/LatestPostsSidebar.vue';

</script>