
import { defineStore } from 'pinia';
// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
import { ref } from 'vue';


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
    __v?:number,
    _id: string
    }



export const changeAddress = defineStore('addressInfo',() => {
    let addressInfo = ref({})
    function setAddressInfo(val:addressInfo) {
        addressInfo.value = val
    }

    return {
        addressInfo,
        setAddressInfo
    }
},
 {
    persist: [
        {
            paths: ['addressInfo'],
            storage: localStorage
        }
    ]
 })
