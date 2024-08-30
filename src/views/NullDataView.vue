<template>
    <div class="null-view">
        <img src="../assets/images/404view-bg.png">
        <p>商品不存在或未上架</p>
        <div class="btn-box">
            <div class="btn" @click="goHome">去首页</div>
            <div class="btn" @click="backFun">返回上一页</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const backFun = () => {
    router.go(-1);
};

const goHome = () => {
    router.push({ path: '/' })
};
</script>

<style scoped lang="scss">
.null-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 80vh;

    img {
        margin-bottom: 2vh;
        width: 50vw;
    }

    p {
        font-size: 16px;
        font-weight: 600;
    }

    .btn-box {
        display: flex;
        justify-content: space-around;
        margin-top: 4vh;
        width: 100%;

        .btn {
            width: 100px;
            height: 30px;
            line-height: 25px;
            text-align: center;
            font-size: 16px;
            border: 1px solid #ff4a00;
            border-radius: 20px;
            color: #ff4a00;
            box-shadow: 2px 2px 2px 1px #ff4a00;
        }
    }
}
</style>