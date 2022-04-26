<template>
  <div class="home">
    <!-- 轮播图区域 -->
    <div class="swiper">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in swiper" :key="item.season_id">
          <img :src="item.ep_cover" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // 轮播图
      swiper: [],
    };
  },
  created() {
    this.getResponse();
  },
  methods: {
    // 网络图片缓存方法
    getImages(_url) {
      if (_url !== undefined) {
        let _u = _url.substring(7);
        return "https://images.weserv.nl/?url=" + _u;
      }
    },
    getResponse() {
      axios({
        method: "get",
        url: "/api/pgc/web/timeline/v2?season_type=1",
        params: {
          // aid:'BV1YS4y127LV'
          // phone: "15170292977",
          // password: "xyz123123",
          // uid:'32953014',
          // type:'2',
          // ids:'347230'
        },
        // headers:{
        //   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',
        // }
      })
        .then((res) => {
          
          this.swiper = (res.data.result.latest.slice(1,5));
          console.log(this.swiper);
          // this.swiper.forEach((value, key) => {
          //   // console.log(value.cover);
          //   value.ep_cover = this.getImages(value.ep_cover);
          //   // console.log(value.cover);
          // });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.swiper .my-swipe {
  width: 100%;
  height: 200px;
}
.swiper .my-swipe img {
  width: 100%;
  height: 200px;
}
</style>
