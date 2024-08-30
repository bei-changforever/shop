import server from "../server";
import qs from 'qs'

interface shopping {
    username: string,
    name: string,
    orderId: string,
    productName: string,
    productId: number,
    price: number,
    count: number,
    payType: number,
    choosePay: number,
    address: string,
    phone: string,
    skuOrigin: any,
    isChoose: Boolean
}



export const addShoppingBag = (shoppingbag:any) => {
    return server({
        url:'/adminapi/orders/add',
        method:'POST',
        data:shoppingbag
    })
}

export const findBagList = () => {
    return server({
        url: '/adminapi/orders/getList',
        method:"GET"
    })
}

export const findOneList = (options:any) => {
    return server({
        url: `/adminapi/orders/getoneList`,
        method:"POST",
        headers: {
            "contentType": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        data:options
    })
}

export const delList = (options:any) => {
    return server({
        url:'/adminapi/orders/delList',
        method:"POST",
        data:options
    })
}

export const addCount = (options:any) => {
    return server({
        url:'/adminapi/orders/addCount',
        method:'POST',
        data:options
    })
}

export const creatOrder = (orders: any) => {
    return server({
        url: '/adminapi/orders/submitOrder',
        method:'POST',
        data: orders
    })
}

export const getOrders = (oid:string) => {
    return server({
        url:`/adminapi/orders/getOrders/${oid}`,
        method:'GET'
    })
}

export const pay = (shop:any) => {
    return server({
        url:'/adminapi/orders/pay',
        method:'POST',
        data:shop
    })
}

export const payment = (info:any) => {
   
    
    return server({
        url:"/adminapi/orders/payment",
        method:'POST',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        },
        data:info
    })
}

export const sucessPay = (info:any) => {
    return server({
        url:'/adminapi/orders/successPayment',
        method:'POST',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        },
        data:info
    })
}

export const getStatusOrder = (id:number) => {
    return server({
        url:`/adminapi/orders/getDifOrder/${id}`,
        method:'GET'
    })
}


export const delOrders = (id:string) => {
    return server({
        url:`/adminapi/orders/delOrders/${id}`,
        method:'POST'
    })
}

export const qrshou = (id:string) => {
    return server({
        url: `/adminapi/orders/changeOrdersState/${id}`,
        method:"POST"
    })
}

export const forOrdersDel = (info:any) => {
return server({
    url: '/adminapi/orders/forOrdersDel',
    method:'POST',
    data:info
})
}