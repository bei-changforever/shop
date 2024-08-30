<template>
    <div class="list-item" v-if="item.action !== null" @click="skipProduct">
        <div class="left-img">
            <img :src="item.image">
        </div>

        <div class="right-inf">
            <p class="name">{{ item.name }}</p>
            <p class="desc van-multi-ellipsis--l2" v-html="item.desc"></p>

            <div class="model-list" v-if="modelArr.length > 0">
                <div class="model-item" v-for="model in modelArr" :key="model.value">
                    <p class="title van-ellipsis">{{ model.top_title }}</p>
                    <p class="value van-ellipsis">{{ model.value }}</p>
                </div>
            </div>


            <div class="price-inf">
                <span class="price">￥<span class="value">{{ item.price }}</span>起</span>
                <span class="market_price">￥{{ item.market_price }}</span>
            </div>

            <div class="comment-inf">
                <span class="total">{{ item.comments_total }}条评论</span>
                <span class="satisfy">{{ item.satisfy_per }}满意</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
    item: {
    }
});

const modelArr = computed(() => {
    return props.item.class_parameters?.list
});
// 跳转商品详情页
const skipProduct = () => {
    let id = props.item.product_id;
    // console.log(id);

    router.push({ path: '/product', query: { id } });
}

</script>

<style lang="scss" scoped>
.list-item {
    padding-right: 2vw;
    width: 100vw;
    height: 25vh;
    border-bottom: 1px solid rgba(128, 128, 128, .5);

    .left-img {
        float: left;
        width: 40vw;

        img {
            width: 100%;
        }
    }

    .right-inf {
        padding: 2vh 1vw 2vh 0;

        .name {
            font-size: 14px;
            line-height: 16px;
            font-weight: 600;
            margin-bottom: 5px;
        }

        .desc {
            font-size: 14px;
            margin-bottom: 10px;
        }

        .model-list {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            margin-bottom: 8px;
            height: 5vh;

            .model-item {
                width: 18vw;
                font-size: 14px;
                text-align: center;

                .title {
                    margin-bottom: 1px;
                }

                .value {
                    color: gray;
                }

                &:nth-child(2) {
                    flex: 1;
                    padding: 0 3px;
                    border-left: 1px solid rgba(128, 128, 128, .5);
                    border-right: 1px solid rgba(128, 128, 128, .5);
                }
            }
        }

        .price-inf {
            font-size: 14px;
            margin-bottom: 5px;

            .price {
                color: #ff4a00;

                .value {
                    font-size: 20px;
                    font-weight: 600;
                }
            }

            .market_price {
                margin-left: 3px;
                text-decoration: line-through;
            }
        }

        .comment-inf {
            font-size: 14px;
            color: gray;

            .total {
                margin-right: 3px;
            }
        }
    }
}
</style>