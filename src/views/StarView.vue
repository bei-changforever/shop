<template>
    <div class="star">
        <van-nav-bar title="收藏" left-text="返回" left-arrow @click-left="onClickLeft">
            <template #right>

                <van-icon name="edit" size="18" v-if="!isEdit" @click="toggleEdit" />
                <van-checkbox v-else v-model="isAll" >全选</van-checkbox>

            </template>
        </van-nav-bar>
        <div class="like-list-box">
            <div class="like-list-item">
                <ul>
                    <li v-for="(item, index) in liekList" >
                        <div class="img">
                            <van-image width="100" height="100" :src="item.imgsrc" @click="gotoProductDetail(item)"/>
                        </div>
                        <div class="desc">
                            <p class="title">{{ item.title }}</p>
                            <p class="keyword">{{ item.keywords }}</p>
                            <p class="price">
                                <span>￥{{ item.price }}</span>
                                <span v-show="isEdit"><van-checkbox v-model="item.isCheck"></van-checkbox></span>
                            </p>
                        </div>
                    </li>

                </ul>
            </div>
        </div>
        <div class="footer" :style="`transform: translateY(${isEdit ? 0 : 50}px);`">
            <button @click="toggleEdit" style="margin-left: 10px;">取消</button>
            <button style="margin-right: 10px;" @click="del">取消收藏</button>
        </div>
        <div class="dianzi" style="height: 10vh"></div>
    </div>
</template>

<script setup lang="ts">
import { getList, delStar } from '@/request/userApis/index';
import { computed, ref, onActivated } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const onClickLeft = () => history.back();
interface userLike {
    imgsrc?: string
    keywords?: string
    price?: string
    productId?: string
    star?: boolean
    title?: string
    username?: string
    __v?: number
    _id?: string,
    isCheck?: Boolean
}
let liekList = ref<Array<userLike>>([])

const isEdit = ref(false)
const getAllList = async () => {
    let res = await getList()

    if (res.data.code == 4000) {
        liekList.value = res.data.data
    }
}
const del = async () => {

    let ids = [] as any
    liekList.value.forEach(item => {
        if (item.isCheck) {
            ids.push(item.productId)
        }
    })

    await delStar(ids)
    await getAllList()
}
const toggleEdit = () => {
    isEdit.value = !isEdit.value
}




const gotoProductDetail = (item: any) => {


    router.push({
        path: '/product',
        query: {
            id: item.productId,
        }
    })

}

const total = computed(()=> {
    return liekList.value.length
})

const doneTotal = computed(()=> {
    return liekList.value.reduce((pre:any,current:any) => {
        return (pre+ (current.isCheck ? 1 : 0))
    },0)
})

const isAll = computed({
    get(){
        return doneTotal.value === total.value && total.value > 0 
    },
    set(val) {
         checkAllTodo(val)
    }
})


//全选or取消全选
const checkAllTodo = (val:boolean) => {
    liekList.value.forEach((item:any) => {
          item.isCheck = val
    })
}


onActivated(() => {
    getAllList()
})
</script>

<style lang="scss" scoped>
.star {
    width: 100%;
    min-height: 100vh;
    background-color: #f2f2f2;


    .like-list-box {
        width: 100%;

        .like-list-item {
            width: 100%;

            ul {
                padding: 10px;
                padding-top: 0;
                box-sizing: border-box;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;

                li {
                    width: 48%;
                    margin-top: 10px;
                    background-color: white;
                    border-radius: 20px;
                    min-height: 200px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    overflow: hidden;

                    .title {
                        padding: 10px;
                        font-size: 14px;
                        font-weight: bold;
                        box-sizing: border-box;
                    }

                    .keyword {
                        width: calc(170px - 10px);
                        font-size: 12px;
                        color: #999;
                        padding: 10px;
                        padding-top: 0;
                        box-sizing: border-box;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    .price {
                        margin-top: 10px;
                        width: 100%;
                        padding: 10px;
                        height: 30px;
                        padding-top: 0;
                        box-sizing: border-box;
                        font-size: 14px;
                        font-weight: bold;
                        color: #e84118;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }



                }
            }
        }
    }

    .footer {
        width: 100%;
        position: fixed;
        bottom: 0;
        height: 50px;
        left: 0;
        z-index: 2;
        background-color: white;
        border-radius: 10px 10px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.3s linear;

        button {
            width: 120px;
            height: 40px;
            border: none;
            border-radius: 20px;
            background-color: #e84118;
            color: white;
        }
    }

}
</style>