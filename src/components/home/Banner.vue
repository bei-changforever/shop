<template>
    <div class="gallery">
        <!-- {{ props.data.sections && props.data.sections[0].body.items }} -->
        <!-- {{ props.data.sections }} -->
        <van-swipe v-if="(<any>props.data).sections && (<any>props.data).sections[0].body.items" class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item, index) in (<any>props.data).sections[0].body.items">
                <van-image block  :src="item.img_url" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    data: object,
}>()
console.log('banner页数据==>', props);
</script>

<style lang="scss" scoped>
.gallery {
    width: 100%;
    margin-top: 100px;
}
</style>