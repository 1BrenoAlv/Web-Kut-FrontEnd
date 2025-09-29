<template>
<div class="flex-col justify-between">
    <CreatePost/>
    <div class="flex gap-[15%]">
        <PostList/>
        <LatestPostsSidebar/>
    </div>
</div>
</template>
<script setup>
import PostList from '../posts/PostList.vue'
import CreatePost from '../posts/CreatePost.vue'
import LatestPostsSidebar from '../posts/LatestPostsSidebar.vue';

</script>