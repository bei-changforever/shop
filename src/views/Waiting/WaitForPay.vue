<template>
    <div class="shou">
        <van-nav-bar title="待支付" left-arrow @click-left="onClickLeft">
        </van-nav-bar>

        <div class="s-box">

            <div class="card-box" v-for="(item, index) in order">
                <van-cell title="订单编号" :value="(<any>item).order_id" />
                <van-card v-for="(o, i ) in (<any>item).goodsName" :num="o.count" :price="o.price"
                    :title="o.productFinallName" :thumb="o.goodsImg">
                </van-card>

                <div class="b-btn">
                    <van-button type="primary" size="large" @click="gotoPay(item)">前往支付</van-button>
                    <van-button type="warning" size="large" @click="del(item)">取消订单</van-button>
                </div>

            </div>


        </div>
    </div>
</template>

<script setup lang="ts">
import { getStatusOrder, delOrders } from '@/request/orders/index';
import { onActivated, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Orders } from '@/stores/Orders/index';
import { showConfirmDialog } from 'vant';
const { setOrder_id } = Orders()
const router = useRouter()
const onClickLeft = () => {
    router.go(-1)
}

const order = ref([])
const getList = async () => {
    let res = await getStatusOrder(1)
    if (res.data.code == 2 && res.data.data) {
        order.value = res.data.data
    }
}
onActivated(() => {
    getList()

})

const gotoPay = (item: any) => {


    setOrder_id(item.order_id)
    router.push({ path: '/pay', query: { oid: item.order_id } })
}


const del = (item: any) => {


    showConfirmDialog({
        title: '确认删除吗?',
        message: '你确认删除该订单吗?',

    })
        .then(async () => {
            // on confirm
            localStorage.removeItem('Orders')
            let res = await delOrders(item.order_id)
            if (res.data.code == 2) {
                getList()
            }

        })
        .catch(() => {
            // on cancel
            console.log('cancel');

        });





}
</script>

<style lang="scss" scoped>
.shou {
    width: 100%;
    min-height: 100vh;
    background-color: #f2f2f2;

    .s-box {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;

        .card-box {
            width: 100%;
            background-color: white;
            border-radius: 10px;
            padding-bottom: 10px;
            margin-bottom: 10px;


            .b-btn {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-around;

                .van-button {
                    width: 40%;
                }
            }
        }
    }

}

::v-deep .van-card {
    background-color: white;
    border-radius: 10px;
}

::v-deep .van-cell {
    border-radius: 10px;
}
</style>