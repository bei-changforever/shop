<template>
    <div class="search-view">
        <SearchBar ref="SearchBarComp" @refHistoryArr="initHistoryArr"></SearchBar>

        <div class="center-box">
            <div class="search-history" v-show="historyArr.length">
                <div class="title">
                    <p>搜索历史</p>
                    <span :class="{ bounce: isBounce }" @click="deleteHistory"><img
                            src="@/assets/images/delete_icon.png"></span>
                </div>

                <div class="history-inf">
                    <div v-for="h in historyArr" :key="h" class="inf-item" @click="infSearch(h)">
                        {{ h }}
                    </div>
                </div>
            </div>

            <div class="search-find">
                <div class="title">
                    <p>搜索发现</p>
                </div>

                <div class="find-inf">
                    <div v-for="f in findArr" :key="f.desc" class="inf-item">
                        <span @click="infSearch(f.desc)">{{ f.desc }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onActivated, provide, onMounted } from "vue";
import { showConfirmDialog } from 'vant';
import { hotSearchApi } from "../request/searchApis/index";

// 调用搜索框组件 及 方法
import SearchBar from '../components/search/SearchBar.vue';
const SearchBarComp = ref();
const infStr = ref('')
provide('infStr', infStr)
const infSearch = (inf: string) => {
    infStr.value = inf
    SearchBarComp.value.infSearchFun()
    initHistoryArr()
};


// 搜索历史
const historyArr = ref([])
// 初始化搜索记录
const initHistoryArr = () => {
    if (!localStorage.search_history) {
        localStorage.search_history = JSON.stringify([])
    }
    historyArr.value = JSON.parse(localStorage.search_history)
    // console.log('初始化搜索记录');
};

onActivated(() => {
    initHistoryArr()
})

watch(() => [historyArr.value], () => {
    // console.log('搜索历史发生改变', historyArr.value);
    // localStorage.setItem('search_history', historyArr._rawValue)
    localStorage.search_history = JSON.stringify(historyArr.value)
}, {
    deep: true
}
);

// 搜索发现
interface findArr {
    desc: string
};
const findArr = ref<findArr[]>([])

// 删除
const isBounce = ref(false);
// 删除搜索历史记录
let timer: null | void | number = null
const deleteHistory = () => {
    if (!isBounce.value) {
        isBounce.value = true

        if (timer) {
            clearTimeout(timer)
            timer = null
        };

        timer = setTimeout(() => {
            isBounce.value = false
            // console.log('结束动画');
        }, 1500);

        showConfirmDialog({
            message:
                '是否删除全部搜索历史?',
        })
            .then(() => {
                // on confirm
                historyArr.value = []
                console.log('删除搜索历史记录');
            })
            .catch(() => {
                // on cancel
                console.log('反悔，啥都不干');
            });
    }
};

onMounted(async () => {
    let { data } = await hotSearchApi();
    let temFindArr = data.data.discover_list;
    findArr.value.push(...temFindArr);
    // console.log(findArr.value);
})
</script>

<style lang="scss" scoped>
.search-view {
    width: 100%;
    height: 100%;
    background: #fff;

    .center-box {
        margin: 25px 20px;
        // width: 100%;

        .search-history {
            margin-bottom: 2vh;
            width: 89vw;

            .title {
                // border-bottom: 1px solid;

                p {
                    display: inline-block;
                    width: 200px;
                    height: 18px;
                    letter-spacing: .5px;
                    font-size: 16px;
                    font-weight: 600;
                }

                span {
                    float: right;
                    width: 20px;
                    height: 20px;

                    &.bounce {
                        animation: bounce 1s;
                    }
                }

                @keyframes bounce {
                    0% {}

                    30% {
                        transform: translateY(-20%) rotateZ(15deg)
                    }

                    40% {
                        transform: translateY(-45%) rotateZ(-15deg);
                    }

                    45% {
                        transform: translateY(-55%) rotateZ(15deg);
                    }

                    50% {
                        transform: translateY(-45%) rotateZ(0deg) scale(1.2);
                    }

                    55% {
                        transform: translateY(-55%) rotateZ(-15deg);
                    }

                    60% {
                        transform: translateY(-45%) rotateZ(15deg);
                    }

                    65% {
                        transform: translateY(-20%) rotateZ(-15deg);
                    }

                    100% {
                        transform: translateY(0);
                    }
                }
            }

            .history-inf {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                flex-wrap: wrap;
                margin: 2vh 2vh 0 2vh;
                // width: 100%;
                max-height: 15vh;
                overflow: hidden;

                .inf-item {
                    margin: 0 10px 10px 0;
                    padding: 2px 10px;
                    height: 25px;
                    border-radius: 15px;
                    font-size: 12px;
                    line-height: 25px;
                    color: black;
                    background-color: rgb(245, 245, 245);
                }
            }
        }

        .search-find {
            width: 89vw;

            .title {

                p {
                    display: inline-block;
                    width: 200px;
                    height: 18px;
                    letter-spacing: .5px;
                    font-size: 16px;
                    font-weight: 600;
                }
            }

            .find-inf {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                flex-wrap: wrap;
                margin: 0vh 2vh;
                // width: 100%;

                .inf-item {
                    height: 30px;
                    width: 50%;
                    line-height: 30px;

                    span {
                        font-size: 13px;
                    }
                }
            }
        }

    }
}
</style>

