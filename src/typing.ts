export interface tab {
    bg_img: string
    bg_img_webp: string
    is_default: boolean
    name: string
    page_id: number
    page_type: string
    word_selected_color: string
    word_unselected_color: string
}

export interface HomePage {
    data?: Object,
    default_id?: number,
    default_type?: string,
    tabs?: Array<tab>

}

export interface PageOptions {
    page_type?: string,
    page_id?: number,
    name?: string
}

export interface Section {
    header: object,
    sections: Array<any>,
    seo: object
}


export interface Event {
    is_default: boolean
    name: string
    page_id: number
    page_type: string
}


export interface SkuRules {
    icon_color?: string,
    icon_img?: string,
    is_stock?: true,
    name: string,
    price?: string,
    prop_desc?: string,
    prop_value_id?: number,
    gb: string,
    color: string,
    imgSrc?: string,
    size: string,
    isdefault?:string,
    count: number,
    productId: string,
    productFinallName: string,
    buy_option: Array<any>
}

export interface fatherSku {
    list: Array<any>,
    name: string,
    prop_cfg_id: number,
    activeIndex: number
}

export interface UserInfoMete {
    username?: string,
    password?: string,
    introduction?: any,
    avatar?: any,
    token?: string,
    file?: any
}

export interface File {
    name: string,
    percentage: number,
    raw: any,
    size: number,
    status: string
    uid: number
}

export function isValidKey(
    key: string | number | symbol,
    object: object
): key is keyof typeof object {
    return key in object;
}
