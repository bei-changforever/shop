<template>
    <div class="tuijian" v-if="(<any>data).sections && (<any>data).sections[0].body.items">
        <!-- 轮播图 -->
        <div class="gallery" v-if="(<any>data).sections[0] && (<any>data).sections">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item, index) in (<any>data).sections[0].body.items">
                    <van-image block :src="item.img_url" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- homt-king-kong -->
        <div class="cells_auto_fill" v-if="(<any>data).sections && (<any>data).sections[1]">
            <ul class="home_king_kong">
                <li v-for="item in (<any>data).sections[1].body.items">
                    <van-image block :src="item.img_url" />
                </li>
            </ul>
            <ul class="home_king_kong" v-if="(<any>data).sections[2] && (<any>data).sections">
                <li v-for="item in (<any>data).sections[2].body.items">
                    <van-image block :src="item.img_url" />
                </li>
            </ul>
            <div class="cell_auto_two_fill" v-if="(<any>data).sections[4] && (<any>data).sections">
                <div class="left" @click="skipProduct((<any>data).sections[4].body.items[0].action.path)">
                    <van-image block :src="(<any>data).sections[4].body.items[0].img_url" />
                </div>
                <div class="right">
                    <van-image block :src="(<any>data).sections[4].body.items[1].img_url"
                        @click="skipProduct((<any>data).sections[4].body.items[1].action.path)" />
                    <van-image block :src="(<any>data).sections[4].body.items[2].img_url"
                        @click="skipActivity((<any>data).sections[4].body.items[2].action.path)" />
                </div>
            </div>
            <div class="cell_auto_one_big_fill" v-if="(<any>data).sections[6] && (<any>data).sections"
                @click="skipProduct((<any>data).sections[6].body.items[0].action.path)">
                <van-image block :src="(<any>data).sections[6].body.items[0].img_url" />
            </div>
            <div class="cell_auto_product_fill" v-if="(<any>data).sections && (<any>data).sections[8]">
                <ul>
                    <li v-for="(item, index) in  (<any>data).sections[8].body.items">
                        <div class="content-box">
                            <div class="img">
                                <van-image block :src="'http:' + item.img_url" />
                            </div>
                            <div class="desc">
                                <div class="name">{{ item.product_name }}</div>
                                <div class="info">{{ item.product_brief }}</div>
                                <div class="price">￥{{ item.product_price }}</div>
                                <button class="btn"
                                    :style="`background-color:${(<any>data).sections[8].body.btn_color};color:${(<any>data).sections[8].body.btn_txt_color};`"
                                    @click="skipProduct(item.action.path)">立即购买</button>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul v-if="(<any>data).sections[10] && (<any>data).sections">
                    <li v-for="(item, index) in  (<any>data).sections[10].body.items">
                        <div class="content-box">
                            <div class="img">
                                <van-image block :src="'http:' + item.img_url" />
                            </div>
                            <div class="desc">
                                <div class="name">{{ item.product_name }}</div>
                                <div class="info">{{ item.product_brief }}</div>
                                <div class="price">￥{{ item.product_price }}</div>
                                <button class="btn"
                                    :style="`background-color:${(<any>data).sections[10].body.btn_color};color:${(<any>data).sections[10].body.btn_txt_color};`"
                                    @click="skipProduct(item.action.path)">立即购买</button>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul v-if="(<any>data).sections[12] && (<any>data).sections">
                    <li v-for="(item, index) in  (<any>data).sections[12].body.items">
                        <div class="content-box">
                            <div class="img">
                                <van-image block :src="'http:' + item.img_url" />
                            </div>
                            <div class="desc">
                                <div class="name">{{ item.product_name }}</div>
                                <div class="info">{{ item.product_brief }}</div>
                                <div class="price">￥{{ item.product_price }}</div>
                                <button class="btn"
                                    :style="`background-color:${(<any>data).sections[12].body.btn_color};color:${(<any>data).sections[12].body.btn_txt_color};`"
                                    @click="skipProduct(item.action.path)">立即购买</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="cell_auto_more_fill" v-if="(<any>data).sections[14] && (<any>data).sections"
                @click="skipActivity((<any>data).sections[14].body.items[0].action.path)">
                <p>{{ (<any>data).sections[14].body.items[0].action_title }}<van-icon name="arrow" /></p>
            </div>
            <div class="cell_auto_one_big_fill" v-if="(<any>data).sections && (<any>data).sections[16].body.items"
                @click="skipActivity((<any>data).sections[16].body.items[0].action.path)">
                <van-image block v-for="(item, index) in (<any>data).sections[16].body.items"
                    :src="'http:' + item.img_url" />
            </div>
            <div class="cell_auto_more_fill" v-if="(<any>data).sections && (<any>data).sections[18].body.items"
                @click="skipActivity((<any>data).sections[18].body.items[0].action.path)">
                <p v-for="(item, index) in (<any>data).sections[18].body.items">
                    {{ item.action_title }}
                    <van-icon name="arrow" />
                </p>
            </div>
            <div class="cell_auto_one_big_fill" v-if="(<any>data).sections && (<any>data).sections[20].body.items"
                @click="skipProduct((<any>data).sections[20].body.items[0].action.path)">
                <van-image block v-for="(item, index) in (<any>data).sections[20].body.items"
                    :src="'http:' + item.img_url" />
            </div>
            <div class="cell_auto_product_fill" v-if="(<any>data).sections[24] && (<any>data).sections">
                <ul>
                    <li v-for="(item, index) in  (<any>data).sections[24].body.items">
                        <div class="content-box">
                            <div class="img">
                                <van-image block :src="'http:' + item.img_url" />
                            </div>
                            <div class="desc">
                                <div class="name">{{ item.product_name }}</div>
                                <div class="info">{{ item.product_brief }}</div>
                                <div class="price">￥{{ item.product_price }}</div>
                                <button class="btn"
                                    :style="`background-color:${(<any>data).sections[24].body.btn_color};color:${(<any>data).sections[24].body.btn_txt_color};`"
                                    @click="skipProduct(item.action.path)">立即购买</button>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul>
                    <li v-for="(item, index) in  (<any>data).sections[22].body.items">
                        <div class="content-box">
                            <div class="img">
                                <van-image block :src="'http:' + item.img_url" />
                            </div>
                            <div class="desc">
                                <div class="name">{{ item.product_name }}</div>
                                <div class="info">{{ item.product_brief }}</div>
                                <div class="price">￥{{ item.product_price }}</div>
                                <button class="btn"
                                    :style="`background-color:${(<any>data).sections[22].body.btn_color};color:${(<any>data).sections[22].body.btn_txt_color};`"
                                    @click="skipProduct(item.action.path)">立即购买</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="cell_auto_more_fill" v-if="(<any>data).sections[26] && (<any>data).sections"
                @click="skipActivity((<any>data).sections[26].body.items[0].action.path)">
                <p>{{ (<any>data).sections[26].body.items[0].action_title }}<van-icon name="arrow" /></p>
            </div>
            <div class="cell_auto_one_big_fill" v-if="(<any>data).sections && (<any>data).sections[28].body.items"
                @click="skipProduct((<any>data).sections[28].body.items[0].action.path)">
                <van-image block v-for="(item, index) in (<any>data).sections[28].body.items"
                    :src="'http:' + item.img_url" />
            </div>
            <div class="cell_auto_more_fill" v-if="(<any>data).sections[29] && (<any>data).sections"
                @click="skipActivity((<any>data).sections[29].body.items[0].action.path)">
                <p>{{ (<any>data).sections[29].body.items[0].action_title }}<van-icon name="arrow" /></p>
            </div>
            <div class="cell_auto_more_fill" style="margin-top: 5px;"
                v-if="(<any>data).sections[31] && (<any>data).sections"
                @click="skipActivity((<any>data).sections[31].body.items[0].action.path)">
                <p>{{ (<any>data).sections[31].body.items[0].action_title }}<van-icon name="arrow" /></p>
            </div>
            <div class="cell_two_flex_fill">
                <ul v-if="(<any>data).sections && (<any>data).sections[33].body.items">
                    <li v-for="(item, index) in (<any>data).sections[33].body.items"
                        @click="skipActivity(item.action.path)">
                        <van-image block :src="'http:' + item.img_url" />
                    </li>
                </ul>
                <ul v-if="(<any>data).sections && (<any>data).sections[35].body.items">
                    <li v-for="(item, index) in (<any>data).sections[35].body.items">
                        <van-image block :src="'http:' + item.img_url" />
                    </li>
                </ul>
                <ul v-if="(<any>data).sections && (<any>data).sections[37].body.items">
                    <li v-for="(item, index) in (<any>data).sections[37].body.items"
                        @click="skipView(item.action.path, item.action.type)">
                        <van-image block :src="'http:' + item.img_url" />
                    </li>
                </ul>
            </div>
            <div class="cell_auto_one_big_fill" v-if="(<any>data).sections && (<any>data).sections[39].body.items"
                @click="skipView((<any>data).sections[39].body.items[0].action.path, (<any>data).sections[39].body.items[0].action.type)">
                <van-image block v-for="(item, index) in (<any>data).sections[39].body.items"
                    :src="'http:' + item.img_url" />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps<{
    data: object
}>()

let data = reactive({})

// 跳转商品详情页
const skipProduct = (id: number | string) => {
    // console.log(id);
    router.push({
        path: '/product',
        query: {
            id
        }
    });
}
// 跳转活动页
const skipActivity = (id: number | string) => {
    router.push({
        path: '/activity', query: { id }
    });
};

const skipView = (str: string, type: string) => {
    if (type == "activity") {
        window.location.href = str
        return
    }
};


watch(() => props.data, (newval) => {
    console.log('推荐==>', newval);
    data = newval
})



</script>

<style lang="scss" scoped>
.tuijian {
    width: 100%;

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

        .cell_auto_one_big_fill {
            margin-top: 5px;
        }

        .cell_auto_product_fill {
            width: 100%;

            ul {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                background-color: white;
                padding: 5px;
                box-sizing: border-box;

                li {
                    width: 49%;

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
                                width: 95%;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                font-size: 16px;
                                padding: 5px;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
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

        .cell_two_flex_fill {
            width: 100%;

            ul {
                width: 100%;
                display: flex;
                justify-content: space-between;
                padding: 5px;
                box-sizing: border-box;

                li {
                    width: 49%;
                }
            }
        }



    }
}
</style>