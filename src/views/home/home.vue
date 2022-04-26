<template>
  <div class="home">
    <pull_refresh @refresh="refresh">
      <!-- 顶部栏 -->
      <div class="top">
        <!-- 头像 -->
        <div class="face" @click="tome">
          <img class="face-img" src="../../image/face.jpg" alt="" />
        </div>
        <!-- 搜索框 -->
        <div class="search" @click="toSearch">
          <div>
            <img class="zoom" src="../../image/zoom.png" alt="" />
          </div>
          <div>
            <input type="search" placeholder="双汇火腿肠" class="searchBar" />
          </div>
        </div>
        <!-- 图标 -->
        <div class="logo">
          <img src="../../image/logo.png" alt="" />
        </div>
      </div>

      <!-- 横向导航栏 -->
      <div class="herizontalBar">
        <van-tabs v-model="active" animated>
          <!-- <van-tab title="直播"> </van-tab> -->
          <van-tab title="推荐">
            <!-- 轮播图区域 -->
            <div class="swiper">
              <van-swipe
                class="my-swipe"
                :autoplay="3000"
                indicator-color="white"
              >
                <van-swipe-item v-for="item in swiper" :key="item.season_id">
                  <div class="img">
                    <img :src="item.ep_cover" alt="" />
                  </div>

                  <div class="p">
                    <!-- <p class="desc">{{item.title}}</p> -->
                  </div>
                </van-swipe-item>
              </van-swipe>
            </div>

            <!-- 随机视频区域 -->
            <div class="video">
              <div
                class="dyvideo"
                v-for="item in home"
                :key="item.aid"
                v-on:click="tap(item.bvid, item.aid, item.cid)"
              >
                <!-- 图片 -->
                <div class="pic">
                  <img :src="item.pic" alt="" />
                </div>
                <!--  信息 -->
                <div class="info">
                  <!-- 视频标题 -->
                  <div class="desc">
                    <span class="title">{{ item.title }}</span>
                  </div>
                  <!-- up主 -->
                  <div class="owner">
                    <img class="up" src="../../image/up.png" alt="" />
                    <span class="name">{{ item.owner.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="追番表">
            <div class="timeTable">
              <van-tabs v-model="active1" sticky>
                <van-tab
                  v-for="item in timeTable"
                  :key="item.id"
                  :title="item.date"
                >
                  <!-- 子表 -->
                  <div class="table">
                    <div class="list" v-for="it in item.seasons" :key="it.id">
                      <!-- 时间 -->
                      <div class="time">
                        <span>{{ it.pub_time }}</span>
                      </div>
                      <!-- 图片 -->
                      <div class="cover">
                        <img :src="it.square_cover" alt="" />
                      </div>
                      <!-- 信息 -->
                      <div class="info">
                        <!-- 名字 -->
                        <div class="name">
                          <span>{{ it.title }}</span>
                        </div>
                        <!-- 集数与信息 -->
                        <div class="reason">
                          <span v-show="it.delay == '1'">{{
                            it.delay_reason
                          }}</span>
                          <span v-if="it.delay == '0'">{{ it.pub_index }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </van-tab>
              </van-tabs>
            </div>
          </van-tab>
        </van-tabs>
      </div>

      <!-- 填充块 -->
      <div class="bottom"></div>
    </pull_refresh>
  </div>
</template>

<script>
import axios from "axios";
import pull_refresh from "@/components/pull-reflash";

export default {
  components: { pull_refresh },
  data() {
    return {
      // 主页默认选择
      active: 0,
      // 时间表默认选择
      active1: 6,
      // 轮播图
      swiper: [],
      // 首页信息
      home: [
        {
          pic: require("@/image/loading.png"),
          title: "loading...",
          aid: "757432706",
          bvid: "BV1G64y1S7Yx",
          owner: {
            name: "anonymous",
          },
        },
        {
          pic: require("@/image/loading.png"),
          title: "loading...",
          aid: "340835067",
          bvid: "BV12R4y1N7ds",
          owner: {
            name: "anonymous",
          },
        },
      ],
      // 时间表
      timeTable: [],
      // 是否初次加载
      first:true,
      // 刷新间隔限制,默认限制
      timeLimited:true,
    };
  },
  // 页面加载完成时
  mounted(){
    // 监听页面滚动
    window.addEventListener("scroll", () => {
      //  获取clientHeight
      const clientHeight = document.documentElement.clientHeight;
      // 获取scrollHeight
      const scrollHeight = document.body.scrollHeight;
      // 获取scrollTop  主页兼容问题
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (clientHeight + scrollTop >= scrollHeight - 100&&this.timeLimited== false) {
        // 写获取内容的代码
        this.getVideo();
        console.log(1);
      }
    });
  },
  created() {
    this.getSwiper();
    // this.getTable();
    // 获取主页数据
    this.getVideo();
    // 获取时间表
    this.getTimeTable();
  },
  methods: {
    // 上拉刷新方法
    refresh(done) {
      done();
      this.$router.go(0);
    },
    // 点击跳转方法
    tap(bvid, aid, cid) {
      // console.log('go to video');
      this.$router.push({
        path: "/video",
        query: {
          bvid: bvid,
          aid: aid,
          cid: cid,
        },
      });
    },
    // 网络图片缓存方法
    getImages(_url) {
      if (_url !== undefined) {
        let _u = _url.substring(7);
        return "https://images.weserv.nl/?url=" + _u;
      }
    },
    // 主页信息
    getVideo() {
      //
      axios({
        method: "get",
        url: "https://www.bilibili.com/index/ding.json",

        // header: {
        //   "user-agent": "Mozilla/5.0(1312096627@qq.com)",
        // },
      }).then((res) => {
        if(this.first){
          this.first = !this.first;
          this.home = [];
        }
        this.home =  this.home.concat(Object.values(res.data.douga));
        // 每次请求完成后，重新设置时间限制
        this.timeLimit();
      });
    },
    // 设置请求间隔时间
    timeLimit(){
      // 请求完成，设置限制
      this.timeLimited = true;
      // 每次请求间隔至少三秒
      let limit = 3000;
      // 三秒后开放限制
      setTimeout(() => {
        // 不限制
        this.timeLimited = false;
      }, limit);
    },
    // 跳转到搜索页面
    toSearch(){
      this.$router.push('/some');
    },

    // 获取时间表
    getTimeTable() {
      axios({
        method: "get",
        url: "https://bangumi.bilibili.com/web_api/timeline_global",
      }).then((res) => {
        // console.log(res);
        this.timeTable = res.data.result;
      });
    },

    // 获取热播番剧轮播图
    getSwiper() {
      axios({
        method: "get",
        url: "https://api.bilibili.com/pgc/web/timeline/v2",
        params: {
          season_type:1
        },
        header: {
          "user-agent": "Mozilla/5.0(1312096627@qq.com)",
        },
      })
        .then((res) => {
          this.swiper = res.data.result.latest.slice(0, 7);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 跳转到me
    tome(){
      this.$router.push({path:'/manage/me',query:{
        active:2
      }});

    },
  },
};
</script>

<style scoped>
.home {
  margin-top: -20px;
  height: 100vh;
  background-color: rgb(246, 247, 249);
}
/* 顶部栏 */
.top {
  /* 设置felx 布局 */
  display: flex;
  flex: 1 auto;
  /* 内边距 */
  padding: 5px;
  /* position: fixed; */
  /* top: 0; */
}
/* 顶部栏头像 */
.face .face-img {
  width: 50px;
  border-radius: 50%;
  margin-left: 5px;
  margin-right: 5px;
}
/* 顶部栏搜索栏 */
.search {
  margin: auto;
  text-align: center;
  display: flex;
  background-color: #ffffff;
  border: 1px solid;
  border-radius: 15px;
  width: 200px;
  padding: 2px;
}
/* 放大镜 */
.search .zoom {
  width: 22px;
}
/* 搜索栏 */
.search .searchBar {
  /* 文字居中显示 */
  height: 25px;
  border: none;
  outline: none;
  width: 170px;
  /* border-radius: 15px; */
}
/* logo图片 */
.logo {
  margin: auto;
}
.logo img {
  width: 50px;
}
/* 横向导航栏 */
.herizontalBar {
  overflow-y: hidden;
  overflow-x: scroll;
  /* font-size: 12px; */
  border-bottom: 1px solid silver;
  /* position: fixed; */
  /* top: 50px; */
}
.herizontalBar ul {
  display: flex;
  list-style: none;
  margin-bottom: 0.5rem;

  /* justify-content:space-around; */
}
.herizontalBar ul li {
  width: 40px;
  /* 超出屏幕部分不压缩空间 */
  /* flex:1 0 auto; */
  flex-shrink: 0;
}

/* 轮播图 */
.swiper {
  padding: 5px;
}

/* 轮播图图片 */
.swiper .my-swipe {
  width: 100%;
  height: 15rem;
  border-radius: 3px;
}
.swiper .my-swipe img {
  width: 100%;
  /* height: 200px; */
  z-index: 1;
}

.swiper .my-swipe .p {
  text-align: left;
  z-index: 99;
  margin-top: -3rem;
  margin-left: 1rem;
  color: rgb(19, 19, 18);
}

/* 随机视频区域 */
.video {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  text-align: left;
}
.video .dyvideo {
  width: 47%;
  border-radius: 3px;
  margin: 4px 2px;

  background-color: #ffffff;
}
.video .dyvideo .pic img {
  width: 100%;
  border-radius: 3px;
}
/* 视频标题 */
.info .desc span {
  height: 44px;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
}

/* up信息 */
.info .owner {
  /* text-align:inherit; */
  height: 25px;
  text-overflow: ellipsis;
  overflow: hidden;
}
/* up图标 */
.owner img {
  width: 1rem;
  margin: 0px 2px;
}

/* 时间表 */
.timeTable {
  border-top: 1px solid silver;
}
.timeTable van-tabs {
  background-color: white;
}
.table {
  padding: 0px 10px;
  text-align: left;
  background-color: rgb(246, 247, 249);
  /* height: 50vh; */
}
.table .list {
  display: flex;
  margin-top: 10px;
}
.list .time {
  width: 15%;
}
/* 图片 */
.list .cover {
  width: 20%;
  margin: 0px 10px;
}
.list .cover img {
  width: 100%;
}
.list .info {
  width: 65%;
}
/* 字体颜色 */
.list .reason {
  margin-top: 10px;
  color: #fb7299;
}

/* 填充块 */
.bottom {
  height: 4rem;
}
</style>
