<template>
    <div class="banner">

        <!-- 轮播组件 -->

        <div class="banner">

            <div v-for="(s, i) in (<any>props.data)">
                <van-swipe v-if="i == 0" class="my-swipe" :autoplay="3000" indicator-color="white">
                    <van-swipe-item v-for="sw in s.gallery_v3">
                        <van-image @click="preview(props.previewimg)" :src="'https:' + sw.img_url" />
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>


    </div>
</template>

<script lang="ts" setup>
import { showImagePreview } from 'vant';
const props = defineProps<{
    data: object,
    previewimg: any
}>()
const preview = (item:any) => {

let arr = <any>[];
item.forEach((element:any) => {
    if(element.img_url) {
        arr.push('https://'+element.img_url)
    }
});
// console.log(arr);

showImagePreview({
  images: arr,
  closeable: true,
});
}
</script>

<style lang="scss" scoped>
.banner {
    width: 100%;
}
</style>