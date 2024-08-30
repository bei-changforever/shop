import axios from "axios";
import http from "../baseApi";

// 热门搜索 
export const hotSearchApi = () => {
    return http({
        url: 'hisearch/se_default',
        method: 'GET'
    })
};

// 搜索建议 
export const suggestionApi = (key: string) => {
    return axios({
        url: 'https://apis.netstart.cn/xmsc/hisearch/suggestion_v3',
        method: 'GET',
        params: {
            query: key
        }
    })
};

// 搜索列表
interface paramsObj {
    key: string,
    index: string | number,
    size?: string | number,
    sort?: number,
    tag?: number,
};
/*
main_sort 
0 综合排序
1 销量
2 价格从低到高
3 价格从高到低
4 新品优先


filter_tag
0 默认
1 促销
2 分期
3 分期加促销
*/

export const searchListApi = ({ key, index = 1, size = 20, sort = 0, tag = 0 }: paramsObj, loadMore = false) => {
    let paramsObj = {
        query: key,
        page_index: index,
        page_size: size,
        main_sort: sort,
        filter_tag: tag
    }


    if (loadMore) {
        return axios({
            url: 'https://apis.netstart.cn/xmsc/hisearch/query_v3',
            method: 'GET',
            params: paramsObj
        })
    }

    return http({
        url: 'hisearch/query_v3',
        method: 'GET',
        params: paramsObj
    })
}
