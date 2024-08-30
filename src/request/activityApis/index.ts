import http from "../baseApi";

// 活动专题页面
export const activityViewApi = (id: number | string) => {
    return http({
        url: '/home/channel1_info',
        method: 'GET',
        params: {
            page_id: id
        }
    })
};