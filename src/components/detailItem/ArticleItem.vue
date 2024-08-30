<template>
    <!-- 文章 -->
    <div class="article-item">
        <div class="main-box">
            <p class="text-title">{{ dataView.title }}</p>

            <div class="userinfo">
                <img :src="dataView.icon">

                <div class="text-inf">
                    <span class="nickname">{{ dataView.nickname }}</span>
                    <span class="create-time">{{ dataView.create_time }}</span>
                </div>
            </div>

            <div class="article" v-html="dataView.article_h5"></div>
        </div>


        <CommentList :id="id" :type="type"></CommentList>

        <CommentBotNav :id="id"></CommentBotNav>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { comment_detail } from "@/request/projectApis/communityApi";
import CommentList from './CommentList.vue';
import CommentBotNav from './CommentBotNav.vue'
const router = useRouter();
const route = useRoute();

const props = defineProps<{
    id: string | number,
    type: string | number
}>();

interface dataView {
    title?: string,
    icon?: string,
    nickname?: string,
    create_time?: string,
    article_h5?: string
};
// 页面数据
const dataView = ref<dataView>({});

watch(
    () => props.id,
    async () => {
        if (props.id) {
            let { data } = await comment_detail(props.id, props.type)
            console.log(data.data);
            dataView.value = data.data
        }
    },
    {
        // 页面初始化后立即调用
        immediate: true
    });
</script>

<style scoped lang="scss">
.article-item {
    margin-top: 35px;
    padding-bottom: 50px;
    width: 100vw;
    background: rgb(242, 242, 242);

    .main-box {
        .text-title {
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 2px;
            margin-bottom: 15px;
        }


    }
}
</style>

<style lang="scss">
.main-box {
    .article {
        margin-top: 20px;

        p {
            font-size: 16px;
            line-height: 30px;
        }

        img {
            width: 100%;
        }
    }
}
</style>