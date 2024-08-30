<template>
    <div class="forget">
        <van-nav-bar title="修改密码" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="form-container">




            <van-cell-group inset>
                <van-field v-model="changeForm.username" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
            </van-cell-group>



            <van-cell-group inset>
                <van-field v-model="changeForm.sms" center clearable label="短信验证码" placeholder="请输入短信验证码"
                    :rules="[{ required: true, message: '请输入短信验证码' }]">
                    <template #button>
                        <van-button size="small" type="primary" @click="send" v-if="!have">发送验证码</van-button>
                        <van-button style="width: 77px;height: 33px;" type="success" disabled v-else>{{ second
                        }}</van-button>
                    </template>
                </van-field>
            </van-cell-group>


            <van-cell-group inset>

                <van-field v-model="changeForm.password" type="password" label="新密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写新密码' }]" />
            </van-cell-group>



            <div style="margin: 16px;">
                <van-button round block type="primary" @click="submitForm">
                    提交
                </van-button>
            </div>



        </div>


    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { reactive, ref, toRefs, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { loginStatus } from '@/stores/Login/index';
import { sendsms, changePassword } from '@/request/Login/index';
import { showNotify } from 'vant';
import type { FormInstance } from 'vant';
const router = useRouter()
const timer = ref()
const have = ref(false)
const currentCode = ref(null)
const second = ref(60)
const onClickLeft = () => history.back();
//修改密码

const changeFormRef = ref<FormInstance>()
const changeForm = reactive({
    username: '',
    sms: '',
    password: ''
})

const send = async () => {
    console.log(changeForm.username);

    if (timer.value) {
        clearInterval(timer.value)
    }
    if (changeForm.username.trim().length == 0) {
        ElMessage.error({
            message: '请输入用户名',
        })
    }
    else {
        // '/adminapi/user/changPassword'
        let res = await sendsms(changeForm)
        console.log(res);
        if (res.data.code == 4000) {
            ElMessage.success({
                message: '发送成功',
            })

            have.value = true
            currentCode.value = res.data.data.sms


            showNotify({ type: 'success', message: `您的验证码为:${res.data.data.sms}`, duration: 3000 });



            timer.value = setInterval(() => {
                second.value -= 1
                if (second.value <= 0) {
                    have.value = false
                    clearInterval(timer.value)
                }

                // console.log(second.value);

            }, 1000)
        }

    }



}

const submitForm = async () => {


    console.log(changeForm);

    if (changeForm.password.length !== 0 && changeForm.username.length !== 0 && changeForm.sms.length !== 0) {



        if (changeForm.sms == currentCode.value) {
            let res = await changePassword(changeForm)
            console.log(res);
            if (res.data.code == 4000) {
                ElMessage.success({
                    message: '修改成功',
                })
                router.push('/login')
            }
            else {
                ElMessage.error({
                    message: '检测到用户后续更改'
                })
            }
        }
        else {
            ElMessage.error({
                    message: '验证码失效'
                })
        }








    }


}


onMounted(() => {
    if (timer.value) {
        clearInterval(timer.value)
    }
})
</script>

<style lang="scss" scoped>
.forget {
    width: 100%;


    .form-container {
        width: 100%;


    }
}


::v-deep .el-form-item__label {
    color: black;
}

::v-deep .el-form-item__content {
    display: flex;
}

::v-deep .van-nav-bar {
    background-color: transparent;

    &::after {
        border: none;
    }
}

::v-deep .van-nav-bar__title {
    color: black;
}
</style>