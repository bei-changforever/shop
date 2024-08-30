<template>
    <div class="bot-nav">
        <input type="text" class="answer-input" placeholder="来说点什么...">

        <div class="publish-news">发布</div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps<{
    id: string | number
}>();
</script>

<style scoped lang="scss">
.bot-nav {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 5px 0;
    height: 35px;
    width: 100%;
    background: #fff;

    .answer-input {
        width: 75%;
        font-size: 14px;
        text-indent: 10px;
        border: 1px solid black;
        outline: none;
        border-radius: 10px;
    }

    .publish-news {
        font-size: 14px;
        font-weight: 600;
        padding: 2px 5px;
        background: #ff5934;
        color: #fff;
        border-radius: 10px;
    }
}
</style>