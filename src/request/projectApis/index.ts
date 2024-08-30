import http from "../baseApi";
import type { PageOptions } from "@/typing";
export const getHomePage = () => {
    return http({
        url: 'home/page',
        method: 'GET'
    })
}
export const getPageNav = ({ page_id, page_type }: PageOptions) => {
    return http({
        url: 'home/page',
        params: {
            page_id,
            page_type 
            
        }
    })
}
export const getCateMainList = () => {
    return http({
        url: 'home/category_v2',
        method:"GET"
    })
}

export const category = (cat_id:any) => {
    return http({
        url: 'home/category_v2',
        method:'GET',
        params: {
            cat_id:cat_id
        }
    })
}


export const home_conf = () => {
    return http({
        url: 'communicate/home_conf',
        method:'GET',
    })
}

export const home_rec = (after:Number) => {
    return http({
        url: `communicate/home_rec?size=10&after=${after}`,
        method:"GET"
    })
}

export const tag_type = (options:any) => {
  return http({
    url: `communicate/tag_detail?tag_id=${options.id}&tag_type=${options.type}`,
    method:'GET'
  })
}

export const miproduct = (id:any) => {
    return http({
        url: `miproduct/view?commodity_id=${id}`,

    })
}

