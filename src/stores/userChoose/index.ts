import { defineStore } from "pinia";
import { reactive, ref } from "vue";
export const userChoose = defineStore('userChoose', () => {
    //用户选择的商品
    let userChooseProduct = ref([])
    function setUserChooseProduct(val: any) {
        userChooseProduct.value = val
    }

    return {
        userChooseProduct,
        setUserChooseProduct
    }

},{
    persist: [
        {
            paths: ['userChooseProduct'],
            storage: localStorage
        }
    ]
})