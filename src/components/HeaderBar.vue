<template>
    <div class="header-bar">
        <div class="h-b">
            <div class="logo">
                <div class="mm">
                    {{ state.mm }} / {{ state.dd }}
                </div>
            </div>
            <div class="search" @click="skipSearch">
                <div class="search-box">
                    <div class="search-icon">
                        <van-icon name="search" />
                    </div>
                    <div class="search-input">
                        <input type="text" placeholder="点我搜索吧~">
                    </div>
                </div>
            </div>
            <div class="user">
                <div class="user-box">
                    <i class="iconfont icon-wode"></i>
                </div>

            </div>
        </div>
        <div class="home-page-select">
            <ul>
                <li @click="changeSelect(item, index)" :class="activeIndex === index ? 'active' : ''"
                    v-for="(item, index ) in dataRecords">
                    <span>{{ item.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { startTime } from '@/utils/date.js';
import { reactive, ref, onMounted, toRefs } from 'vue';
import {getHomePage } from '@/request/projectApis/index'
import type { tab } from '@/typing';
import { useRouter } from 'vue-router';
import { changeHome } from '@/stores/ChangeHomeStore/index'
const { dataState, preIndex } = toRefs(changeHome())
const { setOptions, setPreIndex } = changeHome()
const emit = defineEmits(['userSelect'])
const router = useRouter();
let dataRecords = ref<Array<tab>>([])
const getHomePageData = async () => {
    let { data } = await getHomePage()
    let dataList = data.data.tabs
    dataRecords.value = dataList
}

onMounted(() => {
    getHomePageData()
    activeIndex.value = preIndex.value ? preIndex.value : 0


})

let state: any = reactive<object>({})
state = startTime()

const activeIndex: any = ref<number>(0)
const changeSelect = (item: object, index: number) => {
    if (activeIndex.value == index) return
    activeIndex.value = index

    setPreIndex(index)
    setOptions(item)


    emit('userSelect', item)
}

// 跳转搜索页面 
const skipSearch = () => {
    router.push({ path: '/search' })
}


</script>

<style lang="scss" scoped>
@import '@/assets/index.scss';
@import '@/assets/root.css';

.header-bar {
    width: 100%;
    height: 7vh;
    background-color: var(--base-color);

    .h-b {
        width: 100%;
        height: 100%;
        display: flex;
        border-bottom: 1px solid var(--border-bottom-color);
        justify-content: space-between;

        .logo {
            width: 70px;
            height: 7vh;
            font-size: 18px;
            font-weight: bold;
            @include center;
            color: #999;
        }

        .search {
            width: 65%;
            @include center;
            overflow: hidden;

            .search-box {
                overflow: hidden;
                width: 100%;
                height: 40px;
                background: var(--input-color);
                border-radius: 40px;
                @include center;

                .search-icon {
                    width: 32px;
                    height: 32px;
                    background-color: var(--active-color);
                    border-radius: 50%;
                    color: white;
                    font-size: 15px;
                    text-decoration: none;
                    @include center;
                    transform: translateX(-2px);
                }

                .search-input {
                    width: 80%;
                    @include center;

                    input {
                        width: 100%;
                        height: 40px;
                        outline: none;
                        border: none;
                        text-indent: 0.5em;
                        font-size: 13px;
                        color: white;
                        background: transparent;
                    }
                }
            }
        }

        .user {
            width: 15%;
            height: 100%;

            @include center;

            .user-box {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                @include center;
                color: #999;
            }
        }
    }

    .home-page-select {
        width: 100%;
        height: 50px;
        background-color: var(--base-color);

        ul {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-around;

            li {
                width: 20%;
                padding: 10px;
                box-sizing: border-box;
                @include center;
                color: #999;
                height: 100%;
                position: relative;
                font-size: 14px;


                &.active {
                    span {
                        display: block;
                        width: 100px;
                        height: 30px;
                        text-align: center;
                        line-height: 30px;
                        background-color: var(--active-color);
                        border-radius: 10px;
                        color: white;
                        font-size: 16px;
                    }

                }

            }


        }
    }


}
</style>