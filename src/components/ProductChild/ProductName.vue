<template>
    <div class="product-name">
        <p>{{ props.data }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    data:string
}>()
</script>

<style scoped>
.product-name {
    width: 100%;
    font-size: 16px;
    padding: 10px;
    box-sizing: border-box;
    font-weight: bold;
}
</style>