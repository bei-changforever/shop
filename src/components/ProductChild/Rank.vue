<template>
    <div class="rank">
        <van-image width="90" block :src="(<any>props.data).icon" />
        <p style="margin-left: 10px;">{{ (<any>props.data).name }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    data: object
}>()
</script>

<style scoped>
.rank {
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    background-color: rgb(255,243,235);
    display: flex;
    align-items: center;
    font-size: 16px;
}
</style>