<template>
    <div class="some">
        <van-cell title="已选" is-link :label="isvalue" />
        <van-cell center title="送至" is-link :label="(<any>addressInfo).address" @click="gotoAddress" />
    </div>
</template>

<script setup lang="ts">
import { toRefs,computed } from 'vue';
import { changeAddress } from '@/stores/Address/index';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
const router = useRouter()
const { addressInfo } = toRefs(changeAddress())
const props = defineProps<{
    data: any
}>()

const isvalue = computed(() => {
  return `${props.data.name} ${props.data.default} ${props.data.color} ${props.data.gb} ${props.data.size}`
})

const gotoAddress = () => {
    let token = localStorage.getItem('shopToken')
    if (token) {
        router.push('/address')
    }
    else {
        ElMessage.error('请先登录')
    }

}


</script>

<style lang="scss" scoped>

</style>