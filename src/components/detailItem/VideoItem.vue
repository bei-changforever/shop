<template>
    <!-- 视频 -->
    <div class="video-item">

        <div class="main-box">

            <div class="userinfo">
                <img :src="dataView.author_img">

                <div class="text-inf">
                    <span class="nickname">{{ dataView.author_nickname }}</span>
                    <span class="create-time" v-if="dataView.create_time">{{ dataView.create_time }}</span>
                </div>
            </div>

            <div class="moment-title">
                {{ dataView.moment_title }}
            </div>

            <div class="video-box">
                <video :src="dataView.play_url" controls></video>
            </div>


        </div>

        <CommentList :id="id" :type="99"></CommentList>
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

interface dataView {
    author_img?: '',
    author_nickname?: '',
    create_time?: '',
    moment_title?: '',
    play_url?: '',
};
// 页面数据
const dataView = ref<dataView>({});

watch(
    () => props.id,
    async () => {
        if (props.id) {
            let { data } = await comment_detail(props.id, 99)
            console.log(data.data.moment_list[0]);
            dataView.value = data.data.moment_list[0]
        }
    },
    {
        // 页面初始化后立即调用
        immediate: true
    });
</script>

<style scoped lang="scss">
.video-item {
    margin-top: 35px;
    padding-bottom: 50px;
    width: 100vw;
    background: rgb(242, 242, 242);

    .main-box {
        .moment-title {
            margin-top: 10px;
            font-size: 16px;
            line-height: 30px;
        }

        .video-box {
            width: 100%;

            video {
                width: 100%;
            }
        }
    }
}
</style>