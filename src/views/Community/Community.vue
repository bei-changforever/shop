<template>
    <div class="community">

        <div class="tab-list">
            <div class="header">
                <ul>
                    <li @click="changeRouter(item, index)" v-for="(item, index) in tablist">
                        <div :class="activeIndex == index ? 'active' : ''" class="title">{{ item.name }}</div>
                    </li>
                </ul>
            </div>
        </div>

     
            <RouterView  :name="name"  />
         
   




    </div>
</template>
<script lang="ts" setup>
import { home_conf} from '@/request/projectApis/index'
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';

const activeIndex = ref(1)
const name = ref('推荐')
const tablist = ref([
    {
        name: '关注'
    },
    {
        name: '推荐'
    }
])

const getHomeConf = async () => {
    let { data: { data } } = await home_conf()
    // console.log(data);
    tablist.value.push(...data.tab_list);
}


const changeRouter = (item: any, index: number) => {
    console.log(item, index);
    if (activeIndex.value == index) return
    name.value = item.name
    activeIndex.value = index
}


onMounted(() => {
    getHomeConf()
})
</script>

<style lang="scss" scoped>
.community {
    width: 100%;
    background-color: rgb(246, 246, 246);

    .tab-list {
        width: 100%;
        height: 50px;
        overflow: hidden;
        position: fixed;
        top: 0;
        background-color: white;
        z-index: 2;

        .header {
            width: 100%;
            overflow-x: scroll;

            ul {
                width: 120%;
                display: flex;

                li {
                    width: 33%;
                    background-color: white;

                    .title {


                        font-size: .32rem;
                        font-weight: 700;
                        color: #999;
                        white-space: nowrap;
                        flex-shrink: 0;
                        width: 100%;
                        height: 50px;
                        color: #999;
                        text-align: center;
                        line-height: 50px;
                        font-size: 16px;

                        &.active {
                            color: black;
                            font-weight: bold;
                        }
                    }
                }
            }
        }






    }

    .content {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;

        .contentlist-box {
            background-color: white;
            width: 100%;
            margin-bottom: 15px;
            display: flex;
            flex-direction: column;

            .top {
                margin-top: 10px;
                width: 100%;
                display: flex;
                align-items: center;

                p {
                    margin-left: 10px;
                    font-size: 15px;
                }
            }

            .question {
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding: 10px;
                box-sizing: border-box;
                font-size: 16px;

            }

            .img-box {
                width: 100%;

                ul {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }
            }

            .s-tag-list {
                width: 100%;
                margin-top: 10px;

                P {
                    width: 100%;
                    display: block;
                    padding: 10px;
                    box-sizing: border-box;
                    background-color: rgb(246, 246, 246);
                    color: #999;
                }
            }

            .answer {
                margin-top: 10px;
                width: 100%;
                padding: 10px;
                box-sizing: border-box;
                background-color: rgb(246, 246, 246);

                .ans-name {
                    color: #999;
                    margin-right: 10px;
                }
            }


            .cell_btn_group {
                width: 100%;
                height: 50px;

                ul {
                    width: 100%;
                    display: flex;
                    height: 50px;
                    justify-content: space-between;

                    li {
                        height: 100%;
                        // background-color: pink;
                        width: 33%;
                        font-size: 20px;
                        color: #999;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
        }
    }
}
</style>