<template>
    <div class="xiaomi-tv">
        <div v-if="(<any>props.data).sections && (<any>props.data).sections[20].body.items">
            <van-image v-for="(item, index) in (<any>props.data).sections[20].body.items" block
                :src="'http:' + item.img_url" />
        </div>
        <ul v-if="(<any>props.data).sections && (<any>props.data).sections[22].body.items">
            <li v-for="(item, index) in  (<any>props.data).sections[22].body.items">
                <div class="content-box">
                    <div class="img">
                        <van-image block :src="'http:' + item.img_url" />
                    </div>
                    <div class="desc">
                        <div class="name">{{ item.product_name }}</div>
                        <div class="info">{{ item.product_brief }}</div>
                        <div class="price">￥{{ item.product_price }}</div>
                        <button class="btn"
                            :style="`background-color:${(<any>props.data).sections[22].body.btn_color};color:${(<any>props.data).sections[22].body.btn_txt_color};`">立即购买</button>
                    </div>
                </div>
            </li>
        </ul>
        <ul v-if="(<any>props.data).sections && (<any>props.data).sections[24].body.items">
            <li v-for="(item, index) in  (<any>props.data).sections[24].body.items">
                <div class="content-box">
                    <div class="img">
                        <van-image block :src="'http:' + item.img_url" />
                    </div>
                    <div class="desc">
                        <div class="name">{{ item.product_name }}</div>
                        <div class="info">{{ item.product_brief }}</div>
                        <div class="price">￥{{ item.product_price }}</div>
                        <button class="btn"
                            :style="`background-color:${(<any>props.data).sections[24].body.btn_color};color:${(<any>props.data).sections[24].body.btn_txt_color};`">立即购买</button>
                    </div>
                </div>
            </li>
        </ul>
        <div class="more" v-if=" (<any>props.data).sections && (<any>props.data).sections[26].body.items">
            <p v-for="(item,index) in (<any>props.data).sections[26].body.items">
            {{ item.action_title }}
            <van-icon name="arrow" />
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    data: object
}>()
</script>

<style lang="scss" scoped>
.xiaomi-tv {
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
                        font-size: 16px;
                        padding: 5px;
                        box-sizing: border-box;
                        width: 95%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .info {
                        padding: 2px;
                        width: 95%;
                        box-sizing: border-box;
                        color: rgba(0, 0, 0, .54);
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
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

    .more {
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 16px;
        color: #999;
        background-color: white;
    }
}
</style>