<template>
    <div class="pay">
        <van-nav-bar title="确认订单" left-arrow @click-left="onClickLeft">
        </van-nav-bar>

        <div class="order-box">


            <div class="address-box">
                <div class="style-box" @click="gotoAddress">

                    <div class="left">
                        <svg t="1680623544665" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2821" width="20" height="20">
                            <path
                                d="M235.640471 852.931765c0 66.349176 122.925176 120.124235 274.567529 120.124235s274.567529-53.775059 274.567529-120.124235-122.925176-120.124235-274.567529-120.124236-274.567529 53.790118-274.567529 120.124236z"
                                fill="#F89EEF" p-id="2822"></path>
                            <path
                                d="M400.067765 838.866824c0 26.608941 49.302588 48.188235 110.140235 48.188235s110.140235-21.579294 110.140235-48.188235-49.302588-48.188235-110.140235-48.188236-110.140235 21.579294-110.140235 48.188236z"
                                fill="#F89EEF" p-id="2823"></path>
                            <path
                                d="M508.491294 837.872941S351.623529 689.347765 265.351529 566.226824a301.402353 301.402353 0 0 1-54.076235-184.094118A300.197647 300.197647 0 0 1 508.491294 82.672941c161.415529 0 293.842824 131.117176 300.42353 299.459765A300.604235 300.604235 0 0 1 753.92 566.211765c-86.482824 124.837647-245.428706 271.661176-245.428706 271.661176z"
                                fill="#783CF9" p-id="2824"></path>
                            <path
                                d="M384.346353 381.605647a125.861647 125.861647 0 1 0 125.861647-125.861647 125.861647 125.861647 0 0 0-125.861647 125.861647z"
                                fill="#FFFFFF" p-id="2825"></path>
                        </svg>
                    </div>
                    <div class="center" v-if="(<any>addressList).name ">
                        <p class="name">{{ (<any>addressList).name }}&nbsp;{{ (<any>addressList).tel }}</p>
                        <p class="city">{{ (<any>addressList).address }}</p>
                    </div>
                    <div class="center" v-else>
                        <p>请选择地址</p>
                    </div>
                    <div class="right">
                        <van-icon color=" #999" name="arrow" />
                    </div>

                </div>
            </div>
            <div class="product-box">


                <div style="width: 100%;background-color: white;border-radius: 10px;">


                    <van-card :num="item.count" :price="item.price" desc="优品甄选" :title="item.productFinallName"
                        v-for="(item, index) in (<any>userChooseInfo).goodsName" :thumb="item.goodsImg">
                    </van-card>


                    <van-cell-group>
                        <van-cell title="订单编号" :value="(<any>userChooseInfo).order_id" is-link />
                        <van-cell title="配送服务" value="快递免邮送运费险，现货付款后48小时内发货" is-link />
                        <van-cell title="开具发票" value="增值税电子普通发票-明细-个人" is-link />
                    </van-cell-group>


                    <ul>
                        <li v-for="( item, index) in payType" @click="choosePayType(item, index)">
                            <van-icon :color="activeIndex == index ? item.selectIcon : '#999'" size="50"
                                :name="item.name" />

                        </li>

                    </ul>
                </div>


            </div>
        </div>
        <div class="dianzi" style="height: 10vh;"></div>
        <van-submit-bar :price="(<any>userChooseInfo).goodsPrice * 100" button-text="结算" @submit="onSubmit" />
    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ref, onActivated } from 'vue';
import { getOrders, pay, payment } from '@/request/orders/index';
import { ElMessage } from 'element-plus';
import qs from 'qs'
const router = useRouter()
const route = useRoute()
const onClickLeft = () => {
    router.go(-1)
}

const gotoAddress = () => {
    router.push('/address')
}

const payType = ref([
    {
        selectIcon: `rgb(80,182,116)`,
        isChoose: false,
        name: 'wechat',
        paytype: 0
    }
    , {
        selectIcon: `rgb(6,180,253)`,
        isChoose: false,
        name: 'alipay',
        paytype: 1
    }
])

interface chooeProduct {
    productFinallName: string,
    productId: string,
    price: string,
    addressInfo: any,
    productImgSrc: string,
    count: number
}


const addressList = ref({})



const userChooseInfo = ref({})

const getUserOrder = async (oid: string) => {
    let res = await getOrders(oid)

    if (res.data.code == 4000 && res.data.data) {
        userChooseInfo.value = res.data.data[0]



    }

}


onActivated(() => {


    let oid = route.query.oid ? route.query.oid : JSON.parse(localStorage.getItem('Orders') as string).order_id

    if (oid || route.query.oid) {
        getUserOrder(oid)
    }



    let address = JSON.parse(localStorage.getItem('addressInfo') as string)


    if (address) {
        addressList.value = address.addressInfo
    }

})


const activeIndex = ref(1)
const choosePayType = (item: any, index: number) => {
    if (activeIndex.value == index) return


    if (activeIndex == item.payType) {
        item.isChoose = true
    } else {
        item.isChoose = false
    }
    activeIndex.value = index

}

const onSubmit = async () => {

    if (addressList.value) {
        let shop = {
            order_id: route.query.oid ? route.query.oid : JSON.parse(localStorage.getItem('Orders') as string).order_id,
            shopArr: userChooseInfo.value
        }
        //修改订单状态 
        let res = await pay(shop)
        //删除购物车数据
        if (res.data.code == 4000) {

            let name = [] as any
            (<any>userChooseInfo.value).goodsName.forEach((item:any) => {
                name.push(item.productFinallName)
            })


            let dataOrder = {
                order_id: route.query.oid ? route.query.oid : JSON.parse(localStorage.getItem('Orders') as string).order_id,
                name: name.join(''),
                price: (<any>userChooseInfo.value).goodsPrice
            }

            let reback = await payment( qs.stringify(dataOrder)  )
      
            if(reback.data.code == 4000) {
                window.location.href = reback.data.paymentUrl
            }

        }
    }
    else {
        ElMessage.error({
            message:"请选择地址"
        })
    }





}


</script>

<style lang="scss" scoped>
.pay {
    width: 100%;
    min-height: 100vh;
    background-color: #f2f2f2;

    .order-box {
        width: 100%;

        .address-box {
            width: 100%;
            padding: 10px;
            box-sizing: border-box;

            .style-box {
                background-color: white;
                border-radius: 10px;
                width: 100%;
                min-height: 90px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                box-sizing: border-box;

                .left {
                    width: 10%;
                    text-align: center;
                }

                .center {
                    width: 80%;
                    font-size: 14px;

                    .name {
                        font-size: 16px;
                        margin-bottom: 10px;
                    }

                    .city {
                        color: #999;
                    }
                }

                .left {
                    width: 10%;

                }
            }
        }

        .product-box {
            width: 100%;
            padding: 10px;
            padding-top: 0px;

            box-sizing: border-box;

            ul {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;

                li {
                    width: 50%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 0;
                }
            }
        }


    }
}

::v-deep .van-card {
    background-color: white;
    border-radius: 10px;
}
</style>