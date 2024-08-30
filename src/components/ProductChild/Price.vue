<template>
     <div class="price" >
            <span >
                ￥{{ (<any>props.data)}}
            </span>
        </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    data:any
}>()
</script>

<style scoped>

</style>