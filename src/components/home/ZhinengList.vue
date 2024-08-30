<template>
    <div class="zhineng-list">
        <ul v-if="(<any>props.data).sections && (<any>props.data).sections[33].body.items">
            <li v-for="(item, index) in (<any>props.data).sections[33].body.items">
                <van-image block :src="'http:' + item.img_url" />
            </li>
        </ul>
        <ul v-if="(<any>props.data).sections && (<any>props.data).sections[35].body.items">
            <li v-for="(item, index) in (<any>props.data).sections[35].body.items">
                <van-image block :src="'http:' + item.img_url" />
            </li>
        </ul>
        <ul v-if="(<any>props.data).sections && (<any>props.data).sections[37].body.items">
            <li v-for="(item, index) in (<any>props.data).sections[37].body.items">
                <van-image block :src="'http:' + item.img_url" />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    data: object
}>()
</script>

<style lang="scss" scoped>
.zhineng-list {
    width: 100%;

    ul {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 5px;
        box-sizing: border-box;

        li {
            width: 49%;
        }
    }
}
</style>