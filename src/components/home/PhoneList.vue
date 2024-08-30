<template>
    <div class="phone-list" >
        <ul v-if="(<any>props.phoneList).sections && (<any>props.phoneList).sections[8].body.items">
            <li v-for="(item, index) in  (<any>props.phoneList).sections[8].body.items">
                <div class="content-box">
                    <div class="img">
                        <van-image block  :src="'http:' + item.img_url" />
                    </div>
                    <div class="desc">
                        <div class="name">{{ item.product_name }}</div>
                        <div class="info">{{ item.product_brief }}</div>
                        <div class="price">￥{{ item.product_price }}</div>
                        <button class="btn"
                            :style="`background-color:${(<any>props.phoneList).sections[8].body.btn_color};color:${(<any>props.phoneList).sections[8].body.btn_txt_color};`">立即购买</button>
                    </div>
                </div>
            </li>
        </ul>
        <ul v-if="(<any>props.phoneList).sections && (<any>props.phoneList).sections[10].body.items">
            <li v-for="(item, index) in  (<any>props.phoneList).sections[10].body.items">
                <div class="content-box">
                    <div class="img">
                        <van-image block :src="'http:' + item.img_url" />
                    </div>
                    <div class="desc">
                        <div class="name">{{ item.product_name }}</div>
                        <div class="info">{{ item.product_brief }}</div>
                        <div class="price">￥{{ item.product_price }}</div>
                        <button class="btn"
                            :style="`background-color:${(<any>props.phoneList).sections[10].body.btn_color};color:${(<any>props.phoneList).sections[10].body.btn_txt_color};`">立即购买</button>
                    </div>
                </div>
            </li>
        </ul>
        <ul v-if="(<any>props.phoneList).sections && (<any>props.phoneList).sections[12].body.items">
            <li v-for="(item, index) in  (<any>props.phoneList).sections[12].body.items">
                <div class="content-box">
                    <div class="img">
                        <van-image block :src="'http:' + item.img_url" />
                    </div>
                    <div class="desc">
                        <div class="name">{{ item.product_name }}</div>
                        <div class="info">{{ item.product_brief }}</div>
                        <div class="price">￥{{ item.product_price }}</div>
                        <button class="btn"
                            :style="`background-color:${(<any>props.phoneList).sections[12].body.btn_color};color:${(<any>props.phoneList).sections[12].body.btn_txt_color};`">立即购买</button>
                    </div>
                </div>
            </li>
        </ul>
        <div class="more" v-if="(<any>props.phoneList).sections && (<any>props.phoneList).sections[14].body.items">
         <p v-for="(item,index) in (<any>props.phoneList).sections[14].body.items">
        {{ item.action_title }}<van-icon name="arrow" />
        </p>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    phoneList: object
}>()
</script>

<style lang="scss" scoped>
.phone-list {
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
                    }

                    .info {
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