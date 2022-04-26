import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  // 路由重定向
  {
    path:'/',
    redirect:'/manage/home'
  },
  
  {
    path: '/',
    name: 'home',
    component: HomeView,
    
  },
  // 管理页面的路由
  {
    path:'/manage',
    name:'Manage',
    component:()=>import('../views/manage.vue'),
    children:[
      {
        path: 'home',
        component: ()=>import('../views/home/home.vue')
      },
      
      {
        path: 'test',
        component: ()=>import('../views/home/test.vue')
      },
      {
        path: 'dynamic',
        component: ()=>import('../views/dynamic/dynamic.vue')
      },{
        path: 'me',
        component: ()=>import('../views/me/me.vue')
      },
    ]
  },
  {
    path: '/video',
    component: ()=>import('../views/home/video.vue')
  },
  {
    path:'/some',
    name:'some',
    component:()=>import('../views/home/search.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
