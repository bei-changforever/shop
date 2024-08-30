<template>
    <div class="home-nav" v-if="(<any>props.homeNav).sections && (<any>props.homeNav).sections[1]">
        <!-- {{ (<any>props.homeNav).sections && (<any>props.homeNav).sections[1] }} -->
        <ul>
            <li v-for="(item, index) in (<any>props.homeNav).sections[1].body.items">
                <div class="nav-box">
                    <div class="img">
                        <van-image block  class="auto-img" :src="'http:' + item.img_url" />
                    </div>
                </div>
            </li>
        </ul>
        <ul>
            <li v-for="(item, index) in (<any>props.homeNav).sections[2].body.items">
                <div class="nav-box">
                    <div class="img">
                        <van-image block  class="auto-img" :src="'http:' + item.img_url" />
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    homeNav: object
}>()
</script>

<style lang="scss" scoped>
.home-nav {
    width: 100%;
    overflow: hidden;
    ul {
        width: 100%;
        display: flex;
       
        li {
            width: 20%;

            .nav-box {
                width: 100%;
                display: block;
                .img {
                    width: 100%;
                    display: block;
                    .auto-img {
                        display: block;
                    }
                }


            }
        }
    }
}
</style>