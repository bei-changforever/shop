<template>
    <div class="recommend">
        <div class="title">{{ (<any>props.data).title }}</div>
        <div class="container">
            <ul>
                <li v-for="(item, index) in (<any>props.data).data">
                    <div class="img">
                        <van-image width="100" :src="item.image_url" />
                    </div>
                    <div class="desc">
                        <p style="color: #999"> {{ item.name }}</p>
                        <p style="color: #FF6700;font-size: 14px;font-weight: bold;">￥{{ item.price }}</p>
                    </div>

                </li>
                <li></li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    data: object
}>()
</script>

<style lang="scss" scoped>
.recommend {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;

    .title {
        width: 100%;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
    }

    .container {
        width: 100%;

        ul {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            li {
                width: 49%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                margin-top: 10px;
       

                .desc {
                    width: 100%;
                    text-align: center;
                    line-height: 15px;
                }
            }
        }
    }
}
</style>