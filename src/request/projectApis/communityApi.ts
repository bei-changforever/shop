import http from "../baseApi";

export const home_rec = (after: Number) => {

    return http({
        url: `communicate/home_rec?size=10&after=${after}`,
        method: "GET",
    })
}

const urlApi: { [key: number | string]: any } = {
    1: (id: number | string) => {
        return `communicate/content_detail?&content_id=${id}`
    },
    2: (id: number | string) => {
        return `communicate/article_detail?id=${id}`
    },
    3: (id: number | string) => {
        return `communicate/article_detail?id=${id}`
    },
    5: (id: number | string) => {
        return `communicate/vote_detail?vote_id=${id}`
    },
    6: (id: number | string) => {
        return `communicate/question_detail?q_id=${id}&product_id=0`
    },
    99: (id: number | string) => {
        return `moment/get_moment_by_idlist?moment_id_list=${id}`
    },
    100: (id: number | string) => {
        return `communicate/mizone_product_comment_detail?comment_id=${id}`
    }

};
export const comment_detail = (id: number | string, type: number | string) => {

    let url = urlApi[type](id);

    return http({
        url: url,
        method: "GET",
    })

};

const commentApi: { [key: number | string]: any } = {
    1: (id: number | string, size: number) => {
        let page_size = size * 10;
        return `communicate/comment_display_list?content_id=${id}&is_feature=false&size=${page_size}&page=1&is_summary=false`
    },
    2: (id: number | string, size: number) => {
        let page_size = size * 10;
        return `communicate/comment_display_list?content_id=${id}&is_feature=false&size=${page_size}&page=1&is_summary=false`
    },
    3: (id: number | string, size: number) => {
        let page_size = size * 10;
        return `communicate/comment_display_list?content_id=${id}&is_feature=false&size=${page_size}&page=1&is_summary=false`
    },
    5: (id: number | string, after: number | string) => {
        return `communicate/comment_display_list?content_id=${id}&is_feature=false&size=5&page=1&is_summary=true&is_vote=true`
    },
    6: (id: number | string, after: number) => {
        after = after > 1 ? (after * 10 + 1) : after;
        return `communicate/question_answer_list?q_id=${id}&top_answer_id&size=10&after=${after}&page=1&need_secondary=true&is_hot=false`
    },
    99: (id: number | string, size: number) => {
        let page_size = size * 10;
        return `communicate/mizone_comment_list?comment_type=moment&moment_id=${id}&page_size=${page_size}&page_index=1`
    },
    100: (id: number | string, size: number) => {
        let page_size = size * 10;
        return `communicate/mizone_comment_list?comment_type=product_comment&product_comment_id=${id}&page_size=${page_size}&page_index=1`
    }
};

export const comment_list = (id: number | string, type: number | string, index: number | string = 1) => {
    let url = commentApi[type](id, index);

    return http({
        url: url,
        method: "GET",
    })
};