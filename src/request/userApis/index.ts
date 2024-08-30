import server from "../server";

interface starForm {
    productId?: String,
    title?:String,
    keywords?:String,
    price?:String,
    star?: Boolean,
    imgsrc?: String
}

export const star = (options:starForm) => {
    return server({
        url:'/adminapi/star/add',
        method:'POST',
        data:options
    })
}

export const getList = () => {
    return server({
        url:'/adminapi/star/list',
        method:'GET'
    })
}

export const getListOne = (id:string) =>  {
 return server({
      url:`/adminapi/star/list/${id}`,
      method:'GET'
 })
}

export const delStar = (id:string) => {
    return server({
        url: `/adminapi/star/list/${id}`,
        method:'delete'
    })
}

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
    thisid:number
}

export const Addaddress = (local:local) => {
    return server({
        url: '/adminapi/address/add',
        method:'POST',
        data:local
    })
}


export const getAddress = () => {
    return server({
        url:'/adminapi/address/list',
        method:"GET"
    })
}

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
_id?: string
}

export const editAddress = (addressInfo:addressInfo) => {

    return server({
        url:'/adminapi/address/editList',
        method:"POST",
        data:addressInfo
    })
}

export const delAddress = (id:string) => {
    return server({
        url:`/adminapi/address/list${id}`,
        method:'delete'
    })
}
