<template>
    <div>
        <div v-if="(<any>props.data).category_name == '智能穿戴'">

            <div style="height: 550px;overflow: scroll;"
                v-if="(<any>props.data).category_list && (<any>props.data).category_list[0]">

                <div class="category_list">
                    <div class="cells_auto_fill">
                        <van-image :src="(<any>props.data).category_list[0].body.items[0].img_url" />
                    </div>
                    <div class="category_title">
                        <van-swipe :show-indicators="false" class="my-swipe" :loop="false" :width="130"
                            indicator-color="white">

                            <van-swipe-item v-for="(x, i) in (<any>props.data).title_list ">
                                <div @click="chooseSonNav(i)" :class="smallBoxActiveIndex == i ? 'active' : ''"
                                    class="small-box">
                                    <a :href="'#' + x.title">
                                        {{ x.title
                                        }}
                                    </a>

                                </div>
                            </van-swipe-item>

                        </van-swipe>
                    </div>
                    <div class="category_title" v-if="(<any>props.data).category_list[1].body.category_name
                    ">
                        <p>{{ (<any>props.data).category_list[1].body.category_name }}</p>
                    </div>


                    <div class="category_son_list" v-if="(<any>props.data).category_list[2].body.items">
                        <ul>
                            <li v-for="(s) in (<any>props.data).category_list[2].body.items">
                                <van-image width="50px" :src="s.img_url" />
                                <p>{{ s.product_name }}</p>
                            </li>
                        </ul>
                    </div>


                    <div class="category_title" v-if="(<any>props.data).category_list[3].body.category_name
                    ">
                        <p>{{ (<any>props.data).category_list[3].body.category_name }}</p>
                    </div>


                    <div class="category_son_list" v-if="(<any>props.data).category_list[4].body.items">
                        <ul>
                            <li v-for="(s) in (<any>props.data).category_list[4].body.items">
                                <van-image width="50px" :src="s.img_url" />
                                <p>{{ s.product_name }}</p>
                            </li>
                        </ul>
                    </div>



                    <div class="category_title" v-if="(<any>props.data).category_list[5].body.category_name
                    ">
                        <p>{{ (<any>props.data).category_list[5].body.category_name }}</p>
                    </div>


                    <div class="category_son_list" v-if="(<any>props.data).category_list[6].body.items">
                        <ul>
                            <li v-for="(s) in (<any>props.data).category_list[6].body.items">
                                <van-image width="50px" :src="s.img_url" />
                                <p>{{ s.product_name }}</p>
                            </li>
                        </ul>
                    </div>



                    <div class="category_title" v-if="(<any>props.data).category_list[7].body.category_name
                    ">
                        <p>{{ (<any>props.data).category_list[7].body.category_name }}</p>
                    </div>


                    <div class="category_son_list" v-if="(<any>props.data).category_list[8].body.items">
                        <ul>
                            <li v-for="(s) in (<any>props.data).category_list[8].body.items">
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
const smallBoxActiveIndex = ref(0)
const props = defineProps<{
    data: object
}>()
const chooseSonNav = (i: number) => {
    if (smallBoxActiveIndex.value == i) return

    smallBoxActiveIndex.value = i
}
</script>

<style scoped></style>