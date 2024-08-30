<template>
    <!-- 买家秀 -->
    <div class="show-item">
        <div class="good-message" @click="skipProduct(EntityCircle.id)" v-if="EntityCircle">
            <div class="message">
                <img :src="EntityCircle?.img" class="good-img">
                <span class="good-name">{{ EntityCircle?.name }}</span>
                <span class="hot">{{ EntityCircle?.hot }}热度</span>
            </div>
        </div>

        <div class="main-box">
            <div class="userinfo">
                <img :src="dataView.icon">

                <div class="text-inf">
                    <span class="nickname">{{ dataView.nickname }}</span>
                    <span class="create-time">{{ dataView.create_time }}</span>
                </div>
            </div>

            <div class="content">
                {{ dataView.content }}
            </div>

            <div class="imgs" v-if="dataView.pic_list && dataView.pic_list.length > 0">
                <img :src="img.img" v-for="img in dataView.pic_list" @click="showBigImg(img.img)">
            </div>
        </div>

        <CommentList :id="id" :type="100"></CommentList>
        
        <CommentBotNav :id="id"></CommentBotNav>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { comment_detail } from "@/request/projectApis/communityApi";
import { showImagePreview } from 'vant';
import CommentList from './CommentList.vue';
import CommentBotNav from './CommentBotNav.vue'
const router = useRouter();
const route = useRoute();

const props = defineProps<{
    id: string | number
}>();

interface dataView {
    icon?: '',
    avatar?: '',
    nickname?: '',
    create_time?: '',
    entity_circle: {
        hot?: '',
        id: number,
        img?: '',
        name?: ''
    },
    content?: '',
    pic_list?: [{
        img: string
    }]
};
// 页面数据
const dataView = ref<dataView>({
    entity_circle: {
        id: 0,
    }
});

// 跳转商品详情页
const skipProduct = (id?: number) => {
    router.push({ path: '/product', query: { id } });
};

const showBigImg = (url: string) => {
    showImagePreview({
        images: [url],
        showIndex: false,
    });
};

// 商品信息类型2
const EntityCircle = computed(() => {
    return dataView.value.entity_circle
});

watch(
    () => props.id,
    async () => {
        if (props.id) {
            let { data } = await comment_detail(props.id, 100)
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
.show-item {
    margin-top: 14vh;
    padding-bottom: 50px;
    background: rgb(242, 242, 242);

    .good-message {
        .message {
            .hot {
                margin-right: 10px;
                color: gray;
            }
        }
    }

    .main-box {
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
    }
}
</style>
