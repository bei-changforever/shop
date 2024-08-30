import { defineStore } from 'pinia';
// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
import { ref, reactive } from 'vue';
import type { PageOptions } from '@/typing'
export const changeHome = defineStore('homeData', () => {
   
    let dataState = reactive({
        options: <PageOptions>{}
    })
    let preIndex = ref(0)
    function setOptions(val: PageOptions) {
        dataState.options = { ...val }
    }
    function setPreIndex(val: number) {
        preIndex.value = val
    }
   
    

    return {
        dataState,
        preIndex,
        setOptions,
        setPreIndex,
      
    }


})
