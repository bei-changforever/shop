<template>
    <div class="search-bar">
        <span class="back-icon" @click="backFun"><img src="@/assets/images/back_gray.png"></span>
        <div class="text-box">
            <van-search v-model="searchValue" left-icon="none" placeholder="搜索商品名称" @search="onSearch"
                @update:model-value="searchSuggestion" @focus="searchFocus" @blur="searchBlur" />
        </div>
        <span class="search-icon" @click="onSearch"><img src="@/assets/images/search_gray.png"></span>

        <div class="suggest-box" v-show="isSuggestion">
            <p v-for="s in suggestionArr" :key="s.title" @click="searchSuggestionStr(s.title)">{{ s.title }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, inject, defineEmits, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { suggestionApi } from "@/request/searchApis/index";
// 返回
const route = useRoute()
const router = useRouter();
const backFun = () => {
    searchValue.value = ''
    router.go(-1);
};
const emit = defineEmits(['refHistoryArr'])
// 搜索
const searchValue = ref<string>('');
const onSearch = () => {
    if (!searchValue.value.trim()) {
        console.log('搜索不能为空');
        searchValue.value = ''
        return
    };
    searchValue.value = searchValue.value.trim();

    let temArr = JSON.parse(localStorage.search_history)
    // 判断搜索内容是否存在历史记录中
    if (!temArr.includes(searchValue.value)) {
        temArr.unshift(searchValue.value)
    } else {
        // 存在则移到数组首项
        temArr.splice(temArr.indexOf(searchValue.value), 1)

        temArr.unshift(searchValue.value)
    }
    localStorage.search_history = JSON.stringify(temArr)
    emit('refHistoryArr')

    router.push({ path: '/search/list', query: { key: searchValue.value } })
    // console.log('搜索', searchValue.value);
};

// 搜索建议
interface suggestionArr {
    title: string
};
const suggestionArr = ref<suggestionArr[]>([])
const isSuggestion = ref(false)
const searchSuggestion = async () => {
    if (!searchValue.value.trim()) {
        suggestionArr.value = []
        return
    };
    // console.log('建议');
    let { data } = await suggestionApi(searchValue.value.trim());
    let temArr = data.data.list

    suggestionArr.value = []
    suggestionArr.value.push(...temArr)
    // console.log(suggestionArr.value);
};
// 搜素框获得焦点时触发
const searchFocus = () => {
    isSuggestion.value = true
    console.log('显示搜索建议');
};
// 搜素框失去焦点时触发
let timer: null | void | number = null
const searchBlur = () => {
    if (timer) {
        clearTimeout(timer)
        timer = null
    };
    timer = setTimeout(() => {
        isSuggestion.value = false
        console.log('隐藏搜索建议');
    }, 300);
};
const searchSuggestionStr = (str: string) => {
    // console.log(str);
    searchValue.value = str
    onSearch()
};

interface infStr {
    value: string
};
let infStr: infStr | undefined = inject('infStr');
const infSearchFun = () => {
    searchValue.value = infStr?.value || ''

    onSearch()
};
// 暴露方法
defineExpose({ infSearchFun })

watch(() => route.query,
    () => {
        if (route.query.key) {
            searchValue.value = route.query.key as string
        }
    },
    {
        immediate: true
    });
</script>

<style lang="scss" scoped>
.search-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    background: rgb(242, 242, 242);

    .back-icon {
        margin: 0 15px;
        width: 24px;
        height: 24px;
    }

    .text-box {
        position: relative;
        flex: 1;
        height: 25px;
        background-color: #fff;
        font-size: 16px;
        line-height: 25px;
        overflow: hidden;
    }

    .search-icon {
        margin: 0 15px;
        width: 24px;
        height: 24px;
    }

    .suggest-box {
        position: absolute;
        top: 35px;
        left: 15vw;
        width: 70%;
        background: #fff;
        border: 1px solid rgba(128, 128, 128, 0.3);

        p {
            height: 28px;
            font-size: 16px;
            line-height: 28px;
            text-indent: 10px;
        }
    }
}
</style>

<style lang="scss">
.van-search {
    padding: 0;
    height: 20px;
    background: #fff !important;

    .van-search__content {
        margin: 0;
        padding-left: 5px;
        height: 25px;
        background: #fff;

        .van-cell {
            height: 25px;
        }
    }

    input {
        height: 30px;
        font-size: 16px;
        color: black;
        background: #fff !important;
    }
}
</style>