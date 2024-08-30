import { defineStore } from "pinia";
import { ref } from "vue";

export const Orders = defineStore('Orders',( )=> {
    //订单
    let order_id = ref('')

    function setOrder_id(val:string) {
        order_id.value = val
    }
  

     return {
        order_id ,
        setOrder_id
     }
},
{
    persist:[
        {
            paths:['order_id'],
            storage: localStorage
        }
    ]
})