<script lang="ts" setup>
import TabbarView from '@/components/Tabbar.vue';
import { RouterView } from 'vue-router';
import { onMounted, ref, onBeforeUnmount, getCurrentInstance } from 'vue';
import type { ComponentInternalInstance } from 'vue';
const isbackTop = ref(false)
let {
    proxy
} = getCurrentInstance() as ComponentInternalInstance;

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})
const handleScroll = () => {
    let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

    (<any>proxy).scrollTop = scrollTop;

    if (scrollTop >= 1200) {
        isbackTop.value = true
    }
    else {
        isbackTop.value = false
    }
}

const gotoTop = () => {
    let timer = setInterval(() => {
        let ispeed = Math.floor(-(<any>proxy).scrollTop / 10);
        document.documentElement.scrollTop = document.body.scrollTop =
            (<any>proxy).scrollTop + ispeed;
        if ((<any>proxy).scrollTop === 0) {
            clearInterval(timer);
        }
    }, 10);

}




</script>

<template>
    <div class="main-view">

        <router-view v-slot="{ Component }">
            <!-- <transition name="router_animate"> -->
                <component :is="Component" />
            <!-- </transition> -->
        </router-view>

        <div class="gotoTop" @click="gotoTop" v-if="isbackTop"><van-icon name="back-top" /></div>


        <div class="style-fixed-bottom">
            <TabbarView />
        </div>

    </div>
</template>

<style lang="scss" scoped>
@import '../assets/root.css';

.main-view {
    width: 100%;
    position: relative;

    .style-fixed-bottom {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 2;
    }

    .gotoTop {
        position: fixed;
        right: 2vh;
        bottom: 15vh;
        z-index: 99;
        width: 50px;
        height: 50px;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        color: #999;
        border: 1px solid var(--base-color);
        background-color: var(--base-color);
    }

}


.router_animate-enter-active {
    animation: bounceIn 1s;
}

.router_animate-leave-active {
    animation: bounceOut 0.6s;
}
</style>
