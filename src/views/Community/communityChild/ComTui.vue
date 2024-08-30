<template>
    <!-- 推荐 -->
    <div class="content">

        <van-list :immediate-check="false" v-model:loading="loading" :finished="finished" finished-text="没有更多了"
            @load="onLoad">

            <div class="content-box" v-for="(item, index) in list">

                <div class="tuijian" v-if="(<any>item).rec_type == 9">
                    <div class="tags-img" v-if="(<any>item).poster">
                        <van-image radius="10px" :src="(<any>item).poster.img_url" />
                    </div>
                </div>

                <div class="contentlist-box" v-if="(<any>item).rec_type == 1" @click="skipDetail((<any>item).content)">

                    <div class="top">
                        <van-image width="30" round :src="(<any>item).content.icon"
                            @click.stop="skipInfo((<any>item).content.mid)" />
                        <p>{{ (<any>item).content.nickname }}</p>
                    </div>

                    <div class="question">
                        {{ (<any>item).content.content }}
                    </div>
                    <div class="img-box" v-if="(<any>item).content.pic_list">
                        <ul>
                            <li v-for="(i, index) in (<any>item).content.pic_list">
                                <van-image :src="i.img" />
                            </li>
                        </ul>
                    </div>

                    <div class="s-tag-list" v-if="(<any>item).content.tag_list">
                        <p v-for="(t, i) in (<any>item).content.tag_list">{{ t.tag }}</p>
                    </div>


                    <div class="answer" v-if="(<any>item).content.hot_comment">
                        <p>
                            <span class="ans-name">{{ (<any>item).content.hot_comment.name }}</span>
                            <span>{{ (<any>item).content.hot_comment.comment }}</span>
                        </p>
                    </div>


                    <div class="cell_btn_group" v-if="(<any>item).content">
                        <ul>
                            <li>
                                <van-icon name="share-o" />
                            </li>

                            <li>
                                <van-icon name="comment-o" />
                            </li>

                            <li>
                                <van-icon name="thumb-circle-o" />
                                &nbsp;
                                <span>{{ (<any>item).content.praise_num }}</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

        </van-list>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { home_rec } from '@/request/projectApis/communityApi'
const list = ref<object[]>([]);
const loading = ref(false);
const finished = ref(false);
const timer = ref(null)
const after = ref(0)
const router = useRouter();

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

const skipInfo = (id: string) => {
    router.push({ path: '/personalinfo', query: { mid: id } });
}

const getHomeRef = async (after: number) => {

    let { data: { data } } = await home_rec(after)
    console.log(data);

    list.value.push(...data.rec_list);
}

// console.log(props.rec_list);
const onLoad = () => {

    if (timer.value) {
        clearTimeout(timer.value)
    }

    if (timer.value) {
        clearTimeout(timer.value)
    }

    (<any>timer).value = setTimeout(async () => {
        after.value += 20
        let { data: { data } } = await home_rec(after.value);

        console.log(data);

        list.value = [...list.value, ...data.rec_list];
        loading.value = false
        if (list.value.length >= 30) {
            finished.value = true
        }
    }, 1500)
}

onMounted(() => {
    getHomeRef(after.value)

})

</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 50px;

    .contentlist-box {
        background-color: white;
        width: 100%;
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;

        .top {
            margin-top: 10px;
            width: 100%;
            display: flex;
            align-items: center;

            p {
                margin-left: 10px;
                font-size: 15px;
            }
        }

        .question {
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 10px;
            box-sizing: border-box;
            font-size: 16px;

        }

        .img-box {
            width: 100%;

            ul {
                width: 100%;
                display: flex;
                justify-content: center;
            }
        }

        .s-tag-list {
            width: 100%;
            margin-top: 10px;

            P {
                width: 100%;
                display: block;
                padding: 10px;
                box-sizing: border-box;
                background-color: rgb(246, 246, 246);
                color: #999;
            }
        }

        .answer {
            margin-top: 10px;
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            background-color: rgb(246, 246, 246);

            .ans-name {
                color: #999;
                margin-right: 10px;
            }
        }


        .cell_btn_group {
            width: 100%;
            height: 50px;

            ul {
                width: 100%;
                display: flex;
                height: 50px;
                justify-content: space-between;

                li {
                    height: 100%;
                    // background-color: pink;
                    width: 33%;
                    font-size: 20px;
                    color: #999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
}
</style>