<template>
    <div>
        <div v-if="(<any>props.tuijian).category_name == '推荐'">
            <!-- {{ item.category_list[2].body.product_list}} -->
            <div style="height: 550px;overflow: scroll;"
                v-if="(<any>props.tuijian).category_list && (<any>props.tuijian).category_list[0]">
                <div class="category_list">
                    <div class="cells_auto_fill">
                        <van-image :src="(<any>props.tuijian).category_list[0].body.items[0].img_url" />
                    </div>
                    <div class="category_title">
                        {{ (<any>props.tuijian).category_list[1].body.category_name }}
                    </div>
                    <div class="category_group">
                        <ul>
                            <li v-for="(t) in (<any>props.tuijian).category_list[2].body.product_list"
                                @click="gotoProduct(t)">
                                <div class="img">
                                    <van-image width="50px" class="auto-img" :src="t.puzzle_url" />
                                </div>
                                <div class="desc">
                                    <p>{{ t.name }}</p>
                                    <p class="info" v-html="t.product_desc_origin"></p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="category_son_list">
                        <ul>
                            <li @click="skipSearch(s.product_name)" v-for="(s) in (<any>props.tuijian).category_list[3].body.items">
                                <van-image width="50px" :src="s.img_url" />
                                <p>{{ s.product_name }}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
const skipSearch = (searchName:string) => {
    router.push({ path: '/search/list', query: { key: searchName } })
}
const props = defineProps<{
    tuijian: object
}>()




const gotoProduct = (t: any) => {
    console.log(t);
    let id = t.product_id
    console.log(id);
    
    router.push({
        path: '/product',
        query: {
            id
        }
    })
}




</script>

<style scoped></style>