<template>
    <div class="pro-detail">
        <div class="header" >
            <p @click="change(index)" :class="currentindex == index ? 'active' : ''" v-for="(item,index) in props.data.items ">{{ item.tab_name }}</p>
        </div>
        <ul v-if="currentindex == 0">
            <li v-for="(item,index) in props.data.items[0].page_info ">
                <van-image :src="item.body.img_url" />
            </li>
        </ul>
        <ul v-else>
            <li v-for="(item,index) in props.data.items[1].page_info ">
                <van-image :src="item.body.img_url" />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const currentindex = ref(0)
const props = defineProps<{
    data: any
}>()
const change = (index:number) => {
    if(currentindex.value == index ) return
    currentindex.value = index
}
</script>

<style lang="scss" scoped>
.pro-detail {
    width: 100%;
    .header {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        font-size: 15px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;

        p {
            width: 50%;
            text-align: center;

            &.active {
                color: orangered;
            }
        }
    }
}
</style>