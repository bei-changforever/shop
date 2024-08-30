<template>
    <div>
        <van-nav-bar title="地址管理" left-text="返回" left-arrow @click-left="onClickLeft" />

        <van-address-edit :area-list="areaList" show-set-default show-search-result
            :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave"
            />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { areaList } from '@vant/area-data';
import { ElMessage } from 'element-plus';
import { Addaddress, getAddress } from '@/request/userApis/index';
const router = useRouter()
const onClickLeft = () => {
    router.go(-1)
};


interface local {
    addressDetail: string,
    areaCode: string,
    city: string,
    country: string,
    county: string,
    isDefault: Boolean,
    name: string,
    province: string,
    tel: string,
    thisid: number
}

const searchResult = ref([] as any);

const onSave = async (e: local) => {

    if (e.isDefault == true) {
        e.thisid = 1

    }
    else {
        e.thisid = 2


    }


    let res = await Addaddress(e)
    if (res.data.code == 4000) {
        ElMessage.success({
            message: '保存成功',
        })
    }


};







</script>

<style scoped></style>