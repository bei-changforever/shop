import { defineStore } from 'pinia';
// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
import { ref } from 'vue';
import type { UserInfoMete} from '@/typing'
export const loginStatus = defineStore('logindetail', () => {

    
    let userInfo = ref<UserInfoMete>({})


    function setUserInfo(val: object) {
        userInfo.value = {
            ...userInfo.value,
            ...val
        }
    }


    function clearUserInfo() {
        userInfo.value = {}
      }


    return {
        userInfo,
        setUserInfo,
        clearUserInfo
    }


},
    {
        persist: [
            {
                paths: ['userInfo'],
                storage: localStorage
            }
        ]
    })