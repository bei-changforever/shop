<template>
    <div class="my">
        <div class="header">
            <div class="user" v-if="!userInfo.username" @click="gotoLogin">
                <div class="img">
                    <van-image round width="50" height="50" src="https://m.mi.com/static/img/avatar.76a75b8f17.png" />
                </div>
                <div class="name">未登录<van-icon name="arrow" /></div>
            </div>
            <div class="user" v-else @click="gotoPersonSelf">
                <div class="img">
                    <van-image width="50" height="50" :src="avatarUrl" round />
                </div>
                <div class="name" style="color: black;">{{ userInfo.username }}<van-icon name="arrow" /></div>
            </div>
        </div>
        <h2 style="width: 100%;padding: 10px;box-sizing: border-box;font-size: 16px;">
            <span>简介:</span> {{ userInfo.introduction }}
        </h2>
        <div class="tab">
            <van-grid>
                <van-grid-item icon="balance-list-o" @click="gotoWaitpay" text="待付款" />
                <van-grid-item @click="gotoShou" icon="logistics" text="待收货" />
                <van-grid-item icon="todo-list-o" @click="gotoOOOO" text="订单" />
                <van-grid-item icon="star-o" @click="gotoStar" text="收藏" />
            </van-grid>
        </div>
        <div class="setting">
            <van-cell-group>
                <van-cell title="设置" @click="gotoAddress" is-link />
                <van-cell @click="logout" v-if="userInfo.username" title="退出" is-link />
            </van-cell-group>
        </div>
    </div>
</template>

<script setup lang="ts">
import { showConfirmDialog } from 'vant';
import { useRouter } from 'vue-router';
import { toRefs, computed } from 'vue';
import { loginStatus } from '@/stores/Login/index';
import { ElMessage } from 'element-plus';
const { userInfo } = toRefs(loginStatus())
const { clearUserInfo } = loginStatus()
const router = useRouter()
const gotoLogin = () => {
    showConfirmDialog({
        title: '《商城用户协议》',
        message: '请您仔细阅读以上协议，其中有对您权利义务的特别约定等重要条款，同意后方可使用本软件',

    })
        .then(() => {
            // on confirm
            console.log('confirm');
            router.push('/login')

        })
        .catch(() => {
            // on cancel
            console.log('cancel');

        });
}

const gotoPersonSelf = () => {
    router.push('/personself')
}

const avatarUrl = computed(() => userInfo.value.avatar ? 'http://localhost:3000' + userInfo.value.avatar : 'https://m.mi.com/static/img/avatar.76a75b8f17.png')

const logout = () => {
    router.push('/login')
    clearUserInfo()
    localStorage.removeItem('logindetail')
    localStorage.removeItem('shopToken')
    localStorage.removeItem('addressInfo')
    localStorage.removeItem('userChoose')

}

const gotoStar = () => {
    let token = localStorage.getItem('shopToken') as string
    if (token) {
        router.push('/star')
    }
    else {
        ElMessage.error({
            message: '请先登录',
        })
    }

}

const gotoAddress = () => {
    let token = localStorage.getItem('shopToken') as string
    if (token) {
        router.push('/address')
    }
    else {
        ElMessage.error({
            message: '请先登录',
        })
    }
}

const gotoShou = () => {
    let token = localStorage.getItem('shopToken') as string
    if (token) {
        router.push('/waitforshou')
    }
    else {
        ElMessage.error({
            message: '请先登录',
        })
    }

}

const gotoWaitpay = () => {
    let token = localStorage.getItem('shopToken') as string
    if (token) {
        router.push('/waitforpay')
    }
    else {
        ElMessage.error({
            message: '请先登录',
        })
    }
}

const gotoOOOO = () => {
    let token = localStorage.getItem('shopToken') as string
    if (token) {
        router.push('/historyorders')
    }
    else {
        ElMessage.error({
            message: '请先登录',
        })
    }
}

</script>

<style lang="scss" scoped>
.my {
    width: 100%;

    .header {
        width: 100%;
        height: 150px;
        background-image: url('@/assets/images/pexels-stephan-seeber-1772973.jpg');
        background-size: 100%;
        background-position: center;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        .user {
            padding: 10px;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            align-items: center;
            color: white;
            font-size: 16px;

            .img {
                width: 50px;
                margin-right: 10px;
            }
        }
    }
}
</style>