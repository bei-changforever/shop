import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      children: [
        {
          path: 'home',
          alias: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
          children: [
            {
              path: 'nav',
              alias: '',
              name: 'nav',
              components: {
                "推荐": () => import('../views/HomeChild/Tuijian.vue'),
                "智能": () => import('../views/HomeChild/Zhineng.vue'),
                '电视': () => import('../views/HomeChild/TV.vue'),
                '家电': () => import('../views/HomeChild/JiaDian.vue'),
                '笔记本': () => import('../views/HomeChild/Computed.vue')
              }
            }
          ]
        },
        {
          path: '/cate',
          name: 'cate',
          component: () => import('../views/Cate/Cate.vue')
        },
        {
          path: '/community',
          name: 'community',
          component: () => import('../views/Community/Community.vue'),
          children: [
            {
              path: 'tab',
              alias: '',
              name: 'tab',
              components: {
                "关注": () => import('../views/Community/communityChild/Concern.vue'),
                "推荐": () => import('../views/Community/communityChild/ComTui.vue'),
                "雷军年度演讲": () => import('../views/Community/communityChild/Leijun.vue')
              }
            }
          ]
        },

        {
          path: '/my',
          name: 'my',
          component: () => import('../views/My/My.vue')
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/search/list',
      name: 'list',
      component: () => import('../views/SearchListView.vue')
    },
    {
      path: '/product',
      name: "product",
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/activity',
      name: "activity",
      component: () => import('../views/ActivityView.vue')
    },
    {
      path: '/detail',
      name: "detail",
      component: () => import('../views/Community/CommentDetail.vue')
    },
    {
      path: '/404view',
      name: "404view",
      component: () => import('../views/NullDataView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/personself',
      name: 'personself',
      component: () => import('../views/PersonSelf.vue')
    },
    {
      path: '/forget',
      name: 'forget',
      component: () => import('../views/Forget.vue')
    },
    {
      path: '/star',
      name: 'star',
      component: () => import('../views/StarView.vue')
    },
    {
      path: '/address',
      name: 'address',
      component: () => import('../views/Address.vue')
    },
    {
      path: '/addaddress',
      name: 'addaddress',
      component: () => import('../views/AddUserAddress.vue')
    },
    {
      path: '/shoppingbag',
      name: 'shoppingbag',
      component: () => import('../views/Shoppingbag/Shoppingbag.vue')
    },
    {
      path: '/pay',
      name: 'pay',
      component: () => import('../views/PayView.vue')
    },
    {
      path: '/socket',
      name: 'scoket',
      component: () => import('../views/SocketView.vue')
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('../views/PayMent.vue')
    },
    {
      path: '/waitforshou',
      name: 'waitforshou',
      component: () => import('../views/Waiting/WaitingForShou.vue')
    },
    {
      path: '/waitforpay',
      name: 'waitforpay',
      component: () => import('../views/Waiting/WaitForPay.vue')
    },
    {
      path: '/historyorders',
      name: 'historyorders',
      component: () => import('../views/Waiting/HistoryOrders.vue')
    },
    {
      path: '/personalinfo',
      name: 'personalinfo',
      component: () => import('../views/PersonalInfo.vue')
    }
  ]
})

export default router
