<template>
    <div class="center-com">

        <div v-if="channelThree" class="type-two">
            <div class="left-box" @click="skipProduct(channelThree[0].action.path)">
                <div class="inf-box">
                    <p class="title">{{ channelThree[0].title }}</p>
                    <p class="subtitle" :style="{ color: channelThree[0].text_color }">{{ channelThree[0].subtitle }}</p>
                </div>
                <img :src="channelThree[0].img_url">
            </div>

            <div class="right-box">
                <div class="up" @click="skipProduct(channelThree[1].action.path)">
                    <div class="inf-box">
                        <p class="title">{{ channelThree[1].title }}</p>
                        <p class="subtitle" :style="{ color: channelThree[1].text_color }">{{ channelThree[1].subtitle }}
                        </p>
                    </div>
                    <img :src="channelThree[1].img_url">
                </div>

                <div class="down" @click="skipProduct(channelThree[2].action.path)">
                    <div class="inf-box">
                        <p class="title">{{ channelThree[2].title }}</p>
                        <p class="subtitle" :style="{ color: channelThree[2].text_color }">{{ channelThree[2].subtitle }}
                        </p>
                    </div>
                    <img :src="channelThree[2].img_url">
                </div>
            </div>
        </div>

        <div v-if="cellsAuto" class="type-three">
            <div class="img-item" v-for="img in cellsAuto">
                <a :href="img.action.path"> <img :src="img.img_url"></a>

            </div>
        </div>

        <div class="explosive-goods" v-if="channelHotTitle && channelHot">
            <h3 class="title">{{ channelHotTitle }}</h3>
            <div class="goods-box">
                <div class="good-item" v-for="good in channelHot" @click="skipProduct(good.action.path)">
                    <p class="name van-ellipsis">{{ good.product_name }}</p>
                    <div class="left-inf">
                        <p class="tag van-ellipsis" :style="{ color: good.text_color }">{{ good.product_tag }}</p>
                        <span class="price">￥{{ good.product_price }}</span>
                        <div class="praise" :style="{ background: good.bg_color_square }"><span>{{ good.button_text
                        }}</span></div>
                    </div>

                    <div class="right-img">
                        <img :src="good.img_url">
                    </div>
                </div>
            </div>
        </div>


        <div v-if="channelNewTitle && channelNew.length <= 3" class="type-one">
            <p class="title">{{ channelNewTitle }}</p>

            <div class="good-box">
                <div class="good-item" v-for="g in channelNew" :style="{ backgroundImage: `url(${g.big_img_url})` }"
                    @click="skipProduct(g.action.path)">
                    <p class="name van-ellipsis">{{ g.product_name }}</p>
                    <p class="tag van-ellipsis">{{ g.product_tag }}</p>
                    <p class="praise" :style="{ color: g.text_color }">{{ g.button_text }}</p>
                    <img :src="g.img_url">
                    <p class="one-price">￥{{ g.product_price }}</p>
                </div>
            </div>

        </div>



    </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();

const skipProduct = (id) => {
    router.push({ path: '/product', query: { id } });
};

const props = defineProps({
    itemsArr: {
        type: Array
    }
});


const channelThree = computed(() => {
    let res = ''
    let index = props.itemsArr.findIndex((arr) => {
        return arr.view_type == 'channel_three_combination'
    })

    if (index !== -1) {
        res = props.itemsArr[index]?.body.items
    }

    return res
});

const channelNewTitle = computed(() => {
    let res = ''
    let index = props.itemsArr.findIndex((arr) => {
        return arr.view_type == 'channel_new_product'
    })

    if (index !== -1) {
        res = props.itemsArr[index - 1]?.body.title
    }

    return res
});
const channelNew = computed(() => {
    let res = ''
    let index = props.itemsArr.findIndex((arr) => {
        return arr.view_type == 'channel_new_product'
    })

    if (index !== -1) {
        res = props.itemsArr[index]?.body.items
    }

    return res
});

const channelHotTitle = computed(() => {
    let res = ''
    let index = props.itemsArr.findIndex((arr) => {
        return arr.view_type == 'channel_hot_sale'
    })

    if (index !== -1) {
        res = props.itemsArr[index - 1]?.body.title
    }

    return res
});
const channelHot = computed(() => {
    let res = ''
    let index = props.itemsArr.findIndex((arr) => {
        return arr.view_type == 'channel_hot_sale'
    })

    if (index !== -1) {
        res = props.itemsArr[index]?.body.items
    }

    return res
});

const cellsAuto = computed(() => {
    let res = ''
    let index = props.itemsArr.findIndex((arr) => {
        return arr.view_type == 'cells_auto_fill'
    })

    if (index !== -1) {
        res = props.itemsArr[index]?.body.items
    }

    return res
});

console.log(props.itemsArr);
console.log(channelNew.value);

</script>

<style scoped lang="scss">
.center-com {
    width: 100vw;

    .type-one {
        margin-top: 2vh;
        padding: 0 4vw;
        width: 100vw;

        .title {
            margin-bottom: 2vh;
            font-size: 16px;
            font-weight: 600;
        }

        .good-box {
            display: flex;
            justify-content: space-around;
            width: 100%;
            color: #fff;

            .good-item {
                display: flex;
                flex-direction: column;
                align-content: center;
                text-align: center;
                padding: 1.5vh 2vw;
                width: 30%;
                border-radius: 10px;

                .name {
                    margin-bottom: 3px;
                    font-size: 14px;
                    font-weight: 600;
                }

                .tag {
                    margin-bottom: 5px;
                    font-size: 12px;
                }

                .praise {
                    margin: 0 auto;
                    width: 80%;
                    height: 16px;
                    font-size: 12px;
                    line-height: 14px;
                    background: #fff;
                    border-radius: 20px;
                }

                .one-price {
                    font-size: 16px;
                    font-weight: 700;
                }
            }
        }
    }

    .type-two {
        margin: 0 4vw;
        width: 92vw;
        background-color: #fff;
        border-radius: 20px;
        overflow: hidden;

        .left-box {
            position: relative;
            float: left;
            width: 48%;
            border-right: 1px solid rgba(128, 128, 128, .3);

            .inf-box {
                position: absolute;
                top: 1vh;
                left: 4vw;

                .title {
                    margin-bottom: 5px;
                    font-size: 14px;
                    font-weight: 600;
                }

                .subtitle {
                    font-size: 12px;
                }
            }

            img {
                width: 100%;
            }
        }

        .right-box {
            float: right;
            width: 48%;

            .up,
            .down {
                position: relative;
                height: 50%;

                .inf-box {
                    position: absolute;
                    top: 1vh;
                    left: 4vw;

                    .title {
                        margin-bottom: 5px;
                        font-size: 14px;
                        font-weight: 600;
                    }

                    .subtitle {
                        font-size: 12px;
                    }
                }

                img {
                    width: 100%;
                }
            }
        }
    }

    .type-three {
        display: flex;
        justify-content: center;
        margin-top: 3vh;
        width: 100%;
        height: 16vh;

        .img-item {
            height: 100%;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .explosive-goods {
        margin-top: 4vh;
        padding: 0 3vw;

        .title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 2vh;
        }

        .goods-box {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
            height: 100%;
            background: #fff;

            .good-item {
                position: relative;
                padding: 1vw;
                margin-top: 2px;
                width: 50%;
                height: 14vh;

                &:nth-child(-n+4) {
                    border-bottom: 1px solid rgba(128, 128, 128, .5);
                }

                &:nth-child(2n-1) {

                    border-right: 1px solid rgba(128, 128, 128, .5);
                }

                .name {
                    margin-bottom: 5px;
                    width: 70%;
                    font-size: 16px;
                    font-weight: 600;
                }

                .left-inf {
                    float: left;
                    width: 50%;

                    .tag {
                        margin-bottom: 3px;
                        font-size: 14px;
                    }

                    .price {
                        font-size: 14px;
                    }

                    .praise {
                        margin-top: 5px;
                        width: 75%;
                        height: 14px;
                        font-size: 12px;
                        line-height: 14fpx;
                        text-align: center;
                        color: #fff;
                    }
                }

                .right-img {
                    position: absolute;
                    bottom: 1vh;
                    right: 1vw;
                    width: 50%;
                    // z-index: -1;

                    img {
                        width: 75%;
                    }
                }
            }
        }
    }

}
</style>