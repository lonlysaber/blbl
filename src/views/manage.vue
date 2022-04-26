<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="#ff0000" inactive-color="#000">
      <van-tabbar-item  v-for="item in tabbar" :key="item.id"
       :to="item.to" route >
        <span >{{item.text}}</span>
        <van-icon></van-icon>
        <template #icon="props">
            <img :src="props.active?item.active:item.inactive" alt="">
        </template>
      </van-tabbar-item>
      <!-- <van-tabbar-item icon="search" to="/manage/dynamic">动态</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/manage/me">我的</van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>

<script>
import "@/assets/iconfont/iconfont.css";
export default {
    created(){
      // this.active = this.$route.query.active; 
      // console.log(this.$route.query.active);
    },
    data() {
    return {
      active: 0,
      tabbar:[
        {
          id:1,
          to:'/manage/home',
          text:'主页面',
          active:require('@/image/home-fill.png'),
          inactive:require('@/image/home.png')

        },
        {
          id:2,
          to:'/manage/dynamic',
          text:'动态',
          active:require('@/image/dynamic-fill.png'),
          inactive:require('@/image/dynamic.png')

        },
        {
          id:3,
          to:'/manage/me',
          text:'我的',
          active:require('@/image/me-fill.png'),
          inactive:require('@/image/me.png')

        },
      ],
      icon:{
        home_fill:'https://img.yzcdn.cn/vant/user-active.png',

        home:'https://img.yzcdn.cn/vant/user-inactive.png'
      
      }
        
    };
  },
};
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
}
</style>
