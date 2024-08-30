<template>
    <div class="shopping">
        <van-nav-bar title="购物车" left-arrow @click-left="onClickLeft">
            <template #right>
                <van-icon name="delete" size="18" @click="delAll(BagList)" />
            </template>
        </van-nav-bar>

        <div class="product-box">

            <div v-for="(item, index) in BagList">

                <van-swipe-cell>

                    <van-card :num="item.skuOrigin.count" :price="oneTotalPrice(item.skuOrigin.price, item.skuOrigin.count)"
                        :title="item.skuOrigin.name">
                        <template #desc>
                            <span @click="toggleSku(item)" style="margin-top: 5px;color: #999;display: block;">{{
                                item.skuOrigin.productFinallName }}</span>
                        </template>
                        <template #thumb>
                            <van-image
                                @click="gotoProduct(item.skuOrigin.productId, item.skuOrigin.productFinallName, item.buy_option, item.skuOrigin.imgSrc, item.skuOrigin.price)"
                                width="70" height="70" :src="item.skuOrigin.imgSrc" />
                        </template>
                        <template #footer>
                            <van-checkbox v-model="item.isChoose" @change="onchange(BagList)"></van-checkbox>
                            <van-stepper @change="addProductCount($event, item)" v-model="item.skuOrigin.count"
                                :disable-minus="item.skuOrigin.count == 1" />
                        </template>
                    </van-card>
                    <template #right>
                        <van-button square text="删除" type="danger" class="delete-button" @click="delbtn(item)" />
                    </template>
                </van-swipe-cell>
            </div>
        </div>


        <van-popup style="border-radius: 20px 20px 0 0;padding: 10px;box-sizing: border-box;" v-model:show="show"
            position="bottom" :style="{ height: '70%' }">
            <div class="product-choose">
                <div class="sku">

                    <div class="sku-box" v-for=" (item, index)  in current_buy_options">

                        <h1>{{ (<any>item).name }}</h1>
                        <ul>
                            <li @click="chooseSku(item, i)" :class="(<any>item).activeIndex == i ? 'active' : ''"
                                v-for="(sku, i) in (<any>item).list">
                                {{ sku.name }}
                            </li>
                        </ul>


                    </div>

                </div>
                <div class="btn-box">
                    <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" class="button" round size="large"
                        @click="clickSure(current_buy_options)">确定</van-button>
                </div>

            </div>
        </van-popup>




        <van-submit-bar :price="totalPrice * 100" button-text="提交订单" @submit="onSubmit">
            <van-checkbox v-model="isAll">全选</van-checkbox>
        </van-submit-bar>

    </div>
</template>

<script setup lang="ts">
import { ref, onActivated, computed } from 'vue';
import { findBagList, delList, addCount ,forOrdersDel} from '@/request/orders/index';
import { useRouter } from 'vue-router';
import { productField } from '@/stores/Product/index';
import { ElMessage } from 'element-plus';
import { userChoose } from '@/stores/userChoose/index';
import { creatOrder } from '@/request/orders/index';
import { Orders } from '@/stores/Orders/index';
const { setOrder_id } = Orders()
const router = useRouter()

const { setProductFieldoptions } = productField()

const { setUserChooseProduct } = userChoose()

const onClickLeft = () => {

    // router.go(-1);
    let res = JSON.parse(localStorage.historyClick)
    router.push({ path: res.routerName })

    localStorage.removeItem('productField')
    localStorage.removeItem('userChoose')


}

interface chooeProduct {
    productFinallName: string,
    productId: string,
    price: string,
    addressInfo: any,
    productImgSrc: string,
    count: number
}



const onSubmit = async () => {

    //存一个状态，当有选择的商品才进行跳转，没有则提示


    let res = BagList.value.reduce((pre: any, current: any) => {
        return (pre + (current.isChoose ? 1 : 0))
    }, 0)

    if (res == 0) {
        ElMessage.error({
            message: '未选择商品'
        })
    }
    else {

        let chooeProduct = [] as Array<chooeProduct>
        BagList.value.forEach((item: any) => {
            if (item.isChoose) {
                chooeProduct.push({
                    productFinallName: item.productFinallName,
                    productId: item.productId,
                    price: oneTotalPrice(item.skuOrigin.price, item.skuOrigin.count),
                    addressInfo: item.addressInfo,
                    productImgSrc: item.skuOrigin.imgSrc,
                    count: item.skuOrigin.count
                })
            }
        })

        // let ordersInfo = {
        //订单id
        //商品名字
        //商品价格
        //商品数量
        //商品状态
        // }
        let da = await creatOrder(chooeProduct)
    
        if (da.data.code == 4000) {
            setOrder_id(da.data.order_id)
            ElMessage.success({
                message:'提交订单成功'
            })

            let xck = await forOrdersDel(chooeProduct)
            if(xck.data.code == 2) {
                getUserAddList()
            }
            
            //手动触发删除
            router.push({path: '/pay',query: {oid: da.data.order_id}})
        }

        
        setUserChooseProduct(chooeProduct)
        localStorage.removeItem('productField')


    }



};
const show = ref(false)


const oneTotalPrice = ((num: string, count: number) => {
    let res = 0
    if (num) {
        let num1 = num.match(/\d+(\.\d+)?/g)
        res = Number(num1)
    }

    return (res * count).toFixed(2)
})


const gotoProduct = (t: string, name: string, buy_option: any, img: string, price: string) => {

    let options = {
        productId: t,
        productFinallName: name,
        buy_option,
        img,
        price
    }

    setProductFieldoptions(options)


    router.push({
        path: '/product',
        query: {
            id: t,

        }
    })
}


const clickSure = (item: any) => {
    console.log(item);

}


const chooseSku = (item: any, index: number) => {
    if ((<any>item).activeIndex == index) return
    (<any>item).activeIndex = index
}



const delbtn = async (item: any) => {
    let options = {
        productFinallName: item.productFinallName
    }
    await delList(options)
    getUserAddList()
}



const delAll = async (event: any) => {
    let delArr = [] as any
    if (event) {
        event.forEach(async (item: any) => {
            if (item.isChoose) {

                let options = {
                    productFinallName: item.productFinallName
                }



                delArr.push(options)

                await delList(delArr)
                await getUserAddList()
            }
        })
    }


}



const BagList = ref([] as any)
const getUserAddList = async () => {
    let res = await findBagList()

    if (res.data.code == 4000 && res.data.data) {
        BagList.value = res.data.data
        let userChoose = JSON.parse(localStorage.getItem('userChoose') as string)

        if (userChoose) {


            // console.log(userChoose);


            userChoose.userChooseProduct.forEach((c: any) => {
                BagList.value.forEach((b: any) => {
                    if (c.productFinallName == b.productFinallName) {
                        b.isChoose = true
                        onchange(BagList.value)
                    }
                })
            })


        }

    }


}

const current_buy_options = ref([])

const toggleSku = (item: any) => {
    show.value = true

    current_buy_options.value = item.buy_option

}

const totalPrice = ref(0)

const onchange = (event: any) => {
    // console.log(event);
    let total = 0
    if (event) {
        event.forEach((item: any) => {
            if (item.isChoose) {

                total += Number(oneTotalPrice(item.skuOrigin.price, item.skuOrigin.count))

            }
        })


        totalPrice.value = total

    }

}


const total = computed(() => {
    return BagList.value.length
})

const doneTotal = computed(() => {
    return BagList.value.reduce((pre: any, current: any) => {
        return (pre + (current.isChoose ? 1 : 0))
    }, 0)
})

const isAll = computed({
    get() {
        return doneTotal.value === total.value && total.value > 0
    },
    set(val) {
        checkAllTodo(val)
    }
})


//全选or取消全选
const checkAllTodo = (val: boolean) => {
    BagList.value.forEach((item: any) => {
        item.isChoose = val
    })
}
// const onAllchange = (event: boolean) => {
//     checkAllTodo(event)
// }

const addProductCount = async (event: number, item: any) => {
    //   console.log(event,item);
    await addCount(item)
    onchange(BagList.value)
}



onActivated(() => {
    getUserAddList()
})
</script>

<style lang="scss" scoped>
.shopping {
    width: 100%;
    min-height: 100vh;
    background-color: #f2f2f2;
}

.product-box {
    width: 100%;

}


.goods-card {
    margin: 0;
    background-color: white;
}

.delete-button {
    height: 100%;
}

::v-deep .van-card__footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
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