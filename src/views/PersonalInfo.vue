<template>
    <div class="personal-info">
        <div class="top">
            <span class="back-icon" @click="backFun">
                <img src="../assets/images/back_white_36px.png">
            </span>
        </div>

        <div class="user-info">
            <div class="head-portraits">
                <img :src="headSrc">
            </div>

            <p class="nickname">
                <span class="name">{{ userInfo.nickname }}</span>
                <span class="mi-num">成长值{{ userInfo.mi_num }}</span>
            </p>

            <div v-if="userInfo.belong_place" class="belong-place"><span>{{ userInfo.belong_place }}</span></div>

            <ul class="customize-list">
                <li>
                    <span>{{ userInfo.following_num }}</span>关注
                </li>
                <li>
                    <span>{{ userInfo.follower_num }}</span>粉丝
                </li>
                <li>
                    <span>{{ userInfo.praised_num }}</span>获赞
                </li>
                <li>
                    <span>{{ userInfo.question_num }}</span>问答
                </li>
            </ul>

            <div class="sel-btn">
                <div class="btn" :class="{ sel: selNum == 1 }" @click="selFun(1)">动态</div>
                <div class="btn" :class="{ sel: selNum == 2 }" @click="selFun(2)">赞过</div>
            </div>

        </div>

        <div class="list-container" v-show="selNum == 1">

            <van-list v-model="loading" :finished="finished" :immediate-check="false" loading-text="加载更多..."
                finished-text="没有更多了" @load="loadMoreFun">

                <div v-for="s in stateList" class="container-item" @click="skipDetail(s)">
                    <div class="nickname">
                        <img :src="s.icon">

                        <div>
                            <p>{{ s.nickname }}</p>
                            <p>{{ s.create_time }} {{ s.belong_place }}</p>
                        </div>
                    </div>

                    <div class="content van-multi-ellipsis--l3">
                        {{ s.content }}
                    </div>

                    <div class="pic_list" v-if="s.pic_list.length > 0">
                        <img :src="s_p.img" v-for="s_p in s.pic_list">
                    </div>

                    <div class="tag_list">
                        <div v-for="s_tag in s.tag_list" class="tag">{{ s_tag.tag }}</div>
                    </div>
                </div>

            </van-list>

        </div>

        <div class="list-container" v-show="selNum == 2">

            <van-list v-model="loading" :finished="finished" :immediate-check="false" loading-text="加载更多..."
                finished-text="没有更多了" @load="loadMoreFun">

                <div v-for="s in likedList" class="container-item" @click="skipDetail(s)">
                    <div class="nickname">
                        <img :src="s.icon">

                        <div>
                            <p>{{ s.nickname }}</p>
                            <p>{{ s.create_time }} {{ s.belong_place }}</p>
                        </div>
                    </div>

                    <div class="content van-multi-ellipsis--l3">
                        {{ s.content }}
                    </div>

                    <div class="pic_list" v-if="s.pic_list.length > 0">
                        <img :src="s_p.img" v-for="s_p in s.pic_list">
                    </div>

                    <div class="tag_list">
                        <div v-for="s_tag in s.tag_list" class="tag">{{ s_tag.tag }}</div>
                    </div>
                </div>

            </van-list>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { InfoApi, DynamicListApi, PraisedListApi } from "@/request/personalApis/index";
import { reqImageArr } from "../utils/reqImageArr.js";
// 节流
import { throttle } from "underscore";
const router = useRouter();
const route = useRoute();

const backFun = () => {
    router.go(-1);
};


const skipDetail = (item: any) => {
    // console.log(item.content_type);
    if ([1, 2, 3, 99, 100].includes(Number(item.content_type))) {
        router.push({ path: '/detail', query: { id: item.id, type: item.content_type } });
    } else if (item.content_type == 6) {
        router.push({
            path: '/detail',
            query: {
                id: item.question.q_id,
                type: item.content_type
            }
        });
    }
};

interface userInfo {
    avatar?: '',
    nickname?: '',
    mi_num?: '',
    belong_place?: '',
    following_num?: '',
    follower_num?: '',
    praised_num?: '',
    question_num?: '',
}
const userInfo = ref<userInfo>({})

const headSrc = computed(() => {
    if (userInfo.value.avatar) {
        return userInfo.value.avatar
    }

    return reqImageArr[4]
});

const selNum = ref(1);

const selFun = (s_id: number) => {
    if (selNum.value == s_id) {
        return
    };

    selNum.value = s_id;
    initFun();

    if (selNum.value == 1) {
        state()
    }

    if (selNum.value == 2) {
        liked()
    }
    console.log('执行选择');

};

// 动态
interface Item {
    icon?: '',
    nickname?: '',
    create_time?: '',
    belong_place?: '',
    content?: '',
    pic_list: [
        {
            img?: '',
        }
    ],
    tag_list: [
        {
            tag?: '',
        }
    ]
};
const stateList = ref<Array<Item>>([]);
let stateAfter = '';
const state = async () => {
    DynamicListApi({ to_mid: route.query.mid as string, after: stateAfter })
        .then(({ data }) => {
            let newData = data.data.dynamic_list as Array<Item>;
            stateAfter = data.data.after;

            if (newData.length == 0) {
                finished.value = true;
                return
            }

            stateList.value.push(...newData);
            console.log(data);
            console.log(stateList.value);

            setTimeout(() => {
                loading.value = false;
            }, 2000);
        })
        .catch(() => {
            finished.value = true;
        });
};

// 赞过
const likedList = ref<Array<Item>>([]);
let likedAfter = '';
const liked = async () => {
    PraisedListApi({ to_mid: route.query.mid as string, after: likedAfter })
        .then(({ data }) => {

            console.log(data);

            let newData = data.data.praised_list as Array<Item>;
            likedAfter = data.data.after;

            if (newData.length == 0) {
                finished.value = true;
                return
            }

            likedList.value.push(...newData);

            console.log(data);
            console.log(likedList.value);

            setTimeout(() => {
                loading.value = false;
            }, 2000);
        })
        .catch(() => {
            finished.value = true;
        });
};

// 加载更多
const loading = ref(false);
const finished = ref(false);

const loadMoreFun = throttle((async () => {
    if (selNum.value == 1) {
        state()
    };

    if (selNum.value == 2) {
        liked()
    };

}), 2000);

const initFun = () => {
    stateList.value = []
    likedList.value = []
    stateAfter = ''
    likedAfter = ''
    loading.value = false
    finished.value = false
};

watch(
    () => route.query,
    async () => {
        if (route.path == '/personalinfo' && route.query.mid) {
            selNum.value = 1
            userInfo.value = {}
            initFun()

            let { data } = await InfoApi({ to_mid: route.query.mid as string });
            userInfo.value = data.data;
            // console.log(data.data);

            state()
        }
    },
    {
        immediate: true
    });
</script>

<style scoped lang="scss">
.personal-info {
    padding-top: 3vh;
    width: 100vw;
    min-height: 100vh;
    background: url('../assets/images/info_bg.png') no-repeat;
    background-size: cover;

    .top {
        padding: 0 5vw;
        height: 35px;
        width: 100%;
    }

    .user-info {
        position: relative;
        margin-top: 6vh;
        padding: 40px 35px 15px 35px;
        min-height: 150px;
        width: 100%;
        border-radius: 20px 20px 0 0;
        background: #fff;

        .head-portraits {
            position: absolute;
            top: -4vh;
            left: 15%;
            width: 15vw;
            height: 15vw;
            border-radius: 999px;
            background: #fff;
            box-shadow: 0px 2px 2px 1px #ff4a00;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .nickname {
            margin-bottom: 10px;

            .name {
                margin-right: 10px;
                font-size: 16px;
                font-weight: 600;
            }

            .mi-num {
                padding: 1px 4px;
                background: linear-gradient(35deg, #ffc080, #ffddb4);
                font-size: 12px;
                font-weight: 700;
                color: #a74406;
                border-radius: 10px;
            }
        }

        .belong-place {
            margin-bottom: 12px;

            span {
                display: block;
                padding: 1px;
                height: 18px;
                width: 30px;
                background: rgba(255, 89, 52, .7);
                color: #fff;
                line-height: 15px;
                font-size: 12px;
                text-align: center;
            }
        }

        .customize-list {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 15px;

            li {
                span {
                    margin-right: 3px;
                    font-size: 18px;
                    font-weight: 600;
                }
            }
        }

        .sel-btn {
            display: flex;
            flex-direction: row;
            justify-content: space-around;

            .btn {
                font-size: 16px;
                font-weight: 700;

                &.sel {
                    position: relative;
                    color: #ff5934;

                    &::before {
                        position: absolute;
                        content: '';
                        bottom: -8px;
                        left: 15%;
                        width: 20px;
                        border-bottom: 4px solid #ff5934;
                        border-radius: 50px;
                    }
                }
            }
        }
    }

    .list-container {
        margin-top: 2px;
        width: 100%;
        min-height: 61vh;
        background: #fff;

        .container-item {
            padding: 10px 20px;
            border-bottom: 3px solid rgba(128, 128, 128, .3);

            .nickname {
                display: flex;
                margin-bottom: 10px;

                img {
                    margin-right: 5px;
                    width: 8vw;
                    border-radius: 999px;
                }
            }

            .content {
                margin-bottom: 5px;
                font-size: 14px;
                line-height: 20px;
            }

            .pic_list {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-bottom: 5px;
                width: 100%;

                img {
                    margin-right: 1px;
                    width: 173px;
                    height: 173px;
                    border-radius: 10px;
                }
            }

            .tag_list {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;

                .tag {
                    margin-right: 5px;
                    padding: 1px 2px;
                    background: rgba(128, 128, 128, .1);
                }
            }
        }
    }
}
</style>