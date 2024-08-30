<template>
  <div class="home">
    <div class="headerb-box">
      <HeaderBar @user-select="change" />
    </div>

    <div class="container">


      <!-- <RouterView :name="name" :data="state.dataList" v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component"></component>
        </KeepAlive>
      </RouterView> -->
      <RouterView :name="name" :data="state.dataList" />


    </div>


    <div class="bottom-dianzi"></div>
  </div>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';

import { onMounted, reactive, ref, toRefs, computed } from 'vue';

import { getPageNav } from '@/request/projectApis/index';

import type { PageOptions, Section, Event } from '@/typing';

import { RouterView, useRoute } from 'vue-router';

import { changeHome } from '@/stores/ChangeHomeStore/index';

const route = useRoute()
const { dataState } = toRefs(changeHome())
let options = reactive<PageOptions>({
  page_id: 0,
  page_type: 'home'
})
let state = reactive({
  dataList: <Section>{}
})
const name = ref('推荐')



const change = (e: Event) => {



  name.value = e.name
  let options: PageOptions = {
    page_id: e.page_id,
    page_type: e.page_type
  }
  getData(options)

}


computed(() => {
  state.dataList = state.dataList ? state.dataList : JSON.parse(localStorage.getItem('homePageDate') as string)
})


const getData = async (options: PageOptions) => {

  (<any>state).dataList = {}
  let { data: { data } } = await getPageNav(options)
  localStorage.homePageDate = JSON.stringify(data.data)
  state.dataList = data.data ? data.data : JSON.parse(localStorage.getItem('homePageDate') as string)
  // console.log('home页==>', state.dataList);
}

onMounted(() => {

  options.page_type = dataState.value.options.page_type ? dataState.value.options.page_type : 'home'
  options.page_id = dataState.value.options.page_id ? dataState.value.options.page_id : 0
  name.value = dataState.value.options.name as string ? dataState.value.options.name as string : '推荐'

  getData(options)

})

</script>

<style lang="scss">
.home {
  width: 100%;

  .headerb-box {
    width: 100%;
    z-index: 2;
    position: fixed;
    top: 0;
  }

  .container {
    width: 100%;
    margin-top: 100px;
  }

  .dianzi {
    width: 100%;
    height: 5px;
  }

  .bottom-dianzi {
    width: 100%;
    height: 10vh;
  }
}
</style>