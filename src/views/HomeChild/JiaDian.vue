<template>
    <div class="jiadian" v-if="(<any>data).sections && (<any>data).sections[0]">
        <div class="cells_auto_fill">
            <div class="cell_auto_one_big_fill">
                <van-image block :src="(<any>data).sections[0].body.items[0].img_url" />
            </div>
            <div class="cell_auto_one_big_fill">
                <van-image block :src="(<any>data).sections[2].body.items[0].img_url" />
            </div>
            <div class="list_three_type4">
                <ul>
                    <li @click="skipProduct(item.product_id)" v-for="item in (<any>data).sections[4].body.items">
                        <div class="content-box">
                            <div class="img">
                                <van-image block :src="'http:' + item.img_url" />
                            </div>
                            <div class="desc">
                                <div class="name">{{ item.product_name }}</div>
                                <div class="info">{{ item.product_brief }}</div>
                                <div class="price">￥{{ item.product_price }}</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="cell_auto_one_big_fill" v-if="(<any>data).sections[6] && (<any>data).sections">
                <van-image block :src="(<any>data).sections[6].body.items[0].img_url" />
            </div>
            <div class="cell_auto_one_big_fill" v-if="(<any>data).sections[8] && (<any>data).sections">
                <van-image block :src="(<any>data).sections[8].body.items[0].img_url" />
            </div>
            <div class="cell_auto_one_big_fill" v-if="(<any>data).sections[10] && (<any>data).sections">
                <van-image block :src="(<any>data).sections[10].body.items[0].img_url" />
            </div>
            <div class="cell_auto_one_big_fill" v-if="(<any>data).sections[12] && (<any>data).sections">
                <van-image block :src="(<any>data).sections[12].body.items[0].img_url" />
            </div>
            <div class="list_three_type4">
                <ul>
                    <li @click="skipProduct(item.product_id)" v-for="item in (<any>data).sections[13].body.items">
                        <div class="content-box">
                            <div class="img">
                                <van-image block :src="'http:' + item.img_url" />
                            </div>
                            <div class="desc">
                                <div class="name">{{ item.product_name }}</div>
                                <div class="info">{{ item.product_brief }}</div>
                                <div class="price">￥{{ item.product_price }}</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="list_three_type4">
                <ul>
                    <li @click="skipProduct(item.product_id)" v-for="item in (<any>data).sections[15].body.items">
                        <div class="content-box">
                            <div class="img">
                                <van-image block :src="'http:' + item.img_url" />
                            </div>
                            <div class="desc">
                                <div class="name">{{ item.product_name }}</div>
                                <div class="info">{{ item.product_brief }}</div>
                                <div class="price">￥{{ item.product_price }}</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { watch , reactive } from 'vue';
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
    data:object
}>()

let data = reactive({})

watch(()=>props.data , (newVal)=> {
    console.log('家电==>',newVal);
    data = newVal
})
</script>

<style lang="scss" scoped>
.jiadian {
    width: 100%;
    background-color: rgb(232,93,67);

    .cells_auto_fill {
        width: 100%;


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
                background-color: rgb(227,64,57);
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
                background-color: rgb(227,64,57);

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