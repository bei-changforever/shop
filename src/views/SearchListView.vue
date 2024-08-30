<template>
    <div class="search-list">
        <div class="top-bar">
            <div class="sticky-bar">
                <SearchBar></SearchBar>
                <div class="class-bar" :class="{ fixed: classFxied }">
                    <van-dropdown-menu active-color="#ff4a00">
                        <van-dropdown-item v-model="keySort" :options="sortArr" :title="sortTitle"
                            :title-class="{ highlight: keySort == 0 || keySort == 4 }" @change="selClassFun" />
                    </van-dropdown-menu>
                    <div class="sales" :class="{ highlight: keySort == 1 }" @click="selClassFun(1)">销量</div>
                    <div class="class-price" :class="{ highlight: keySort == 2 || keySort == 3 }" @click="selPriceFun()">价格
                        <div class="up" :class="{ highlight: keySort == 2 }"></div>
                        <div class="down" :class="{ highlight: keySort == 3 }"></div>
                    </div>

                    <div class="filter">
                        筛选
                    </div>

                    <div class="filter-tag" v-show="isFilter"></div>

                </div>
            </div>
        </div>

        <div class="hot-class">
            <div class="hot-item" :class="{ select: selHot == index }" v-for="(hot, index) in hotClassArr"
                :key="hot.class_name" @click="selHotFun(index, hot.class_name)">
                <img :src="hot.class_icon">
                <p class="name van-ellipsis">{{ hot.class_name }}</p>
            </div>
        </div>

        <div class="center-box">
            <van-list v-model="loading" :finished="finished" :immediate-check="false" loading-text="加载更多..."
                finished-text="没有更多商品了" @load="loadMoreFun">
                <ListItem v-for="item in listDataArr" :item="item.body"></ListItem>
            </van-list>
        </div>

        <van-back-top />
    </div>
</template>

<script setup lang="ts">
// 节流
import { throttle } from "underscore";
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import SearchBar from '../components/search/SearchBar.vue'
import ListItem from '../components/search/ListItem.vue'
import { searchListApi } from "../request/searchApis/index";

const route = useRoute();

// 监听做滚动动画
const classFxied = ref(false);
let last_fix = 0;
const windowScroll = throttle(() => {
    let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop

    if (scrollTop >= 300 && scrollTop < last_fix) {
        classFxied.value = true
    }

    if (scrollTop < 200) {
        classFxied.value = false
    }
    last_fix = scrollTop
    // console.log(scrollTop)
}, 200)

// 请求的数据
// 推荐hot
interface hotClassArr {
    class_name: string,
    class_icon: string,
};
const hotClassArr = ref<hotClassArr[]>([]);
const selHot = ref<number>(-1);
// List列表数据
interface listDataArr {
    body: object
};
const listDataArr = ref<listDataArr[]>([]);
// 根据路由传参做数据请求
let keyStr: string = '';
let keyIndex: number = 1;
// let keySize: string | number = 20;
const keySort = ref<number>(0);
const sortArr = ref([
    { text: '综合排序', value: 0 },
    { text: '新品优先', value: 4 },
]);
const sortTitle = computed(() => {
    let res = ''

    if ([0, 1, 2, 3].includes(keySort.value)) {
        res = '综合'
    }

    if (keySort.value == 4) {
        res = '新品'
    }

    return res
});
const keyTag = ref<number>(0);
// 初始化请求
const searchListDataInitFun = async () => {
    let paramsObj = {
        key: keyStr,
        index: keyIndex,
    };
    let { data } = await searchListApi(paramsObj);
    hotClassArr.value = data.data.classes;
    listDataArr.value = data.data.list_v2;
    console.log(data.data);
};
// 选择商品条件
const selClassFun = async (id?: number) => {
    keyIndex = 1;
    if (id) {
        keySort.value = id;
    };

    // console.log(keySort.value);

    let temObj = {
        key: keyStr,
        index: keyIndex,
        sort: keySort.value,
        tag: keyTag.value
    };
    console.log(temObj);

    let { data } = await searchListApi(temObj);

    listDataArr.value = []
    listDataArr.value = data.data.list_v2;

    loading.value = false;
    finished.value = false;
};
// 选择价格排序方法
const selPriceFun = () => {
    if (keySort.value == 2) {
        keySort.value = 3
    } else if (keySort.value == 3) {
        keySort.value = 2
    } else {
        keySort.value = 2
    }

    selClassFun();
};
// 筛选 tag
const isFilter = ref(false);


// 热门推荐选择
const selHotFun = async (id: number, text: string) => {
    if (keyStr == text) {
        return
    };
    selHot.value = id;
    keyStr = text;
    selClassFun();
};
// List列表
const loading = ref(false);
const finished = ref(false);
interface searchListApi {
    data: {
        data: {
            list_v2: listDataArr[]
        }
    }
};
// 加载更多方法
const loadMoreFun = throttle(async () => {
    if (listDataArr.value.length > 0) {
        console.log('加载更多');
        keyIndex = keyIndex + 1
        let paramsObj = {
            key: keyStr,
            index: keyIndex,
            sort: keySort.value,
            tag: keyTag.value
        };

        searchListApi(paramsObj, true)
            .then(({ data }: searchListApi) => {
                // console.log(data.data.list_v2);
                let newData: listDataArr[] = data.data.list_v2;
                if (newData.length == 0) {
                    finished.value = true;
                }

                listDataArr.value.push(...newData);

                setTimeout(() => {
                    loading.value = false;
                }, 2000);
            })
            .catch(() => {
                finished.value = true;
            });
    }
}, 2000);

// 初始化请求参数
const dataInitFun = () => {
    hotClassArr.value = [];
    listDataArr.value = [];
    keySort.value = 0;
    keyTag.value = 0;
    keyIndex = 1;
    selHot.value = -1;
    loading.value = false;
    finished.value = false;
};

watch(() => route.query,
    async () => {
        if (route.query.key) {

            keyStr = route.query.key as string;
            dataInitFun();
            searchListDataInitFun();
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
.search-list {
    width: 100%;
    height: 150vh;
    background: #fff;

    .top-bar {
        position: static;
        width: 100%;
        height: 28vh;
        background: rgb(244, 244, 244);

        .sticky-bar {
            position: sticky;
            top: 0;
            width: 100%;
            height: 12vh;
            background: rgb(250, 250, 250);
            z-index: 999;

            .class-bar {
                display: flex;
                align-items: center;
                width: 100%;
                height: 6vh;
                background: #fff;

                &.fixed {
                    position: fixed;
                    top: 0;
                    left: 0;
                }

                .sales,
                .class-price,
                .filter {
                    // height: 100%;
                    width: 23vw;
                    text-align: center;
                    font-size: 15px;
                }

                .class-price {
                    position: relative;

                    &.highlight {
                        color: #ff4a00;
                    }

                    .up {
                        position: absolute;
                        top: -1vh;
                        right: 1vh;
                        width: 0;
                        height: 0;
                        border: 5px solid #000;
                        border-top-color: transparent;
                        border-bottom-color: gray;
                        border-left-color: transparent;
                        border-right-color: transparent;

                        &.highlight {
                            border-bottom-color: #ff4a00;
                        }
                    }

                    .down {
                        position: absolute;
                        bottom: -1vh;
                        right: 1vh;
                        width: 0;
                        height: 0;
                        border: 5px solid #000;
                        border-top-color: gray;
                        border-bottom-color: transparent;
                        border-left-color: transparent;
                        border-right-color: transparent;

                        &.highlight {
                            border-top-color: #ff4a00;
                        }
                    }
                }
            }
        }
    }

    .hot-class {
        position: absolute;
        top: 12vh;
        left: 0;
        padding: 2vw;
        width: 100vw;
        height: 16vh;
        overflow-x: scroll;
        white-space: nowrap;
        // border: 1px solid red;

        &::-webkit-scrollbar {
            display: none;
        }

        .hot-item {
            display: inline-block;
            margin-left: 8px;
            width: 18vw;
            height: 100%;
            background: #fff;

            // border: 1px solid;
            &.select {
                color: orange;
            }

            img {
                width: 100%;
                // height: 100%;
            }

            .name {
                text-align: center;
            }
        }
    }
}
</style>

<style lang="scss">
.highlight {
    color: #ff4a00;
}

.van-dropdown-menu {
    height: 6vh;
    width: 100px;

    .van-dropdown-menu__bar {
        height: 6vh;
    }
}
</style>