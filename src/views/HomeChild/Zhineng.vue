<template>
    <div class="zhineng" v-if="(<any>data).sections && (<any>data).sections[0].body.items">
        <!-- 轮播图 -->
        <div class="gallery">
            <van-swipe  class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item  v-for="(item, index) in (<any>data).sections[0].body.items">
                    <van-image block :src="item.img_url" />
                </van-swipe-item>
            </van-swipe>
        </div>

        <div class="cells_auto_fill">
            <ul class="home_king_kong">
                <li v-for="item in (<any>data).sections[2].body.items">
                    <van-image block :src="item.img_url" />
                </li>
            </ul>
            <ul class="home_king_kong">
                <li v-for="item in (<any>data).sections[3].body.items">
                    <van-image block :src="item.img_url" />
                </li>
            </ul>

            <div class="cell_auto_one_big_fill">
                <van-image block :src="(<any>data).sections[5].body.items[0].img_url" />
            </div>

            <div class="cell_auto_one_big_fill">
                <van-image block :src="(<any>data).sections[7].body.items[0].img_url" />
            </div>

            <div class="cell_auto_one_big_fill">
                <van-image block :src="(<any>data).sections[9].body.items[0].img_url" />
            </div>

            <div class="list_three_type4">
                <ul>
                    <li @click="skipProduct(item.product_id)" v-for="item in (<any>data).sections[11].body.items">
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
            <div class="cell_auto_one_big_fill">
                <van-image block :src="(<any>data).sections[13].body.items[0].img_url" />
            </div>
            <div class="cell_auto_one_big_fill">
                <van-image block :src="(<any>data).sections[15].body.items[0].img_url" />
            </div>
            <div class="list_three_type4">
                <ul>
                    <li @click="skipProduct(item.product_id)"  v-for="item in (<any>data).sections[17].body.items">
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

            <div class="cell_auto_one_big_fill">
                <van-image block :src="(<any>data).sections[19].body.items[0].img_url" />
            </div>
            <div class="cell_auto_one_big_fill">
                <van-image block :src="(<any>data).sections[21].body.items[0].img_url" />
            </div>
            <div class="cell_auto_one_big_fill">
                <van-image block :src="(<any>data).sections[23].body.items[0].img_url" />
            </div>
            <div class="list_three_type4">
                <ul>
                    <li @click="skipProduct(item.product_id)"  v-for="item in (<any>data).sections[25].body.items">
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
                    <li @click="skipProduct(item.product_id)"  v-for="item in (<any>data).sections[27].body.items">
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
            <div class="cell_auto_one_big_fill">
                <van-image block :src="(<any>data).sections[29].body.items[0].img_url" />
            </div>
            <div class="list_three_type4">
                <ul>
                    <li @click="skipProduct(item.product_id)"  v-for="item in (<any>data).sections[31].body.items">
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
            <div class="cell_auto_one_big_fill">
                <van-image block :src="(<any>data).sections[33].body.items[0].img_url" />
            </div>
            <div class="cell_auto_one_big_fill">
                <van-image block :src="(<any>data).sections[35].body.items[0].img_url" />
            </div>
            <div class="list_three_type4">
                <ul>
                    <li @click="skipProduct(item.product_id)"  v-for="item in (<any>data).sections[37].body.items">
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
            <div class="cell_auto_one_big_fill">
                <van-image block :src="(<any>data).sections[39].body.items[0].img_url" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps<{
    data: object
}>()
let data = reactive({})
// 跳转商品详情页
const skipProduct = (id:number | string) => {
  
    router.push({
        path: '/product',
        query: {
            id
        }
    });
}
watch(() => props.data, (newVal) => {
    console.log('智能==>', newVal);
    data = newVal
})
</script>

<style lang="scss" scoped>
.zhineng {
    width: 100%;
    background-color: rgb(239,241,243);

    .gallery {
        width: 100%;
    }

    .cells_auto_fill {
        width: 100%;

        .home_king_kong {
            width: 100%;
            display: flex;

            li {
                width: 20%;
            }
        }


        .cell_auto_one_big_fill {
            margin-top: 5px;
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
                background-color: rgb(239,241,243);

                li {
                    width: 33%;
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
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
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

                        }
                    }
                }
            }
        }
    }


}
</style>