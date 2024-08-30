<template>
    <div class="cate">
        <div class="header" @click="skipSearch">
            <div class="bg-box">
                <img src="@/assets/images/search_gray.png">
                <span>搜索商品名称</span>
            </div>
        </div>

        <van-skeleton :loading="loading" title :row="20" />
        <div class="cate-box">

            <div class="left-ul">
                <ul>
                    <li @click="choose(index)" :class="activeIndex == index ? 'active' : ''"
                        v-for="(item, index) in leftListArr" :key="(<any>item).category_id">
                        {{ (<any>item).category_name }}
                    </li>
                </ul>
            </div>

            <div class="right-box" style="overflow: hidden;">

                <div class="swiperbox">

                    <van-swipe ref="swiper" @change="onChange" :height="650" vertical :show-indicators="false" :loop="false"
                        v-if="emptyArr">

                        <van-swipe-item v-for="(dataList, index) in emptyArr">

                            <div v-for="(item, i1) in dataList">
                                <!-- {{ item.category_name }} -->
                                <!-- 推荐 -->
                                <Tuijian v-if="item.category_name == '推荐'" :tuijian="item" />
                                <XiaoMiphone :xiaomi="item" v-if="item.category_name == 'Xiaomi手机'" />
                                <!-- Redmi手机 -->
                                <ReadMi :data="item" v-if="item.category_name == 'Redmi手机'" />
                                <!-- "游戏手机" -->
                                <GamePhone v-if="item.category_name == '游戏手机'" :data="item" />
                                <!-- "电脑平板" -->
                                <Diannao :data="item" v-if="item.category_name == '电脑平板'" />
                                <!-- "智能穿戴" -->
                                <Zhineng :data="item" v-if="item.category_name == '智能穿戴'" />
                                <!-- "电视" -->
                                <TV :data="item" v-if="item.category_name == '电视'" />
                                <!-- "大家电" -->
                                <DaJiadian :data="item" v-if="item.category_name == '大家电'" />
                                <!-- "小家电" -->
                                <SmallJidian :data="item" v-if="item.category_name == '小家电'" />

                                <!-- "智能家居" -->
                                <Zhinengjiaju :data="item" v-if="item.category_name == '智能家居'" />

                                <!-- "出行运动" -->

                                <Sport :data="item" v-if="item.category_name == '出行运动'" />


                                <!-- "日用百货" -->
                                <DayLiuse :data="item" v-if="item.category_name == '日用百货'" />



                                <!-- "儿童用品" -->
                                <Chirdren :data="item" v-if="item.category_name == '儿童用品'" />


                                <!-- "有品精选" -->

                                <YouPin v-if="item.category_name == '有品精选'" :data="item" />

                                <!-- "小米服务" -->

                                <XiaoMiserver v-if="item.category_name == '小米服务'" :data="item" />



                                <!-- 底边 -->

                            </div>


                        </van-swipe-item>

                    </van-swipe>

                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getCateMainList } from '@/request/projectApis/index';
import { category } from '@/request/projectApis/index';
import Tuijian from '@/components/CateChild/Tuijian.vue';
import XiaoMiphone from '@/components/CateChild/XiaoMiPhone.vue';
import ReadMi from '@/components/CateChild/ReadMi.vue';
import GamePhone from '@/components/CateChild/GamePhone.vue';
import TV from '../HomeChild/TV.vue';
import Zhineng from '../HomeChild/Zhineng.vue';
import Diannao from '@/components/CateChild/DianNao.vue';
import XiaoMiserver from '@/components/CateChild/XiaoMiserver.vue';
import DaJiadian from '@/components/CateChild/DaJiadian.vue';
import YouPin from '@/components/CateChild/YouPin.vue';
import SmallJidian from '@/components/CateChild/SmallJidian.vue';
import Zhinengjiaju from '@/components/CateChild/Zhinengjiaju.vue';
import Chirdren from '@/components/CateChild/Chirdren.vue';
import DayLiuse from '@/components/CateChild/DayLiuse.vue';
import Sport from '@/components/CateChild/Sport.vue';

const leftListArr = ref([])
const NewList = ref([])
const activeIndex = ref(0)
const value = ref('');
const swiper = ref(null)
const smallBoxActiveIndex = ref(0)

const emptyArr = ref(new Array(15))


const loading = ref(true)

const getCateLeftList = async () => {
    let { data: { data } } = await getCateMainList()
    // console.log(data);
    leftListArr.value = data


    if(leftListArr.value) {
        loading.value = false
    }



}
const router = useRouter();
const skipSearch = () => {
    router.push({ path: '/search' })
}

const Getcategory = async (id: any) => {
    let { data: { data } } = await category(id);
    // (<any>emptyArr).value.push(data);
    emptyArr.value[activeIndex.value] = data;
    NewList.value = data;


    console.log((<any>emptyArr).value);

    // (<any>emptyArr).value[activeIndex.value].push( NewList.value )
}

const onChange = (index: number) => {
    let id = (<any>leftListArr).value[index].category_id
    activeIndex.value = index
    Getcategory(id)

    console.log(id);



}

const choose = (index: number) => {
    if (activeIndex.value == index) return
    (<any>swiper).value.swipeTo(index);
    activeIndex.value = index;

}


const chooseSonNav = (i: number) => {
    if (smallBoxActiveIndex.value == i) return

    smallBoxActiveIndex.value = i
}



onMounted(() => {
    let id = -1
    getCateLeftList()
    Getcategory(id)
})



</script>

<style lang="scss" >
.cate {
    width: 100%;
    background-color: white;
    height: calc(100vh - 100px);

    .header {
        padding: 2vh 6vw;
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 2;

        .bg-box {
            display: flex;
            align-items: center;
            align-content: center;
            padding: 1vh 5vw;
            width: 100%;
            height: 5vh;
            background: rgba(128, 128, 128, .1);
            border-radius: 20px;


            img {
                margin-right: 10px;
                width: 18px;
            }

            span {
                font-size: 14px;
                color: rgba(128, 128, 128, .8);
            }
        }
    }


    .cate-box {
        margin-top: 55px;
        width: 100%;
        height: 100%;
        display: flex;

        &::-webkit-scrollbar {
            width: 0 !important;
        }

        .left-ul {
            width: 25%;
            height: 100%;
            overflow: scroll;

            &::-webkit-scrollbar {
                width: 0 !important;
            }

            ul {
                width: 100%;

                li {
                    position: relative;
                    width: 100%;
                    height: 50px;
                    padding: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 14px;
                    box-sizing: border-box;
                    color: #666666;
                    background-color: white;

                    &.active {
                        font-weight: bold;
                        color: black;



                        &::after {
                            content: '';
                            position: absolute;
                            left: 0;
                            width: 3px;
                            height: 15px;
                            background-color: #FF5934;
                        }
                    }


                }
            }
        }


        .right-box {
            width: 75%;
            height: 100%;




            .swiperbox {
                width: 100%;
                height: 100%;


                .van-swipe {
                    width: 100%;

                    // background-color: orange;


                    .van-swipe-item {
                        width: 100%;
                        // background-color: pink;
                    }

                    .category_list {
                        background-color: white;
                        width: 100%;
                        padding: 10px;
                        box-sizing: border-box;

                        .category_title {
                            padding-top: 5px;
                            padding-bottom: 5px;
                            box-sizing: border-box;
                            font-weight: bold;
                        }

                        .small-box {
                            background: #efefef;
                            color: #333;
                            padding: 5px;
                            box-sizing: border-box;
                            border-radius: 10px;
                            text-align: center;
                            width: 120px;

                            &.active {

                                background-color: #FF5934;


                                a {
                                    color: #efefef;
                                }
                            }
                        }


                        .category_group {
                            width: 100%;

                            ul {
                                width: 100%;

                                li {
                                    margin-bottom: 5px;
                                    width: 100%;
                                    display: flex;
                                    align-items: center;
                                    background-color: rgb(242, 242, 242);

                                    .desc {
                                        font-size: 16px;


                                        .info {
                                            margin-top: 5px;
                                            width: 200px;
                                            color: #999;
                                            white-space: nowrap;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                        }
                                    }

                                }
                            }
                        }


                        .category_son_list {
                            width: 100%;

                            ul {
                                width: 100%;
                                display: flex;
                                flex-wrap: wrap;

                                li {
                                    margin-bottom: 20px;
                                    width: 33%;
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: center;
                                    align-items: center;
                                    font-size: 14px;
                                    color: #999;
                                }
                            }
                        }


                        .product-list {
                            width: 100%;

                            ul {
                                width: 100%;
                                display: flex;
                                flex-direction: column;

                                li {
                                    width: 100%;
                                    padding: 5px;
                                    box-sizing: border-box;

                                    .product-box {
                                        width: 100%;
                                        display: flex;
                                        align-items: center;
                                        // background-color: pink;
                                        background-color: rgb(248, 248, 248);

                                        .left {
                                            width: 20%;
                                        }

                                        .right {
                                            width: 80%;
                                            height: 70px;
                                            display: flex;
                                            flex-direction: column;
                                            justify-content: center;
                                            font-size: 16px;

                                        }
                                    }


                                }


                            }
                        }


                    }


                }


            }















        }







    }
}
</style>