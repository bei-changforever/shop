<template>
    <div class="personself">
        <van-nav-bar title="个人信息" left-text="返回" left-arrow @click-left="onClickLeft" />

        <div class="card-box">
            <el-card>
                <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="90px" class="demo-ruleForm"
                    status-icon>
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="userForm.username" />
                    </el-form-item>

                    <el-form-item label="个人介绍" prop="introduction">
                        <el-input v-model="userForm.introduction" type="textarea" />
                    </el-form-item>
                    <el-form-item label="头像" prop="avatar">

                        <el-upload class="avatar-uploader"
                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :show-file-list="false"
                            :auto-upload="false" :on-change="handleChange">
                            <img v-if="userForm.avatar" :src="uploadAvatar" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>

                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">更新</el-button>

                    </el-form-item>

                </el-form>

            </el-card>
        </div>

    </div>
</template>

<script setup lang="ts">
import { computed, toRefs, ref, reactive } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import type { UserInfoMete, File } from '@/typing';
import { loginStatus } from '@/stores/Login/index';
import { ElMessage } from 'element-plus';
import uplaod from '@/utils/UpLoad'
const { userInfo } = toRefs(loginStatus())
const { setUserInfo } = loginStatus()
const onClickLeft = () => history.back();
const userFormRef = ref()
const userFormRules = reactive({

    username: [
        { required: true, message: '请输入名字', trigger: 'blur' },

    ],
    introduction: [
        { required: true, message: '请输入个人介绍', trigger: 'blur' },

    ],
    avatar: [
        { required: false, message: '请上传头像', trigger: 'blur' },

    ],
})


const userForm = reactive<UserInfoMete>({
    username: userInfo.value.username,
    introduction: userInfo.value.introduction,
    avatar: userInfo.value.avatar,
    file: null
})

const handleChange = (file: File) => {

    userForm.avatar = URL.createObjectURL(file.raw)
    userForm.file = file.raw
}

const uploadAvatar = computed(() => userForm.avatar.includes('blob') ? userForm.avatar : 'http://localhost:3000' + userForm.avatar)

const submitForm = () => {
    userFormRef.value.validate(async (valid: boolean) => {
        if (valid) {


            let res = await uplaod('/adminapi/user/upload', userForm)
            // console.log(res);


            if (res.data.ActionType == 'OK') {
                console.log(res);

                setUserInfo(res.data.data)

                ElMessage.success({
                    message: '更新成功',
                })
            }
        }

    })
}

</script>

<style scoped>
.card-box {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
}

::v-deep .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

::v-deep .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

::v-deep .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

::v-deep .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>