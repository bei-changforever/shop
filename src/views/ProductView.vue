<template>
    <div class="product-box">
        <div class="backheader">
            <div
                style="width: 40px; height: 40px; border-radius: 50%; background-color: rgba(0,0,0,.6);display: flex;align-items: center;justify-content: center;">
                <van-icon color="white" name="arrow-left" @click="goback" />
            </div>
        </div>



        <van-skeleton :loading="loading" title :row="20" />


        <div v-if="(<any>state.productInfo) && (<any>state.productInfo).goods_info"
            v-for="(item, index) in (<any>state.productInfo).goods_tpl_datas[(<any>state.productInfo).product_info.page_id].sections ">

            <ProductInfoGallery :previewimg="(<any>state.productInfo).goods_share_datas
                .gallery_view
            " :data="(<any>state.productInfo).goods_info" class="product_info_product_gallery"
                v-if="item.view_type == 'product_info_product_gallery'"></ProductInfoGallery>

            <Price :data="(<any>state.productInfo).goods_info[0].price" class="product_info_product_price"
                v-if="item.view_type == 'product_info_product_price'" />


            <NewPeople :data="skuOrigin" class="product_info_choose_version"
                v-if="item.view_type == 'product_info_choose_version'" />


            <ProductName :data="(<any>state.productInfo).seo.title" class="product_info_product_name"
                v-if="item.view_type == 'product_info_product_name'" />



            <ProductDesc :data="(<any>state.productInfo).product_info.sell_point_desc" class="product_info_product_desc"
                v-if="item.view_type == 'product_info_product_desc'" />


            <Rank :data="item.body" class="rank_list" v-if="item.view_type == 'rank_list'" />


            <Tag :data="(<any>state.productInfo).goods_info[0] && (<any>state.productInfo).goods_info[0]
            " class="product_info_popnew_product_tag" v-if="item.view_type == 'product_info_popnew_product_tag'" />

            <Activity class="product_info_activity" v-if="item.view_type == 'product_info_activity'" />


            <ProductComment :data="(<any>state.productInfo).goods_share_datas" class="product_info_comment_v2"
                v-if="item.view_type == 'product_info_comment_v2'" />

            <Recommend :data="(<any>state.productInfo).related_recommend
            " class="product_info_recommend" v-if="item.view_type == 'product_info_recommend'" />

            <ProductTab :data="item.body" class="product_info_tab" v-if="item.view_type == 'product_info_tab'" />
        </div>
        <div class="dianzi" style="height: 10vh"></div>



        <van-popup style="border-radius: 20px 20px 0 0;padding: 10px;box-sizing: border-box;" v-model:show="show"
            position="bottom" :style="{ height: '70%' }">



            <div class="product-choose">
                <div class="img">
                    <van-image width="74" height="74" :src="skuOrigin.imgSrc" />
                    <div class="price-content"
                        style="margin-left: 10px;font-size: 14px;font-weight: bold;display: flex;flex-direction: column;line-height: 35px;">
                        <span style="color: #FF6700;font-size: 17px;">
                            ￥{{ skuOrigin.price ? skuOrigin.price : (<any>state.productInfo).goods_info[0].market_price }}
                        </span>
                        <span>

                            {{ skuOrigin.productFinallName }}
                            <!-- {{ skuOrigin.name }}&nbsp;{{ skuOrigin.gb }}&nbsp;{{ skuOrigin.color }} -->


                        </span>
                    </div>

                </div>
                <div class="sku">

                    <div class="sku-box" v-for=" (item, index)  in (<any>state.productInfo).buy_option">
                        <h1>{{ item.name }}</h1>
                        <ul>
                            <li @click="chooseSku(item, i, sku)" :class="item.activeIndex == i ? 'active' : ''"
                                v-for="(sku, i) in item.list">
                                {{ sku.name }}

                            </li>
                        </ul>
                    </div>

                </div>
                <div class="step-value">
                    <span style="font-size: 14px;font-weight: bold;">购买数量</span> <van-stepper v-model="countValue"
                        :disable-minus="countValue == 1" />
                </div>

                <div class="btn-box">
                    <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" class="button" round size="large"
                        @click="clickSure(skuOrigin)">确定</van-button>
                </div>

            </div>



        </van-popup>

        <van-action-bar>
            <van-action-bar-icon icon="chat-o" @click="gotoChat" text="客服" color="#ee0a24" />
            <van-action-bar-icon icon="cart-o" text="购物车" :badge="badge" @click="gotoShoppingbag" />
            <van-action-bar-icon @click="toggleStar((<any>state.productInfo))" :icon="isStar ? 'star' : 'star-o'" text="收藏"
                color="#ff5000" />
            <van-action-bar-button @click="showPopup" type="warning" text="加入购物车" />

        </van-action-bar>



    </div>
    <!-- {{ (<any>state.productInfo).goods_info }} -->
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, ref, watch, computed, toRefs, onActivated } from 'vue';
import { miproduct } from '@/request/projectApis/index';
import type { SkuRules, fatherSku } from '@/typing';
import NewPeople from '@/components/ProductChild/NewPeople.vue';
import Tag from '@/components/ProductChild/Tag.vue';
import Rank from '@/components/ProductChild/Rank.vue';
import Recommend from '@/components/ProductChild/Recommend.vue';
import ProductTab from '@/components/ProductChild/ProductTab.vue';
import ProductName from '@/components/ProductChild/ProductName.vue';
import ProductInfoGallery from '@/components/ProductChild/ProductInfoProductGallery.vue';
import ProductDesc from '@/components/ProductChild/ProductDesc.vue';
import ProductComment from '@/components/ProductChild/ProductComment.vue';
import Price from '@/components/ProductChild/Price.vue';
import Activity from '@/components/ProductChild/Activity.vue';

import { ElMessage } from 'element-plus';
import { star, getListOne, delStar } from '@/request/userApis/index';
import { findOneList } from '@/request/orders/index';
import { changeAddress } from '@/stores/Address/index';
import { addShoppingBag } from '@/request/orders/index';
import { productField } from '@/stores/Product/index';
const { productFieldoptions } = toRefs(productField())
const { addressInfo } = toRefs(changeAddress())
const router = useRouter()
const route = useRoute()
let state = reactive({
    productInfo: {}
})



const goback = () => {
    router.go(-1);
    localStorage.removeItem('productField')

}

const gotoChat = () => {
    router.push('/socket')
}

const loading = ref(true)

let skuOrigin = reactive<SkuRules>({
    name: '',
    gb: '',
    color: '',
    price: '',
    imgSrc: '',
    size: '',
    isdefault: '',
    count: 1,
    productId: '',
    productFinallName: '',
    buy_option: []
})

//数量
const countValue = ref(1);


const badge = computed(() => {
    if (countValue.value == 1) {
        return ""
    }
    else {
        return countValue.value
    }
})

//收藏
const isStar = ref(false)
//获得商品规格
const getProductInfo = async (id: any) => {


    let { data: { data } } = await miproduct(id)


    data.buy_option.forEach((item: fatherSku) => {
        (<any>item).activeIndex = 0
        if (item.name == '版本') {
            skuOrigin.gb = item.list[0].name
            skuOrigin.price = item.list[0].price

        }
        if (item.name == '颜色') {
            skuOrigin.color = item.list[0].name
        }
        if (item.name == '尺寸') {
            skuOrigin.size = item.list[0].name
        }
        if (item.name == '通用') {
            skuOrigin.isdefault = item.list[0].name
        }


    })

    if (!skuOrigin.price) {
        skuOrigin.price = data.goods_info[0].market_price
    }

    skuOrigin.imgSrc = data.goods_info[0].image_share

    skuOrigin.name = data.seo.title

    skuOrigin.productFinallName = skuOrigin.name + skuOrigin.color + skuOrigin.gb + skuOrigin.size + skuOrigin.isdefault
    // 数据未请求为空
    if (data == null || Object.keys(data).length == 0) {
        router.replace({ path: '/404view' });
        return
    };

    state.productInfo = { ...data }
    // console.log('商品数据==>', state.productInfo);
    if (state.productInfo) {
        loading.value = false
    }
}


onMounted(() => {
    // console.log(route.query.id);
    getProductInfo(route.query.id)
})

const productId = ref('')


const getStarList = async (id: any) => {


    let token = localStorage.getItem('shopToken') as string
    if (token) {



        let res = await getListOne(id)

        // console.log(res);

        if (res.data.code == 4000 && res.data.data.length > 0) {
            if (res.data.data[0].star) {
                isStar.value = res.data.data[0].star
            }
        }
        if (res.data.code == 4000 && res.data.data.length == 0) {
            isStar.value = false
        }


    }






}




//商品请求
onActivated(() => {
    if ((<productField>productFieldoptions.value).productId == route.query.id) {
        let options = productFieldoptions.value as productField
        getbagonelist(options);
    }

    (<any>productId).value = route.query.id;

    getProductInfo(route.query.id);
    getStarList(productId.value);
})


//弹框
const show = ref(false);
const showPopup = () => {


    let token = localStorage.getItem('shopToken') as string
    if (token) {
        show.value = true;
    }
    else {
        ElMessage.error({
            message: '请先登录',
        })
    }





};
//选择规格

const chooseSku = (item: fatherSku, i: number, sku: SkuRules) => {
    // console.log(item, i, sku);
    if ((<any>item).activeIndex == i) return
    (<any>item).activeIndex = i
    if (item.name == '版本') {
        if (sku.name) {
            skuOrigin.gb = sku.name
        }
        if (sku.price) {
            skuOrigin.price = sku.price
        }
    }
    if (item.name == '尺寸') {
        if (sku.name) {
            skuOrigin.size = sku.name
        }
    }
    if (item.name == '颜色') {
        if (sku.name) {
            skuOrigin.color = sku.name
        }
    }
    if (item.name == '通用') {
        if (sku.name) {
            skuOrigin.isdefault = sku.name
        }
    }


    (<any>state.productInfo).goods_info.forEach((g: any) => {


        if (g.name.indexOf(skuOrigin.color) !== -1) {

            skuOrigin.imgSrc = g.image_share
        }



    })


    // console.log(skuOrigin);

}

interface starType {
    productId: String,
    title: String,
    keywords: String,
    price: String,
    star: Boolean,
    imgsrc: string,
    isCheck: Boolean
}

//切换收藏
const toggleStar = async (item: any) => {




    let token = localStorage.getItem('shopToken')



    if (token) {




        if (!isStar.value) {
            isStar.value = true

            let options = <starType>{
                productId: route.query.id,
                title: item.seo.title,
                keywords: item.seo.keywords,
                price: item.goods_info[0].market_price,
                star: isStar.value,
                imgsrc: item.goods_info[0].image_share,
                isCheck: false
            }

            await star(options)



        }
        else {
            isStar.value = false
            let id = productId.value
            await delStar(id)
            await getStarList(id)
        }

    }
    else {
        ElMessage.error({
            message: '请先登录',
        })
    }
}


//用户加入购物车

const clickSure = async (item: SkuRules) => {

    console.log(item);


    let token = localStorage.getItem('shopToken')
    if (token) {

        item.count = countValue.value
        item.productId = productId.value
        item.productFinallName = item.name + item.color + item.gb + item.size + item.isdefault
        let options = {
            buy_option: (<any>state.productInfo).buy_option,
            productFinallName: item.name + item.color + item.gb + item.size + item.isdefault,
            skuOrigin: item,
            addressInfo: addressInfo.value,
            productId: productId.value
        }

        let obj = {
            productFinallName: item.productFinallName,
            productId: productId.value
        }

        localStorage.productCount = JSON.stringify(obj)

        if (options) {
            let res = await addShoppingBag(options)
            await getbagonelist(obj)

            if (res.data.code == 4000) {
                ElMessage.success({
                    message: '加入成功'
                })
            }
        }
    }
    else {
        ElMessage.error({
            message: '请先登录',
        })
    }


}

interface productField {
    productId: string,
    productFinallName: string,
}


const getbagonelist = async (options: productField) => {
    let res = await findOneList(options)

    countValue.value = res.data.data[0].skuOrigin.count
    let sku = JSON.parse(localStorage.getItem('productField') as string);
    if (sku) {
        (<any>state.productInfo).buy_option = sku.productFieldoptions.buy_option;

        skuOrigin.productFinallName = sku.productFieldoptions.productFinallName
        skuOrigin.imgSrc = sku.productFieldoptions.img
        skuOrigin.price = sku.productFieldoptions.price
    }

}


const gotoShoppingbag = () => {

    let token = localStorage.getItem('shopToken')
    if (token) {
        router.push({
            path: '/shoppingbag'
        })
    }
    else {
        ElMessage.error({
            message: '请先登录',
        })
    }

}


watch(() => route.query,
    async () => {
        if (route.query.id && route.path == '/product') {
            state.productInfo = {}
            productId.value = route.query.id as any
            getProductInfo(route.query.id)
            getStarList(route.query.id)

            if ((<productField>productFieldoptions.value).productId == route.query.id) {
                let options = productFieldoptions.value as productField
                getbagonelist(options);
            }

        }
    },
    {
        immediate: true
    });


</script>

<style lang="scss" >
.product-box {
    width: 100%;
    background-color: white;
}

.backheader {
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    padding: 10px;
    box-sizing: border-box;
    font-size: 20px;
    z-index: 2;
}

.price {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    font-size: 20px;
    color: #FF6700;
    font-weight: bold;
}

.detail {
    width: 100%;
    height: 100%;
}

.guangao {
    width: 100%;
    padding: 5px;
    box-sizing: border-box;

    .a {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
        justify-content: space-between;
        background-color: rgb(255, 242, 239);

        button {
            width: 50px;
            height: 25px;
            border: none;
            border-radius: 10px;
            background-color: rgb(255, 105, 0);
            color: white;
        }
    }
}

.seo {
    width: 100%;

    ul {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: bold;
        line-height: 20px;
    }
}

.product-choose {
    width: 100%;

    .img {
        display: flex;
        width: 100%;
        align-items: center;

    }

    .sku {
        width: 100%;

        .sku-box {
            width: 100%;
            display: flex;
            flex-direction: column;

            h1 {
                margin-top: 10px;
                margin-bottom: 10px;
                width: 100%;
                font-size: 14px;
                font-weight: bold;
            }

            ul {
                width: 100%;
                display: flex;
                flex-wrap: wrap;

                li {
                    margin-right: 10px;
                    margin-bottom: 10px;
                    padding: 12.5px;
                    text-align: center;

                    &.active {
                        border: 1px solid #FF6700;
                        background-color: rgba(255, 89, 52, .08);
                        color: #f56600;
                    }

                    span {
                        display: block;
                        width: 100%;
                        height: 100%;
                        text-align: center;


                    }


                }
            }
        }
    }

    .step-value {
        width: 100%;

        display: flex;
        justify-content: space-between;
    }

    .btn-box {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        box-sizing: border-box;
        background-color: white;
        z-index: 2;

        .button {

            width: 100%;
        }

    }


}
</style>