<template>
    <div>
        <div v-if="(<any>props.data).category_name == '电脑平板'">

<div style="height: 550px;overflow: scroll;"
    v-if="(<any>props.data).category_list && (<any>props.data).category_list[0]">

    <div class="category_list">
        <div class="cells_auto_fill">
            <van-image :src="(<any>props.data).category_list[0].body.items[0].img_url" />
        </div>
        <div class="category_title">
            <van-swipe :show-indicators="false" class="my-swipe" :loop="false"
                :width="130" indicator-color="white">

                <van-swipe-item v-for="(x, i) in (<any>props.data).title_list ">
                    <div @click="chooseSonNav(i)"
                        :class="smallBoxActiveIndex == i ? 'active' : ''"
                        class="small-box">
                        <a :href="'#' + x.title">
                            {{ x.title
                            }}
                        </a>

                    </div>
                </van-swipe-item>

            </van-swipe>
        </div>
        <div class="category_title" :id="(<any>props.data).category_list[1].body.category_name">
            {{ (<any>props.data).category_list[1].body.category_name }}
        </div>
        <div class="product-list">

            <ul>
                <li @click="gotoProduct(p)" v-for="(p, index) in (<any>props.data).category_list[2].body.product_list">

                    <div class="product-box">
                        <div class="left">
                            <van-image :src="p.puzzle_url" />
                        </div>

                        <div class="right">
                            <p>{{ p.name }}</p>
                            <p>￥{{ p.price }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>



        <div class="category_title" :id="(<any>props.data).category_list[3].body.category_name">
            {{ (<any>props.data).category_list[3].body.category_name }}
        </div>
        <div class="product-list">

            <ul>
                <li @click="gotoProduct(p)" v-for="(p, index) in (<any>props.data).category_list[4].body.product_list">

                    <div class="product-box">
                        <div class="left">
                            <van-image :src="p.puzzle_url" />
                        </div>

                        <div class="right">
                            <p>{{ p.name }}</p>
                            <p>￥{{ p.price }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>





        <div class="category_title" :id="(<any>props.data).category_list[5].body.category_name">
            {{ (<any>props.data).category_list[5].body.category_name }}
        </div>
        <div class="product-list">

            <ul>
                <li @click="gotoProduct(p)" v-for="(p, index) in (<any>props.data).category_list[6].body.product_list">

                    <div class="product-box">
                        <div class="left">
                            <van-image :src="p.puzzle_url" />
                        </div>

                        <div class="right">
                            <p>{{ p.name }}</p>
                            <p>￥{{ p.price }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>


        <div class="category_title" :id="(<any>props.data).category_list[7].body.category_name">
            {{ (<any>props.data).category_list[7].body.category_name }}
        </div>



        <div class="category_son_list" v-if="(<any>props.data).category_list[8].body.items">
            <ul>
                <li v-for="(s) in (<any>props.data).category_list[8].body.items">
                    <van-image width="50px" :src="s.img_url" />
                    <p>{{ s.product_name }}</p>
                </li>
            </ul>
        </div>



        <div class="product-list" v-if="(<any>props.data).category_list[8].body.product_list">

            <ul>
                <li @click="gotoProduct(p)" v-for="(p, index) in (<any>props.data).category_list[8].body.product_list">

                    <div class="product-box">
                        <div class="left">
                            <van-image :src="p.puzzle_url" />
                        </div>

                        <div class="right">
                            <p>{{ p.name }}</p>
                            <p>￥{{ p.price }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>




        <div class="category_title" :id="(<any>props.data).category_list[9].body.category_name">
            {{ (<any>props.data).category_list[9].body.category_name }}
        </div>




        <div class="product-list" v-if="(<any>props.data).category_list[10].body.product_list">

            <ul>
                <li @click="gotoProduct(p)" v-for="(p, index) in (<any>props.data).category_list[10].body.product_list">

                    <div class="product-box">
                        <div class="left">
                            <van-image :src="p.puzzle_url" />
                        </div>

                        <div class="right">
                            <p>{{ p.name }}</p>
                            <p>￥{{ p.price }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>





        <div class="category_title" :id="(<any>props.data).category_list[11].body.category_name">
            {{ (<any>props.data).category_list[11].body.category_name }}
        </div>


        <div class="category_son_list" v-if="(<any>props.data).category_list[12].body.items">
            <ul>
                <li v-for="(s) in (<any>props.data).category_list[12].body.items">
                    <van-image width="50px" :src="s.img_url" />
                    <p>{{ s.product_name }}</p>
                </li>
            </ul>
        </div>


        <div class="category_title" :id="(<any>props.data).category_list[13].body.category_name">
            {{ (<any>props.data).category_list[11].body.category_name }}
        </div>


        <div class="category_son_list" v-if="(<any>props.data).category_list[14].body.items">
            <ul>
                <li v-for="(s) in (<any>props.data).category_list[14].body.items">
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const smallBoxActiveIndex = ref(0)
const props = defineProps<{
    data: object
}>()
const chooseSonNav = (i: number) => {
    if (smallBoxActiveIndex.value == i) return

    smallBoxActiveIndex.value = i
}
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

<style scoped>

</style>