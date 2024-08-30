<template>
    <div class="more" v-if="(<any>props.data).sections && (<any>props.data).sections[31].body.items">
         <p v-for="(item,index) in (<any>props.data).sections[31].body.items">
        {{ item.action_title }}<van-icon name="arrow" />
        </p>
        </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    data: object
}>()
</script>

<style scoped>
.more {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    color: #999;
    background-color: white;
}
</style>