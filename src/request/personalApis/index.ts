import http from "../baseApi";

export const InfoApi = ({ to_mid }: { to_mid: string }) => {
    return http({
        url: `communicate/personal_info?to_mid=${to_mid}`,
        method: "GET",
    })
};

export const DynamicListApi = ({ to_mid, size = 10, after = '' }: { to_mid: string, size?: number, after?: string }) => {
    return http({
        url: `communicate/personal_dynamic_list?to_mid=${to_mid}`,
        method: "GET",
        params: {
            size: size,
            after: after,
        }
    })
};

export const PraisedListApi = ({ to_mid, size = 10, after = '' }: { to_mid: string, size?: number, after?: string }) => {
    return http({
        url: `communicate/personal_praised_list?to_mid=${to_mid}`,
        method: "GET",
        params: {
            size: size,
            after: after,
        }
    })
};