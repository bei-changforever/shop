<template>
    <div class="footer-bar">

        <div class="back-wrap">
            <div ref="back" :style="`transform: translateX(${-frontWidth + frontChildWidth * activeIndex}px);`"
                class="back">
                <div class="back-left"></div>
                <div class="back-center"></div>
                <div class="back-right"></div>
            </div>
        </div>

        <div ref="activeball" :style="`left: ${activeBallLeft + frontChildWidth * activeIndex}px;`" class="active-ball">
        </div>

        <div class="front" ref="front">

            <div @click="updateActiveIndex(index, item)" :class="activeIndex == index ? 'active' : ''"
                v-for="(item, index) in TabbarData" :data-index="index" :key="index">
                <div class="top">
                    <i :class="[item.nativeIcon, activeIndex == index ? 'activetext' : '']"></i>
                </div>
                <div class="bottom" :class="activeIndex == index ? 'activetext' : ''">{{ item.name }}</div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onActivated } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const activeIndex: any = ref<Number>(0)
const router = useRouter()
const route = useRoute()
const TabbarData: any = ref<Array<object>>([
    {
        router: 'home',
        name: '首页',
        index: 0,
        activeIcon: '',
        nativeIcon: 'iconfont icon-shouyefill'
    },
    {
        router: '/cate',
        name: '分类',
        index: 1,
        activeIcon: '',
        nativeIcon: 'iconfont icon-yingyong'
    },
    {
        router: '/community',
        name: '社区',
        index: 2,
        activeIcon: '',
        nativeIcon: 'iconfont icon-icon_luntan-mian'
    },
    {
        router: '/shoppingbag',
        name: '购物车',
        index: 3,
        activeIcon: '',
        nativeIcon: 'iconfont icon-gouwu'
    },
    {
        router: '/my',
        name: '我的',
        index: 4,
        activeIcon: '',
        nativeIcon: 'iconfont icon-wode'
    },
])
// 获取tab项子节点
const frontChildWidth = ref(0)
const activeBallLeft = ref(0)
const frontWidth = ref(0)
let front = ref(null) as any
let back = ref(null) as any
let activeball = ref(null) as any


const updateActiveIndex = (index: Number, item: any) => {

    if (activeIndex.value == index) return

    router.push({
        path: item.router
    })

    if (index == 3) {
        return
    }

    localStorage.historyClick = JSON.stringify({
        index: index,
        routerName: item.router
    })

      
    localStorage.removeItem('productField')
    activeIndex.value = index
}

onMounted(() => {

    let historyClick = JSON.parse(localStorage.getItem('historyClick') as string)
    activeIndex.value = historyClick.index
    router.push({
        path: historyClick.routerName
    })



    frontChildWidth.value = front.value!.children[0].
        getBoundingClientRect().width
    activeBallLeft.value = frontChildWidth.value / 2 - activeball.value.getBoundingClientRect().width / 2 + 10
    frontWidth.value = front.value.getBoundingClientRect().width - 25

})

</script>
<style lang="scss" scoped>
@import '../assets/root.css';

.footer-bar {
    width: 100%;
    height: 50px;
    position: relative;
    // background-color: white;
}

.back-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.active-ball {
    position: absolute;
    // left: calc(25.5px + 71px * 0);
    top: -25px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--back-color);
}

.back-wrap .back {
    height: 100%;
    white-space: nowrap;
    font-size: 0;
    /* transform: translateX(calc(-375px + 125px * 0)); */
}

.back>div {
    height: 100%;
    display: inline-block;
}

.back-left {
    width: 100%;
    border-top-right-radius: 25px 20px;
    background-color: var(--back-color);
    box-shadow: 1.5px 0 var(--back-color);

}

.back-center {
    width: 40px;
    background-image: radial-gradient(circle at 50% 0px,
            transparent 42%,
            var(--back-color) 45%);
}


.back-right {
    width: 100%;
    border-top-left-radius: 25px 20px;
    background-color: var(--back-color);
    box-shadow: -1.5px 0 var(--back-color);
}





.back,
.active-ball {
    transition: 0.4s ease;
}

.front {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    position: absolute;
    display: flex;
    justify-content: space-evenly;
    user-select: none;
}

.front>div {
    flex: 1;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    // cursor: pointer;
    font-size: 20px;
    position: relative;
}

.front .top {
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    transform: translateY(10px);
    transition: 0.4s ease;
    //   background-color: pink;
    user-select: none;
}

.front .top i {
    font-size: 20px;
}

.front .bottom {
    transform: translateY(0px);
    font-size: 15px;
    opacity: 0;
    transition: 0.5s ease;
}

.front>div.active .top {
    transform: translateY(-22px);
}

.front>div.active .bottom {
    transform: translateY(-5px);
    opacity: 1;
}

.front .top,
.front .bottom {
    pointer-events: none;
}

.activetext {
    color: rgb(255, 103, 0);
}
</style>