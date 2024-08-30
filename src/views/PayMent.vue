<template>
    <div class="pay-box">
        <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-empty description="支付成功" />
    </div>
</template>

<script setup lang="ts">
import { sucessPay } from '@/request/orders/index';
import qs from 'qs';
import { onActivated, ref } from 'vue';
import { useRoute ,useRouter} from 'vue-router';
const router = useRouter()
const payStatus = ref(false)
const onClickLeft = () => {
    router.push('/waitforshou')
};
const route = useRoute()
const getData = async () => {
    let data = {
        out_trade_no: route.query.out_trade_no,
        trade_no: route.query.trade_no
    }

    let res = await sucessPay(qs.stringify(data))

    console.log(res);
    if (res.data.code == 2) {
        payStatus.value = true
    }



}

onActivated(() => {
    getData()
})
</script>

<style lang="scss" scoped>
.pay-box {
    width: 100%;
    min-height: 100vh;


}
</style>