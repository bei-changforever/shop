<template>
    <div class="big-back" v-if="(<any>props.bigimg).sections && (<any>props.bigimg).sections[6].body.items">
        <!-- (<any>props.homeBig).sections && (<any>props.homeBig).sections[6].body.items -->
        <van-image block :src="'http:'+(<any>props.bigimg).sections[6].body.items[0].img_url
" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    bigimg: object
}>()
</script>

<style lang="scss" scoped></style>