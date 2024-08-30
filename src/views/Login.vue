<template>
    <div class="login">

        <van-nav-bar title="登陆" left-text="返回" left-arrow @click-left="onClickLeft" />
        <Particles id="tsparticles" class="login__particles" :options="particles" />
        <div class="form-container">

            <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="loginRules" label-width="80px"
                class="demo-ruleForm">

                <el-form-item label="username" prop="username">
                    <el-input v-model="loginForm.username" autocomplete="off" />
                </el-form-item>

                <el-form-item label="password" prop="password">
                    <el-input v-model="loginForm.password" type="password" autocomplete="off" />
                </el-form-item>

                <el-form-item>
                    <el-button type="success" @click="submitForm">login</el-button>
                    <el-button type="primary" @click="showPopup">register</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="danger" @click="gotoForget">forget?</el-button>
                </el-form-item>
            </el-form>
        </div>

        <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '30%' }">
            <div class="register-box">
                <el-page-header style="font-size: 16px;" title="register" icon=""></el-page-header>



                <el-form ref="registerFormRef" :model="registerForm" status-icon :rules="registerRules" label-width="80px"
                    class="demo-ruleForm">

                    <el-form-item label="username" prop="username">
                        <el-input v-model="registerForm.username" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="password" prop="password">
                        <el-input v-model="registerForm.password" type="password" autocomplete="off" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="success" @click="registerSubmit">sure</el-button>
                    </el-form-item>
                </el-form>


            </div>

        </van-popup>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { particles } from '@/utils/particles-config';
import { loginStatus } from '@/stores/Login/index';
import { useRouter } from 'vue-router';
import { getLogin, register } from '@/request/Login/index';
import { ElMessage } from 'element-plus';
const router = useRouter()
const onClickLeft = () => history.back();
const { setUserInfo } = loginStatus()

const showBottom = ref(false);
const showPopup = () => {
    showBottom.value = true;
};

//表单绑定的响应式对象
const loginForm = reactive({
    username: '',
    password: ''
})

//表单的引用对象
const loginFormRef = ref()

const checkUserName = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('Please input the keywords'))
    }

    setTimeout(() => {
        if (!/\S{2,10}/.test(value)) {
            callback(new Error('maxLength 5 ~ 10'))
        }
        else {
            callback()
        }
    }, 1000)

}


const loginRules = reactive({
    username: [
        {
            required: true, message: '请输入用户名', trigger: 'blur',
            validator: checkUserName
        }
    ],
    password: [
        {
            required: true, message: '请输入密码', trigger: 'blur'
        },
        { min: 3, max: 6, message: '长度3~5个数子或字符', trigger: 'blur' },
    ]
})


const submitForm = () => {

    //1.校验表单
    loginFormRef.value.validate(async (valid: boolean) => {

        if (valid) {
            // console.log(loginForm);
            let res = await getLogin(loginForm)
            console.log(res);
            if (res.data.ActionType == 'OK') {
                setUserInfo(res.data.data)
                ElMessage.success({
                    message: res.data.message,
                })
                router.push('/my')
            }
            else {
                ElMessage.error({
                    message: res.data.error,
                })
            }

        }

    })
    //2.拿到表单内容，提交后台
    //3.设置token
    // localStorage.setItem('token', JSON.stringify('123123'))
}




//注册
const registerFormRef = ref()
const registerForm = reactive({
    username: '',
    password: ''
})
const registerRules = reactive({
    username: [
        {
            required: true, message: '请输入用户名', trigger: 'blur',
            validator: checkUserName
        }
    ],
    password: [
        {
            required: true, message: '请输入密码', trigger: 'blur'
        },
        { min: 3, max: 6, message: '长度3~5个数子或字符', trigger: 'blur' },
    ]
})

const registerSubmit = () => {
    registerFormRef.value.validate(async (valid: boolean) => {
        if (valid) {

            console.log(registerForm);

            let res = await register(registerForm)
            console.log(res);
            if (res.data.code === 4000) {
                ElMessage.error({
                    message: '此用户已注册'
                })
            }
            else {
                ElMessage.success({
                    message: res.data.message,
                })
            }
        }
    })
}

const gotoForget = () => {
    router.push('/forget')
}


</script>

<style lang="scss" scoped>
.login {
    width: 100%;



    .form-container {
        width: 90%;

        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(255, 255, 255, .6);
        color: white;
        padding: 20px;
        box-sizing: border-box;
        border-radius: 20px;

    }
}

::v-deep .el-form-item__label {
    color: white;
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
    color: white;
}

.register-box {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
}

::v-deep .van-popup {
    border-radius: 20px 20px 0 0;
    background-color: rgba(255, 255, 255, .6);
}
</style>