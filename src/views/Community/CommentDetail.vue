<template>
    <div class="com-detail">

        <div class="top-box">
            <div class="fix-top">
                <p class="title">{{ viewTitle }}</p>
                <span class="back-icon" @click="backFun"><img src="@/assets/images/back_gray.png"></span>
            </div>
        </div>


        <div class="comment-box">
            <!-- 内容 -->
            <ContentItem v-if="viewType == 1" :id="viewID"></ContentItem>
            <!-- 文章 -->
            <ArticleItem v-if="viewType == 2 || viewType == 3" :id="viewID" :type="viewType"></ArticleItem>
            <!-- 投票 -->
            <VoteItem v-if="viewType == 5"></VoteItem>
            <!-- 问题 -->
            <ProblemItem v-if="viewType == 6" :id="viewID"></ProblemItem>
            <!-- 视频 -->
            <VideoItem v-if="viewType == 99" :id="viewID"></VideoItem>
            <!-- 买家秀 -->
            <ShowItem v-if="viewType == 100" :id="viewID"></ShowItem>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ArticleItem from "@/components/detailItem/ArticleItem.vue";
import ContentItem from "@/components/detailItem/ContentItem.vue";
import ProblemItem from "@/components/detailItem/ProblemItem.vue";
import ShowItem from "@/components/detailItem/ShowItem.vue";
import VideoItem from "@/components/detailItem/VideoItem.vue";
import VoteItem from "@/components/detailItem/VoteItem.vue";
const router = useRouter();
const route = useRoute();

const backFun = () => {
    router.go(-1);
};
// 跳转商品详情页
const skipProduct = (id: string | number) => {
    router.push({ path: '/product', query: { id } });
};

// 页面类型 id
const viewType = ref<string | number>(0);
const viewID = ref<string | number>(0);

interface dataView {
    product_name: string,
    product_img_url: string,
    product_id: number,
    entity_circle: {
        id: number,
        img: string,
        name: string
    },
    question: string
};

const viewTitle = computed(() => {
    let resStr: { [key: number | string]: string } = {
        1: '内容详情',
        2: '文章详情',
        3: '文章详情',
        5: '投票详情',
        6: '问题详情',
        99: '视频详情',
        100: '买家秀详情'
    }

    return resStr[viewType.value]
});

watch(() => route.query,
    () => {
        if (route.query.id && route.query.type && route.path == '/detail') {
            console.log(route.query);
            viewID.value = route.query.id as string
            viewType.value = route.query.type as string
        }
    },
    {
        immediate: true
    });

</script>

<style scoped lang="scss">
.com-detail {
    position: relative;
    width: 100vw;
    // min-height: 100vh;
    // height: 200vh;

    .top-box {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;
        // border: 1px solid black;

        .fix-top {
            display: flex;
            flex-direction: row;
            align-items: center;
            align-content: center;
            padding: 5px 2vw;
            height: 35px;
            width: 100%;
            background: rgb(242, 242, 242);

            .title {
                flex: 1;
                text-align: center;
                font-size: 14px;
                font-weight: 600;
                letter-spacing: 2px;
                color: #ff4a00;
            }

            .back-icon {
                position: absolute;
                top: center;
                left: 10px;
            }
        }
    }
}
</style>

<style lang="scss">
.good-message {
    position: fixed;
    top: 35px;
    left: 0;
    padding: 1vh 5vw;
    width: 100%;
    background: rgb(242, 242, 242);

    .message {
        display: flex;
        align-items: center;
        background: #fff;

        .good-img {
            width: 10vw;
        }

        .good-name {
            flex: 1;
            margin-left: 20px;
            font-size: 14px;
            font-weight: 600;
        }
    }
}

.main-box {
    padding: 10px 20px;
    width: 100%;
    background: #fff;

    .userinfo {
        display: flex;

        img {
            margin-right: 10px;
            width: 10vw;
            border-radius: 999px;
        }

        .text-inf {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            font-size: 12px;

            .nickname {}

            .create-time {
                color: gray;
            }
        }

    }

    .content {
        margin-top: 10px;
        line-height: 30px;
        font-size: 16px;
    }

    .imgs {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        img {
            width: 33%;
            height: 115px;
            margin-left: 1px;
            margin-bottom: 3px;
            border-radius: 10px;
        }
    }

    .van-swipe__track {
        width: 100vw;
    }

    .van-image__img {
        width: 100vw;
    }
}
</style>