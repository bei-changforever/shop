<template>
    <div class="address">

        <van-nav-bar title="地址" left-text="返回" left-arrow @click-left="onClickLeft" />

        <van-address-list v-model="chosenAddressId" :list="list" :disabled-list="disabledList" disabled-text="以下地址超出配送范围"
            default-tag-text="默认" @add="onAdd" @edit="onEdit" @select="onselect" />


        <!-- 底部弹出 -->
        <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '70%' }">


            <van-address-edit ref="addressEditRef" :area-list="areaList" show-delete show-set-default show-search-result
                :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" :address-info="addressInfo"
                @save="onSave" @delete="onDelete" />
        </van-popup>

    </div>
</template>

<script setup lang="ts">
import { ref, onActivated } from 'vue';
import { changeAddress } from '@/stores/Address/index';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { getAddress, editAddress, delAddress } from '@/request/userApis/index';
import formatTime from '@/utils/formartTime';
import { areaList } from '@vant/area-data';
import type { AddressEditInstance } from 'vant';
const router = useRouter()
const onClickLeft = () => history.back();
const showBottom = ref(false);
const showPopup = () => {
    showBottom.value = true;
};
const { setAddressInfo } = changeAddress()
//当前所修改
const addressInfo = ref({})

const searchResult = ref([] as any);
const addressEditRef = ref<AddressEditInstance>()



interface addressInfo {
    address?: string,
    addressDetail?: string,
    areaCode?: string,
    city?: string,
    country?: string,
    county?: string,
    editTime?: string,
    id?: string,
    isDefault?: false,
    name?: string,
    province?: string,
    tel?: string,
    thisid?: number,
    time?: string,
    username?: string,
    __v?: number,
    _id: string
}
//修改保存
const onSave = async (event: addressInfo) => {
    // console.log(addressEditRef.value);


    if (event.isDefault) {
        event.thisid = 1
    }
    else {
        event.thisid = 2
    }
    event.address = ''
    let options = event

    let res = await editAddress(options)

    if (res.data.code == 4000) {
        ElMessage.success('更新成功')
        getLocalAddressSomeOptions()
    }

    //清空详细地址
    // addressEditRef.value?.setAddressDetail('');


}


const onDelete = async (event: addressInfo) => {
    // console.log(event);
    let res = await delAddress(event._id)
    console.log(res);
    if (res.data.code === 4000) {
        ElMessage.success('更新成功')
        getLocalAddressSomeOptions()
    }



}




const list = ref([]);

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
    address: string,
    thisid: number
    id: string,
    time: string
    editTime: string
}


const chosenAddressId = ref('1');
const getLocalAddressSomeOptions = async () => {
    let res = await getAddress()

    if (res.data.code == 4000) {
        res.data.data.forEach((item: local) => {

            let address = `${item.province}${item.city}${item.county}${item.addressDetail}`
            let id = item.thisid
            let time = formatTime.getTime(item.editTime)

            item.time = time
            item.address = address
            item.id = String(id)


        })
        let pre = res.data.data.sort((a: local, b: local) => {
            return a.thisid - b.thisid
        })

        // console.log(pre);

        list.value = pre

        let a = JSON.parse(localStorage.getItem('addressInfo') as string).addressInfo


        list.value.forEach((i: any) => {
            if (a.address == i.address && a.tel == i.tel && a.name == i.name) {

                i.id = '1'

                i.thisid = 1

            }
            else {
             
                
                i.id = '2'
                i.thisid = 2
            }

        })

     

    }

}


onActivated(() => {
    getLocalAddressSomeOptions()
})

//格式化时间




const disabledList = [
    {
        id: '3',
        name: '迪迦奥特曼',
        tel: '1320000000',
        address: '光之国',
    },
];

const onAdd = () => {
    let token = localStorage.getItem('shopToken') as string

    if (token) {
        router.push('/addaddress')
    }
    else {
        ElMessage.error({
            message: '请先登录',
        })
    }

};
const onEdit = (item: addressInfo, index: number) => {
    addressInfo.value = item
    let token = localStorage.getItem('shopToken') as string

    if (token) {
        showPopup()
    }
    else {
        ElMessage.error({
            message: '请先登录',
        })
    }

};

const onselect = (item: addressInfo, index: number) => {

    list.value.forEach((i:any) => {
        i.id = '2',
        i.thisid = 2
    })

    item.id = '1'
    item.thisid = 1

    setAddressInfo(item)

}


</script>

<style lang="scss" scoped>
.address {
    width: 100%;
    height: 100vh;
    background-color: #f2f2f2;

}

::v-deep .van-popup {
    border-radius: 20px 20px 0 0;
}
</style>