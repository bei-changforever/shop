<template>
    <div class="tagsel">
        <div class="title"> {{ (<any>props.data).class_parameters.name }}</div>
        <div class="container">

            <van-swipe :loop="false" :width="70" :show-indicators="false" v-if="(<any>props.data).class_parameters.list">
                <van-swipe-item style="display: flex;" @click="showPopup" v-for="(item, index) in finallArr">


                    <div class="assd">
                        <div class="img">
                            <van-image width="15" height="15" :src="item.icon" />
                        </div>
                        <div class="desc">
                            <p>{{ item.name }}</p>
                            <p>{{ item.value }}</p>
                        </div>
                    </div>


                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 底部弹出 -->
        <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '70%' }">
            <h1>详情参数</h1>
            <ul class="cel-ul">
                <li v-for="(item, index) in (<any>props.data).class_parameters.list">
                    <span>{{ item.name }}</span>: &nbsp;&nbsp;&nbsp;<span style="color: #999">{{ item.value }}</span>
                </li>
            </ul>
        </van-popup>

    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
    data: object
}>()

const showBottom = ref(false);
const showPopup = () => {
    showBottom.value = true;
};


let finallArr = computed(() => {
    return (<any>props.data).class_parameters.list.filter((element: object) => {
        return (<any>element).icon
    });
})







</script>

<style lang="scss"  >
.tagsel {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;

    .title {
        width: 100%;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    }

    .assd {
        margin-top: 10px;
        width: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;

        .desc {
            text-align: center;
            line-height: 20px;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

    }

    .van-popup {
        border-radius: 20px 20px 0 0;
    }

    h1 {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    }

    .cel-ul {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;

        li {
            width: 100%;
            height: 30px;

        }
    }
}
</style>