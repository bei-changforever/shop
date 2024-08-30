<template>
    <div class="comment-list">

        <div class="title">
            <p style="font-weight: bold;">用户评价</p>
            <p style="color: #999">{{ (<any>props.data).comments.detail.satisfy_per }}<van-icon name="arrow" /></p>
        </div>
        <div class="tag">
            <ul>
                <li v-for="t in (<any>props.data).comments.detail.comment_tags">
                    {{ t.tag_name }}
                </li>
            </ul>
        </div>

        <van-swipe class="my-swipe" :show-indicators="false" :loop="false" indicator-color="white">
            <van-swipe-item v-for="(item, index) in (<any>props.data).comments.list">

                <div style="padding: 10px;box-sizing: border-box;">
                    <div class="comment-box">
                    <div class="top">
                        <img   :src="item.user_avatar" />
                        <div class="user">
                            <p style="font-size: 15px;">{{ item.user_name }}</p>
                            <p style="font-size: 14px;color: #999;">{{ item.add_time }}</p>
                        </div>

                    </div>
                    <div class="center">
                        <p style="font-size: 16px;color: #999;line-height: 20px;" v-html="item.comment_content"></p>
                    </div>

                    <div class="bottom" style="margin-top: 10px;">
                        <van-image radius="10px" style="margin-right: 10px;" v-for="s in item.comment_images" width="60" height="60" :src="s" />
                    </div>
                </div>
                </div>
                

            </van-swipe-item>
        </van-swipe>

    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    data: any
}>()
</script>

<style lang="scss" scoped>
.comment-list {
    width: 100%;
    height: 350px;
 

    .title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        padding: 10px;
        box-sizing: border-box;
    }

    .tag {
        margin-top: 10px;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
       

        ul {
            width: 100%;
            display: flex;
            flex-wrap: wrap;

            li {
                min-width: 64px;
                height: 22px;
                background-color: #FFEEEA;
                border-radius: 10px;
                margin-right: 10px;
                text-align: center;
                line-height: 22px;
                margin-bottom: 10px;
            }
        }
    }

    .comment-box {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
        border-radius: 20px;
        height: 211px;

        .top {
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: 10px;

            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: block;
            }

            .user {
                margin-left: 10px;
            }
        }

        .center {
            height: 40px;
            overflow: hidden;
            display: -webkit-box;
            /*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
            -webkit-line-clamp: 2;
            /*用来限制在一个块元素显示的文本的行数。*/
            -webkit-box-orient: vertical;
            /*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。*/

        }
    }
}</style>