<template>
  <div class="inner" v-bind="view">
    <pull_refresh @refresh="refresh">
    <!-- 导航栏 -->
    <div class="navBar">
      <van-nav-bar
        v-bind="info"
        :title="info.title"
        left-text="返回"
        @click-left="goBack"
      />
    </div>
    <!-- 视频内容 -->
    <div class="video">
      <iframe :src="url"  
          scrolling="no"
          border="0" 
          frameborder="no" 
          framespacing="0" 
          allowfullscreen="allowfullscreen"
          class="player-wrapper"></iframe>
      <!-- <img :src="first_frame" alt="" /> -->
    </div>
    <!-- 导航栏 -->
    <div class="typeBar">
      <van-tabs  animated>
        <van-tab title="简介">
          <!-- 除视频与导航栏之外的元素 -->
          <div class="other">
            <!-- up主信息 -->
            <div class="owner">
              <!-- 头像 -->
              <div class="face">
                <img :src="view.owner.face" alt="" />
              </div>
              <div class="info">
                <!-- 用户名 -->
                <div class="userName">
                  <span>{{ view.owner.name }}</span>
                </div>
                <!-- 数据 -->
                <div class="userData" v-bind="owner">
                  <span>{{owner.follow}}粉丝 {{owner.videonum}}视频</span>
                </div>
              </div>
            </div>
            <!-- 介绍 -->
            <div class="desc">
              <!-- 标题栏 -->
              <div class="title">
                <!-- 标题 -->
                <div class="title">
                  <span>{{ view.title }}</span>
                </div>
                <!-- 详情介绍开关 -->
                <div class="switch">
                  <span id="switchoff" class="off" v-on:click="switchTap"
                    >﹀</span
                  >
                  <span id="switchon" class="on" v-on:click="switchTap"
                    >︿</span
                  >
                </div>
              </div>

              <!-- 详细描述 -->
              <div id="detail" class="detail">
                <div class="bvid">
                  {{ bvid }}
                </div>
                <div>
                  <pre>
              {{ view.desc }}
            </pre
                  >
                </div>
              </div>
            </div>
            <!-- 视频数据 -->
            <div class="data" v-bind="stat">
              <!-- 点赞 -->
              <div class="good">
                <img src="../../image/good.png" alt="" />
                <p>{{ stat.like }}</p>
              </div>
              <!-- 点踩 -->
              <div class="bad">
                <img src="../../image/bad.png" alt="" />
                <p>不喜欢</p>
              </div>
              <!-- 投币 -->
              <div class="coin">
                <img src="../../image/coin.png" alt="" />
                <p>{{ stat.coin }}</p>
              </div>
              <!-- 收藏 -->
              <div class="star">
                <img src="../../image/star.png" alt="" />
                <p>{{ stat.favorite }}</p>
              </div>
              <!-- 转发 -->
              <div class="forward">
                <img src="../../image/forward.png" alt="" />
                <p>{{ stat.share }}</p>
              </div>
            </div>
            <!-- 推荐视频 -->
            <div class="recommond">
              <!-- 单个视频 -->
              <div
                class="item"
                v-for="item in recommond"
                :key="item.bvid"
                v-on:click="tap(item.bvid, item.aid,item.cid)"
              >
                <!-- 图片 -->
                <div class="pic">
                  <img :src="item.pic" alt="" />
                </div>
                <!-- 信息 -->
                <div class="info">
                  <!-- 标题 -->
                  <div class="title">
                    <span>{{ item.title }}</span>
                  </div>
                  <!-- 数据 -->
                  <!-- <div class="data">
                    <span>1000万,1111万</span>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab v-bind="comnum" :title="'评论'+comnum.comnum">
          <!-- 评论 -->
          <div class="commont">
            <!-- 单个评论 -->
            <div class="item" v-for="item in commont"
            :key="item.oid">
              <!-- 头像 -->
              <div class="face">
                <img :src="item.member.avatar" alt="">
              </div>
              <!-- 信息 -->
              <div class="info">
                <!-- 用户信息 -->
                <div class="user">
                  <!-- 用户名 -->
                  <div class="name">
                    <span>{{item.member.uname}}</span>
                  </div>
                </div>
                <!-- 主评论 -->
                <div class="mincom">
                  <span>{{item.content.message}}</span>
                </div>
                <!-- 论中论 -->
                <div class="innercom">
                  <div class="items" v-for="it in item.replies"
                  :key="it.rpid">
                    <span class="name">{{it.member.uname}}:</span>
                    <span class="com">{{it.content.message}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        
      </van-tabs>
      <!-- 简介 -->
    </div>
    </pull_refresh>
    <!-- 填充块 -->
    <div class="bottom"></div>
  </div>
</template>

<script>
import axios from "axios";
import Loading from '@/components/loading'
import pull_refresh from '@/components/pull-reflash'
export default {
  components:{Loading,pull_refresh},
  created() {
    // console.log("初始化");

    // 接收传递的bvid 参数
    this.bvid = this.$route.query.bvid;
    this.aid = this.$route.query.aid;
    this.cid = this.$route.query.cid;
    this.url = `https://player.bilibili.com/player.html?aid=${this.aid}&bvid=${this.bvid}&cid=${this.cid}&`
    // 请求视频详情数据
    this.getView();
    // 获取用户数据
    this.getFollow();
    this.getvideocount();
    // 获取推荐视频
    this.getRecommond();
    // 获取评论
    this.getCommont();
  },
  data() {
    return {
      bvid: "",
      aid: "",
      info: {
        title: "正文",
      },
      view: [],
      // 视频数据
      stat: {},
      // 简介描述，默认关
      switchon: false,
      // 视频的第一张图片，用作缓冲显示
      first_frame:'',
      // 推荐视频
      recommond: [],
      // 评论数目
      comnum: {
        comnum: "",
      },
      // 评论
      commont: [],
      // 用户信息
      owner:{
        follow:'',
        videonum:'',
      },
      // 刷新组件
      isLoading:true,
    };
  },
  // 路由监听
  watch: {
    $route(to, from) {
      // console.log("watch");
      this.loading = true;
      this.getView();
      // 更新数据后刷新页面
      location.reload();
    },
  },
  methods: {
    // 上拉刷新方法
    refresh(done) {
      done();
      this.$router.go(0);
    },
    // 点击跳转方法
    tap(bvid, aid,cid) {
      // console.log('go to video');
      // this.bvid = bvid;
      this.$router.push({
        path: "/video",
        query: {
          bvid: bvid,
          aid: aid,
          cid:cid,
        },
      });
      // 刷新页面
      location.reload();
    },
    // 根据bvid查询视频信息
    getView() {
      axios({
        method: "get",
        url: "https://api.bilibili.com/x/web-interface/view",
        params: {
          bvid: this.bvid,
        },
      })
        .then((res) => {
          // console.log(res);
          // 接收参数
          this.view = res.data.data;
          this.stat = this.view.stat;
          this.first_frame = this.view.pages[0].first_frame;
          // 调用数据处理函数
          this.dataHandle(this.stat);
        })
        .catch((err) => {});
    },
    // 获取解析视频
    getvideo(){
      let requesturl = 'https://www.bilibili.com/video/'+this.bvid;
      axios({
        method:'get',
        url:'',
        params:{

        }
      })
    },
    // 获取用户粉丝数目
    getFollow(){
      axios({
        method:'get',
        url:'https://api.bilibili.com/x/relation/stat',
        params:{
          vmid:this.aid
        }
      }).then(res=>{
        // console.log(res);
        this.owner.follow =  res.data.data.follower;
        

      })
    },
    // 获取用户视频总数
    getvideocount(){
      axios({
        method:'get',
        url:'https://api.bilibili.com/x/space/arc/search',
        params:{
          mid:this.aid
        }
      }).then(res=>{
        this.owner.videonum = res.data.data.page.count;
        // console.log(res);
      })

    },
    // 获取推荐视频
    getRecommond() {
      // console.log("recommond");
      axios({
        method: "get",
        url: "https://api.bilibili.com/x/web-interface/archive/related",
        params: {
          bvid: this.bvid,
        },
      })
        .then((res) => {
          // console.log(res);
          this.recommond = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {});
    },
    // 简介描述开关
    switchTap() {
      let on = this.switchon;
      // console.log(on);
      if (on) {
        //状态为开时点击，将详情栏关闭
        // 将开关换成关闭的状态
        document.getElementById("switchon").style.display = "none";
        document.getElementById("switchoff").style.display = "block";
        document.getElementById("detail").style.display = "none";
      } else {
        //状态为关时点击，将详情栏打开
        document.getElementById("switchon").style.display = "block";
        document.getElementById("switchoff").style.display = "none";
        document.getElementById("detail").style.display = "block";
      }

      this.switchon = !on;
    },

    // 数据处理函数
    dataHandle(arr) {
      // console.log(this.stat);

      for (let key in arr) {
        // 如果值大于一万，就加上单位
        if (arr[key] > 10000) {
          arr[key] = (arr[key] / 10000).toFixed(2) + "万";
        }
        // console.log(this.stat[key]);
      }
    },
    // 返回函数
    goBack() {
      // console.log("video");
      this.$router.go(-1);
    },
    // 获取评论
    getCommont() {
      axios({
        method: "get",
        url: "https://api.bilibili.com/x/v2/reply/main",
        params: {
          oid: this.aid,
          type: 1,
        },
      }).then((res) => {
        this.commont = res.data.data.replies;
        this.comnum.comnum = res.data.data.cursor.all_count;
        // this.comnum = this.dataHandle(this.comnum);
        // console.log("getcommont");
        // console.log(res);
      });
    },
  },
};
</script>

<style scoped>
/* 整体样式 */
.inner {
  margin-top: -20px;
  /* height: 500px; */
  background-color: rgb(246, 247, 249);
  text-align: left;
}
/* 导航栏样式 */
.navBar .van-nav-bar {
  background-color: #fb7299;
}
.navBar span{
  color: white;
}
.video iframe {
  width: 100%;
  height: 200px;
}
/* 导航栏 */
.typeBar van-tabs {
  display: flex;
  /* 平分剩余空间，并且居中 */
  justify-content: space-evenly;
  height: 40px;
  width: 100%;
}
.typeBar .descInfo,
.typeBar .commont {
  margin: auto;
}
/* 剩余元素整体样式 */
.other {
  padding: 0px 10px;
}
/* 用户信息 */
.owner {
  display: flex;
  text-align: left;
}
.owner .face img {
  width: 50px;
  border-radius: 50%;
}
.owner .info {
  margin: 5px 20px;
}
.owner .userName span {
  color: #fb7299;
}
/* 标题栏 */
.desc .title {
  display: flex;
  /* 分居两边 */
  justify-content: space-between;
}
/* 标题 */
.desc .title span {
  font-family: "微软雅黑";
  font-size: larger;
  margin-left: -10px;
}
/* 开启 */
.desc .switch .on {
  /* 默认关闭 */
  display: none;
}

/* 默认关闭详情展示 */
.desc .detail {
  display: none;
}

/* 详细描述 */
.desc .detail pre {
  white-space: pre-line;
  /* 强制换行，包括网址 */
  word-wrap: break-word;
  font-size: smaller;
}

/* 视频数据 */
.other .data {
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  flex: 1 auto;
}
.other .data img {
  width: 40%;
}
.other .data p {
  margin: 0px;
}
/* 推荐视频 */
.recommond {
  margin: 10px 0px;
}
.recommond .item {
  display: flex;
  /* flex: 1 auto; */
}
.recommond .item .pic {
  width: 40%;
}
.recommond .item img {
  width: 100%;
  border-radius: 3px;
}
.recommond .item .info {
  width: 60%;
}

/* 评论 */
.commont{
  padding: 0px 10px;
  
}

.commont .item{
  display: flex;
  margin: 5px 0px;
  background-color: white;
}
/* 用户头像 */
.item .face{
  width: 10%;
}
.item .face img{
  width: 100%;
  border-radius: 50%;
}
.item .info{
  width: 90%;
  margin-left: 10px;
}
/* 论中论 */
.item .innercom{
  background-color: #f4f4f4;
  padding: 5px;
  size: 18px;
}
.innercom .items .name{
  color: #5090cc;
}

/* 填充块 */
.bottom {
  height: 4rem;
}
</style>