<template>
    <!-- 问题 -->
    <div class="problem-item">
        <div class="good-message" @click="skipProduct(GoodMessage.id)">
            <div class="message">
                <img :src="GoodMessage.img_url" class="good-img">
                <span class="good-name">{{ GoodMessage.name }}</span>
            </div>
        </div>

        <div class="main-box">
            <p class="question">{{ dataView.question }}</p>

            <div class="userinfo">
                <img :src="dataView.avatar">

                <div class="text-inf">
                    <span class="nickname">{{ dataView.nickname }}</span>
                    <span class="create-time" v-if="dataView.create_time">提问于 {{ dataView.create_time }}</span>
                </div>
            </div>

        </div>

        <CommentList :id="id" :type="6"></CommentList>

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
    id: string | number
}>();

// 跳转商品详情页
const skipProduct = (id: string | number) => {
    router.push({ path: '/product', query: { id } });
};

interface dataView {
    product_name: string,
    product_img_url: string,
    product_id: number,
    question: '',
    avatar?: '',
    nickname?: '',
    create_time?: ''
};
// 页面数据
const dataView = ref<dataView>({
    product_name: '',
    product_img_url: '',
    product_id: 0,
    question: ''
});


// 商品信息
const GoodMessage = computed(() => {
    let res = {
        name: '',
        img_url: '',
        id: 0
    }

    if (dataView.value.product_name && dataView.value.product_img_url && dataView.value.product_id) {
        res = {
            name: dataView.value.product_name,
            img_url: dataView.value.product_img_url,
            id: dataView.value.product_id
        }
    }

    return res
});


watch(
    () => props.id,
    async () => {
        if (props.id) {
            let { data } = await comment_detail(props.id, 6)
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
.problem-item {
    position: relative;
    margin-top: 14vh;
    padding-bottom: 50px;
    width: 100vw;
    background: rgb(242, 242, 242);

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
                margin-left: 20px;
                font-size: 14px;
                font-weight: 600;
            }
        }
    }

    .main-box {
        padding: 10px 20px;
        width: 100%;

        .question {
            margin-bottom: 10px;
            font-size: 16px;
            font-weight: 600;
            line-height: 20px;
        }

        .userinfo {
            display: flex;

            img {
                margin-right: 10px;
                // width: 10vw;
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
    }
}
</style>