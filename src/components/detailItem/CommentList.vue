<template>
    <div class="comment-list">

        <div class="comment-box">
            <p class="title">回复评论</p>

            <van-list v-model="loading" :finished="finished" :immediate-check="false" loading-text="加载更多..."
                finished-text="没有更多回复评论" @load="loadMoreFun" v-if="answerArr.length > 0">

                <div v-if="type == 1">
                    <div v-for="com in answerArr" class="comment-item">

                        <div class="user-inf">
                            <img :src="com.img" @click="skipInfo(com.mid)">
                            <span class="nickname">{{ com.nickname }} &emsp;{{ timeStrFun(com.create_time as number) }}
                                {{ com.belong_place }}</span>
                        </div>

                        <div class="text-inf">
                            <p class="answer-content">{{ com.comment }}</p>
                        </div>
                    </div>
                </div>

                <div v-if="type == 3 || type == 2">
                    <div v-for="com in answerArr" class="comment-item">

                        <div class="user-inf">
                            <img :src="com.img" @click="skipInfo(com.mid)">
                            <span class="nickname">{{ com.nickname }} &emsp;{{ timeStrFun(com.create_time as number) }}
                                {{ com.belong_place }}</span>
                        </div>

                        <div class="text-inf">
                            <p class="answer-content">{{ com.comment }}</p>
                        </div>
                    </div>
                </div>

                <div v-if="type == 6">
                    <div v-for="com in answerArr" class="comment-item">
                        <div class="user-inf">
                            <img :src="com.avatar" @click="skipInfo(com.mid)">
                            <span class="nickname">{{ com.nickname }} &emsp;{{ com.create_time }} {{ com.belong_place
                            }}</span>
                        </div>

                        <div class="text-inf">
                            <p class="answer-content">{{ com.answer_content }}</p>
                        </div>
                    </div>
                </div>

                <div v-if="type == 99">
                    <div v-for="com in answerArr" class="comment-item">
                        <div class="user-inf">
                            <img :src="com.img" @click="skipInfo(com.mid)">
                            <span class="nickname">{{ com.nickname }} &emsp;{{ com.create_time }} {{ com.belong_place
                            }}</span>
                        </div>

                        <div class="text-inf">
                            <p class="answer-content">{{ com.comment }}</p>
                        </div>
                    </div>
                </div>

                <div v-if="type == 100">
                    <div v-for="com in answerArr" class="comment-item">
                        <div class="user-inf">
                            <img :src="com.img" @click="skipInfo(com.mid)">
                            <span class="nickname">{{ com.nickname }} &emsp;{{ com.create_time }} {{ com.belong_place
                            }}</span>
                        </div>

                        <div class="text-inf">
                            <p class="answer-content">{{ com.comment }}</p>
                        </div>
                    </div>
                </div>

            </van-list>
        </div>

        <div v-if="answerArr.length == 0" class="nodata">
            <p>暂时还没有评论哦~</p>
        </div>

        <van-back-top />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { comment_list } from "@/request/projectApis/communityApi";
import { itemtimeStrFun } from "@/utils/pub-method.js";
// 节流
import { throttle } from "underscore";
const router = useRouter();
const route = useRoute();

const props = defineProps<{
    id: string | number,
    type: string | number
}>();

const skipInfo = (id: string) => {
    router.push({ path: '/personalinfo', query: { mid: id } });
}

interface answerArr {
    avatar?: '',
    img?: '',
    nickname?: '',
    create_time?: number | string,
    belong_place?: '',
    answer_content?: '',
    comment?: '',
    mid: '',
};
// 回复数组
const answerArr = ref<answerArr[]>([]);

const timeStrFun = (timeNum?: number) => {
    return itemtimeStrFun(timeNum, true)
};

const loading = ref(false);
const finished = ref(false);
let afterNum = 1;

const loadMoreFun = throttle((async () => {

    if (answerArr.value.length > 0) {

        afterNum = afterNum + 1;

        comment_list(props.id, props.type, afterNum)
            .then(({ data }) => {
                let newData = data.data.answer_list || data.data.comment_list
                // console.log(newData);

                // 记录上一次数组长度
                let lastLength = answerArr.value.length

                if (newData.length == 0) {
                    finished.value = true;
                    return
                }

                if ([1, 2, 3, 99, 100].includes(Number(props.type))) {
                    answerArr.value = newData
                }

                if (props.type == 6) {
                    answerArr.value.push(...newData);
                }

                if (answerArr.value.length == lastLength) {
                    finished.value = true;
                }

                // console.log(answerArr.value);

                setTimeout(() => {
                    loading.value = false;
                }, 2000);
            })
            .catch(() => {
                finished.value = true;
            });

    }
}), 2000)


watch(
    () => props.id,
    async () => {
        if (props.id) {
            let { data } = await comment_list(props.id, props.type);
            answerArr.value = data.data.answer_list || data.data.comment_list;

            loading.value = false;
            finished.value = false;
            afterNum = 1
            console.log(data.data);
            // console.log(answerArr.value);
        }
    },
    {
        // 页面初始化后立即调用
        immediate: true
    });
</script>

<style scoped lang="scss">
.comment-list {
    position: relative;
    width: 100%;
    min-height: 150px;
    background: #fff;

    .comment-box {
        margin-top: 10px;
        padding: 20px;
        background: #fff;

        .comment-item {
            display: flex;
            flex-direction: column;
            padding: 20px 0;
            border-bottom: 1px solid rgba(128, 128, 128, .3);

            .user-inf {
                display: flex;
                align-items: self-start;

                img {
                    margin-right: 10px;
                    width: 8vw;
                    border-radius: 999px;
                }

                .nickname {
                    font-size: 14px;
                    color: gray;
                }
            }

            .text-inf {
                margin-top: 5px;
                padding-left: 10vw;
                font-size: 16px;
                line-height: 20px;
                letter-spacing: 1px;
            }
        }
    }

    .nodata {
        position: absolute;
        top: 50%;
        left: 33%;
        font-size: 14px;
        color: gray;
        letter-spacing: 1px;
    }
}
</style>