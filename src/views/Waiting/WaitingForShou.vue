<template>
    <div class="shou">
        <van-nav-bar title="待收货" left-arrow @click-left="onClickLeft">
        </van-nav-bar>

        <div class="s-box">

            <div class="card-box" v-for="(item, index) in order">
                <van-cell title="订单编号" :value="(<any>item).order_id" />
                <van-card v-for="(o, i ) in (<any>item).goodsName" :num="o.count" :price="o.price"
                    :title="o.productFinallName" :thumb="o.goodsImg">
                </van-card>

                <div class="b-btn">
                    <p style="font-size: 14px;color: #999;">共计:<span style="color: black;font-weight: bold;">￥{{ (<any>item).goodsPrice }}</span></p>
                    <van-button type="primary" size="large" @click="makeSure(item)">确认收货</van-button>

                </div>
            </div>


        </div>
    </div>
</template>

<script setup lang="ts">
import { getStatusOrder, qrshou } from '@/request/orders/index';
import { onActivated, ref } from 'vue';
import { useRouter } from 'vue-router';
import { showConfirmDialog } from 'vant';
const router = useRouter()
const onClickLeft = () => {
    router.push('/my')
}

const order = ref([])

const getList = async () => {
    let res = await getStatusOrder(3)
    if (res.data.code == 2 && res.data.data) {
        order.value = res.data.data
        console.log(order.value);
        
    }
}

onActivated(() => {
    getList()

})

const makeSure = (item: any) => {

    showConfirmDialog({
        title: '确认收货',
        message: '请核对货款无误',

    })
        .then(async () => {
            // on confirm

            let res = await qrshou(item.order_id)
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
            margin-bottom: 10px;
            padding-bottom: 10px;

            .b-btn {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-around;

                .van-button {
                    width: 60%;
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