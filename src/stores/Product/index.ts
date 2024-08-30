import { defineStore } from "pinia";
import { ref } from "vue";
export const productField = defineStore('productField',() => {


    //商品数据
    interface productField {
        productId?: string,
        productFinallName?: string,
    }

   

    let productFieldoptions = ref({})

   

    function setProductFieldoptions(val:productField){
        productFieldoptions.value = val
    }


 
    return {
        productFieldoptions,
       
        setProductFieldoptions,
      
    }
},
{
    persist: [
        {
            paths: ['productFieldoptions','userChooseProduct'],
            storage: localStorage
        }
    ]
}
)