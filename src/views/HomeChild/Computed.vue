<template>
    <div class="computed">
        <div class="cells_auto_fill" v-if="(<any>data).sections && (<any>data).sections[1]">
            <div class="cell_auto_one_big_fill" v-if="(<any>data).sections[1] && (<any>data).sections">
                <van-image block :src="'http:' + (<any>data).sections[1].body.items[0].img_url" />
            </div>

            <div class="list_one_type14" v-if="(<any>data).sections[3] && (<any>data).sections">
                <div class="one" @click="skipProduct(item.product_id)" v-for="item in (<any>data).sections[3].body.items">
                    <div class="img">
                        <van-image block :src="'http:' + item.img_url" />
                    </div>
                    <div class="desc">
                        <div class="top">
                            <span>{{ item.product_name }}</span>
                            <span style="color: rgb(234,98,91)">￥{{ item.market_price }}</span>
                        </div>
                        <div class="bottom">
                            <span>{{ item.product_brief }}</span>
                            <button>立即购买</button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="list_one_type14"  v-if="(<any>data).sections[5] && (<any>data).sections">
                <div class="one" @click="skipProduct(item.product_id)" v-for="item in (<any>data).sections[5].body.items">
                    <div class="img">
                        <van-image block :src="'http:' + item.img_url" />
                    </div>
                    <div class="desc">
                        <div class="top">
                            <span>{{ item.product_name }}</span>
                            <span style="color: rgb(234,98,91)">￥{{ item.market_price }}</span>
                        </div>
                        <div class="bottom">
                            <span>{{ item.product_brief }}</span>
                            <button>立即购买</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cell_auto_one_big_fill" v-if="(<any>data).sections[7] && (<any>data).sections">
                <van-image block :src="'http:' + (<any>data).sections[7].body.items[0].img_url" />
            </div>

            <div class="cell_auto_one_big_fill" v-if="(<any>data).sections[9] && (<any>data).sections">
                <van-image block :src="'http:' + (<any>data).sections[9].body.items[0].img_url" />
            </div>

            <div class="cell_auto_one_big_fill" v-if="(<any>data).sections[11] && (<any>data).sections">
                <van-image block :src="'http:' + (<any>data).sections[11].body.items[0].img_url" />
            </div>

            <div class="cell_auto_one_big_fill" v-if="(<any>data).sections[13] && (<any>data).sections">
                <van-image block :src="'http:' + (<any>data).sections[13].body.items[0].img_url" />
            </div>

            <div class="cell_auto_two_big_fill" v-if="(<any>data).sections[14] && (<any>data).sections">

                <ul>
                    <li v-for="item in (<any>data).sections[14].body.items">
                        <van-image block :src="'http:' + item.img_url" />
                    </li>
                </ul>

            </div>

            <div class="cell_auto_two_big_fill" v-if="(<any>data).sections[15] && (<any>data).sections">

<ul>
    <li v-for="item in (<any>data).sections[15].body.items">
        <van-image block :src="'http:' + item.img_url" />
    </li>
</ul>

</div>

<div class="cell_auto_two_big_fill" v-if="(<any>data).sections[16] && (<any>data).sections">

<ul>
    <li v-for="item in (<any>data).sections[16].body.items">
        <van-image block :src="'http:' + item.img_url" />
    </li>
</ul>

</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
// 跳转商品详情页
const skipProduct = (id: number | string) => {
    // console.log(item);
    
    console.log(id);
    router.push({
        path: '/product',
        query: {
            id
        }
    });
}
const props = defineProps<{
    data: object
}>()

let data = reactive({})

watch(() => props.data, (newVal) => {
    console.log('笔记本==>', newVal);
    data = newVal
})
</script>

<style lang="scss" scoped>
.computed {
    width: 100%;
    background-color: rgb(72, 120, 166);

    .cells_auto_fill {

        width: 100%;

        .cell_auto_two_big_fill {
            width: 100%;
            ul {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                li {
                    width: 50%;
                }
            }
        }


        .list_one_type14 {
            width: 100%;
            padding: 5px;
            box-sizing: border-box;
            background-color: rgb(66, 134, 191);

            .one {

                box-sizing: border-box;

                .desc {
                    width: 100%;
                    padding: 5px;
                    background-color: white;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    .top {
                        font-size: 17px;
                        font-weight: bold;
                        padding-top: 5px;
                        padding-bottom: 5px;
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                    }

                    .bottom {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 14px;
                        color: #999;

                        span {
                            width: 65%;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }

                        button {
                            width: 30%;
                            height: 40px;
                            background: #ea625b;
                            border-radius: .05rem;
                            text-align: center;
                            color: #fff;
                            font-size: .24rem;
                            padding: .16rem 0;
                            font-weight: 700;
                            border: none;
                        }
                    }
                }
            }
        }

        .cell_auto_two_fill {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-top: 5px;

            .left {
                width: 49.5%;
            }

            .right {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 49.5%;
            }
        }



        .cell_auto_product_fill {
            width: 100%;

            ul {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                background-color: rgb(249, 121, 91);
                padding: 5px;
                box-sizing: border-box;

                li {
                    width: 49%;
                    background-color: white;
                    padding-bottom: 5px;

                    .content-box {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        justify-content: center;

                        .desc {
                            width: 100%;
                            display: flex;
                            flex-direction: column;
                            text-align: left;
                            align-items: center;
                            justify-content: center;

                            .name {
                                width: 95%;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                font-size: 16px;
                                padding: 5px;

                                box-sizing: border-box;
                            }

                            .info {
                                width: 95%;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                padding: 2px;
                                box-sizing: border-box;
                                color: rgba(0, 0, 0, .54);
                            }

                            .price {
                                padding: 5px;
                                font-size: 14px;
                                box-sizing: border-box;
                                color: #ea625b;
                            }

                            .btn {
                                border: none;
                                width: 80%;
                                height: 40px;
                                background: #ea625b;
                                border-radius: .05rem;
                                text-align: center;
                                color: #fff;
                                font-size: 13px;
                                padding: .16rem 0;
                                font-weight: 700;
                            }
                        }
                    }
                }

            }

        }

        .cell_auto_more_fill {

            width: 100%;
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 16px;
            color: #999;
            background-color: white;

        }

        .list_three_type4 {
            width: 100%;

            ul {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                padding: 5px;
                box-sizing: border-box;
                justify-content: space-between;
                background-color: rgb(255, 174, 153);

                li {
                    width: 32%;
                    background-color: white;

                    .content-box {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        justify-content: center;

                        .desc {
                            width: 100%;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;

                            .name {
                                width: 80%;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                font-size: 14px;
                                font-weight: bold;
                                padding: 5px;

                                box-sizing: border-box;
                            }

                            .info {
                                width: 85%;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                padding: 2px;
                                box-sizing: border-box;
                                color: rgba(0, 0, 0, .54);
                            }

                            .price {
                                padding: 5px;
                                font-size: 14px;
                                font-weight: bold;
                                box-sizing: border-box;
                                color: #ea625b;
                            }

                            .auto-img {
                                border-radius: 10px;
                            }

                        }
                    }
                }
            }
        }
    }
}
</style>