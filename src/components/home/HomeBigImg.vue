<template>
    <div class="home-big-img" v-if="(<any>props.homeBig).sections && (<any>props.homeBig).sections[4].body.items">
        <div class="left-big">
            <van-image block class="big-img" :src="'http:' + (<any>props.homeBig).sections[4].body.items[0].img_url" />
        </div>
        <div class="right">
            <div class="right-top">
                <van-image block :src="'http:' + (<any>props.homeBig).sections[4].body.items[1].img_url" />
            </div>
            <div class="right-bottom">
                <van-image block :src="'http:' + (<any>props.homeBig).sections[4].body.items[2].img_url" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    homeBig: object
}>()
</script>

<style lang="scss" scoped>
.home-big-img {
    width: 100%;
    display: flex;

    .left-big {
        width: 50%;
        margin-right: 5px;

        .big-img {
            width: 100%;
            height: 100%;
        }

    }

    .right {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .right-top {
            margin-bottom: 5px;
        }
    }

}
</style>