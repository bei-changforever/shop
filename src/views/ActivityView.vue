<template>
    <div class="activity-view">
        <div class="top-bar" :style="topBarStyle">
            <span class="back-icon" @click="backFun">
                <img :src="last_fix >= 200 ? reqImageArr[0] : reqImageArr[1]">
            </span>

            <span class="title" :class="{ black: last_fix >= 200 }">{{ viewData.channel_global_config?.body.title }}</span>

            <span class="search" @click="skipSearch"><img :src="last_fix >= 200 ? reqImageArr[2] : reqImageArr[3]"></span>
        </div>

        <div class="top-box" :style="topBoxStyle" v-if="Object.keys(viewData).length !== 0">
            <div class="skip-box"
                @click="skipView(viewData.sections[0].body.items[0].action.path, viewData.sections[0].body.items[0].action.type)">
            </div>
            <div class="top-class">
                <div class="up-box">
                    <div v-for="up in topClassData.body.next_items" class="official-item">
                        <span class="title"><img :src="up.img_url">
                            <span>{{ up.title }}</span>
                        </span>
                    </div>
                </div>

                <div class="down-box">
                    <div class="exposure-item" v-for="down in topClassData.body.items"
                        @click="skipView(down.action.path, down.action.type)">
                        <img :src="down.img_url">
                        <span class="title">{{ down.title }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="center-box" v-if="Object.keys(viewData).length !== 0">
            <div class="hot-class" v-if="hotSellData">
                <div class="hot-item" v-for="hot in hotSellData">
                    <img :src="hot.img_url" @click="skipProduct(hot.action.path)">
                </div>
            </div>

            <CenterCom :itemsArr="viewData.sections.slice(4)" v-if="isCom"></CenterCom>

        </div>

        <van-back-top />
    </div>
</template>

<script setup lang="ts">
// 节流
import { throttle } from "underscore";
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { activityViewApi } from "../request/activityApis/index";
import { reqImageArr } from "../utils/reqImageArr.js";
import CenterCom from "../components/activity/CenterCom.vue";


const router = useRouter();
const route = useRoute();

const backFun = () => {
    router.go(-1);
};
const skipSearch = () => {
    router.push({ path: '/search' })
};
const skipProduct = (id: number | string) => {
    router.push({ path: '/product', query: { id } });
};

const skipView = (str: string, type: string) => {
    if (type == "keyword") {
        router.push({ path: '/search/list', query: { key: str } })
        return
    }

    if (type == "url" || type == "activity") {
        window.location.href = str
        return
    }

    if (type == "product") {
        router.push({ path: '/product', query: { id: str } });
        return
    }

};

const last_fix = ref(0);
const windowScroll = throttle(() => {
    let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

    // console.log(scrollTop);

    last_fix.value = scrollTop
}, 200);

watch(() => last_fix.value,
    () => {
        if (last_fix.value >= 200) {

        }
    }
);

const viewData = ref<any>({})
// 页面初始化请求数据
const viewInitData = async (id: number | string) => {
    let { data } = await activityViewApi(id)
    viewData.value = data.data
    console.log(data.data);
};
// 顶部分类数据
const topClassData = computed(() => {
    if (viewData.value.sections) {
        return viewData.value.sections[1]
    }
});
// 热销排行数据
interface arr {
    view_type: string
};
interface hotRes {
    img_url: string,
    action: {
        path: number | string
    }
};
const hotSellData = computed(() => {
    // return viewData.value.sections[3]

    let res: '' | hotRes[] = ''
    let index = viewData.value.sections.findIndex((arr: arr) => {
        return arr.view_type == 'cells_auto_fill'
    })

    if (index !== -1) {
        res = viewData.value.sections[index]?.body.items as hotRes[]
    }

    return res
});
// 是否生成组件
const isCom = computed(() => {
    return viewData.value.sections.length > 5
});


// 顶部导航动态样式
const topBarStyle = computed(() => {
    let res = last_fix.value / 200 > 1 ? 1 : last_fix.value / 200

    return {
        background: `rgba(255, 255, 255, ${res})`
    }
});
// 顶部盒子背景
const topBoxStyle = computed(() => {
    let url = ''
    if (viewData.value.sections) {
        url = viewData.value.sections[0].body.items[0].img_url
        // console.log(viewData.value.sections[0].body.items[0].img_url);
    }
    return {
        'backgroundImage': `url(${url})`,
    }
});




watch(() => route.query,
    () => {
        if (route.query.id && route.path == '/activity') {
            // console.log(route.path);
            viewData.value = {};
            viewInitData(route.query.id as number | string);
        }
    },
    {
        immediate: true
    });


onMounted(() => {
    window.addEventListener('scroll', windowScroll)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', windowScroll)
})
</script>

<style lang="scss" scoped>
.activity-view {
    position: relative;
    padding-bottom: 5vh;
    width: 100vw;
    min-height: 100vh;
    background: rgb(246, 246, 246);

    .top-bar {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        width: 100%;
        height: 50px;
        z-index: 1;

        .back-icon {
            margin-left: 10px;
        }

        .title {
            flex: 1;
            text-align: center;
            font-size: 18px;
            color: #fff;

            &.black {
                color: black;
            }
        }

        .search {
            margin-right: 10px;
        }
    }

    .top-box {
        position: relative;
        margin-bottom: 5vh;
        width: 100%;
        height: 47vh;
        background-position: center;
        background-size: cover;

        .skip-box {
            width: 100%;
            height: 30vh;
            // background: black;
        }

        .top-class {
            position: absolute;
            left: 0;
            bottom: -3vh;
            margin: 0 4vw;
            width: 92vw;
            height: 20vh;
            background: #fff;
            border-radius: 10px;

            .up-box {
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                margin-top: 2vh;

                .official-item {
                    padding: 2px 0;
                    height: 24px;
                    text-align: center;

                    .title {
                        display: flex;
                        align-items: center;
                        font-size: 15px;

                        span {
                            color: rgba(128, 128, 128, .7);
                        }

                        img {
                            margin-right: 3px;
                            width: 18px;
                            height: 18px;
                        }
                    }
                }

            }

            .down-box {
                display: flex;
                flex-direction: row;
                justify-content: center;
                flex-wrap: nowrap;
                margin-top: 2vh;
                width: 100%;
                overflow-x: scroll;
                overflow-y: hidden;

                &::-webkit-scrollbar {
                    display: none;
                }

                .exposure-item {
                    margin: 0 1vw;
                    float: left;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: 12vh;

                    img {
                        margin-bottom: 1vh;
                        width: 50px;
                        height: 50px;
                    }

                    .title {
                        width: 55px;
                        text-align: center;
                    }



                }
            }
        }
    }

    .center-box {
        width: 100%;

        .hot-class {
            display: flex;
            justify-content: center;
            width: 100%;
            height: 16vh;
            margin-bottom: 3vh;

            .hot-item {
                // width: 33%;
                height: 100%;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>