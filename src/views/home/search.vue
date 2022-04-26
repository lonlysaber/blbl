<template>
  <div class="inner">
    <!-- 顶部栏 -->
    <div class="top">
      <!-- 搜索框 -->
      <div class="search" @click="searching">
        <div>
          <img class="zoom" src="../../image/zoom.png" alt="" />
        </div>
        <div class="text">
          <input
            :placeholder="dename"
            class="searchBar"
            v-model="value"
            v-on:keydown.enter="search(value)"
          />
        </div>
        <div>
          <img
            class="delete"
            src="../../image/delete.png"
            v-if="isSearching"
            @click="deleteText"
            alt=""
          />
        </div>
      </div>
      <!-- 取消 -->
      <div class="back" @click="back">
        <span>取消</span>
      </div>
    </div>
    <!-- 热搜 -->
    <div class="hot" v-if="!isSearching">
      <div class="resou">
        <b><span>热搜</span></b>
      </div>
      <!-- 十个热搜词 -->
      <div class="hotlist">
        <div
          class="item"
          v-for="item in hotlist"
          :key="item.id"
          @click="search(item.show_name)"
        >
          <!-- 排行 -->
          <div class="srank">
            <span class="rank">{{ item.id }}</span>
          </div>

          <!-- 热搜词 -->
          <div class="sname">
            <span class="name">{{ item.show_name }}</span>
          </div>

          <!-- 图标 -->
          <div class="sicon">
            <img :src="item.icon" alt="" class="icon" />
          </div>
        </div>
      </div>
    </div>
    <div class="searchlist" v-if="searched">
      <div
        class="video"
        v-for="item in result"
        :key="item.id"
        v-on:click="tap(item.bvid, item.aid)"
      >
        <!-- 图片 -->
        <div class="pic">
          <img :src="item.pic" alt="" />
        </div>
        <!--  信息 -->
        <div class="info">
          <!-- 视频标题 -->
          <div class="desc">
            <span class="title" v-html="item.title"></span>
          </div>
          <!-- up主 -->
          <div class="owner">
            <img class="up" src="../../image/up.png" alt="" />
            <span class="name">{{ item.author }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { get } from "../../http/get";
export default {
  created() {
    // 获取默认搜索词
    this.getDefalut();
    // 搜索热词
    this.hotKeyword();
  },
  data() {
    return {
      // 默认搜索词
      dename: "",
      // 搜索热词
      hotlist: [],
      // 搜索结果
      result: [],
      //   搜索词
      value: "",
      //搜索状态
      isSearching: false,
      searched: false,
    };
  },
  methods: {
    // 获取默认搜索词
    getDefalut() {
      let url = "http://api.bilibili.cn/x/web-interface/search/default";
      
      axios({
        method:'get',
        url:url,
      }).then((res) => {
        // console.log(res);
        this.dename = res.data.data.show_name;
      });
    },
    // 热词
    hotKeyword() {
      // let data = {keyword:keyword};
      let url = "https://s.search.bilibili.com/main/hotword";
      axios({
        method:'get',
        url:url,
      }).then((res) => {
        // console.log(res);
        this.hotlist = res.data.list;
      });
    },
    // 搜索
    search(keyword) {
      // 空值搜索，且没有点击热搜词,则搜索默认词
      if (this.value == ""&&keyword =="") {
        this.value = this.dename;
        keyword = this.value;
      }
    //   console.log(keyword);
      this.isSearching = false;
      let data = { keyword: keyword };
      let url = "https://api.bilibili.com/x/web-interface/search/all/v2";
      if (keyword != "") {//控制则不搜索
        this.value = keyword;
        axios({
        method:'get',
        url:url,
        params:data,
      }).then((res) => {
          // console.log(res.data.data.result[10]);
          this.result = res.data.data.result[10].data;
          this.isSearching = true;
          this.searched = true;
        });
      }
    },
    // 返回
    back() {
      this.$router.go(-1);
    },
    // 删除搜索框的内容
    deleteText() {
      
      this.value = '';
      this.isSearching = false;
      this.searched = false;
      // 阻止事件冒泡到父级元素
      event.stopPropagation();
      //   console.log(this.isSearching);
    },
    // 点击搜索栏，进入搜索状态
    searching() {
      this.isSearching = true;
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
  },
};
</script>

<style scoped>
.inner {
  margin-top: -20px;
  height: 100vh;
  background-color: rgb(246, 247, 249);
  text-align: left;
}
/* 顶部栏 */
.top {
  /* 设置felx 布局 */
  display: flex;
  flex: 1 auto;
  /* 内边距 */
  padding: 5px;
  background: #fb7299;
}

/* 顶部栏搜索栏 */
.search {
  /* margin: auto; */
  text-align: center;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid;
  border-radius: 15px;
  width: 80vw;
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
  width: 65vw;
  font-size: small;
  /* border-radius: 15px; */
}
/* 删除图标 */
.search .delete {
  width: 18px;
}
/* logo图片 */
.back {
  /* color: aqua; */
  margin: auto;
}
/* 热搜词 */
.hot {
  padding: 0 10px;
}
.resou {
  margin: 10px 0;
}
.hotlist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
/* 单个词 */
.hotlist .item {
  width: 45vw;
  /* position: relative; */
  display: flex;
  align-items: baseline;
}
.hotlist .item .srank {
  margin-right: 3px;
}
.hotlist .item .sname {
  margin: 5px 0px;
  width: 46vw;
  /* 强制文字不换行，在一行内显示 */
  white-space: nowrap;
  /* 超出部分隐藏显示 */
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 图标 */
.hotlist .item img {
  /* width: 5vw; */
  height: 2vh;
  /* margin-left: 3px; */
}

.searchlist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  text-align: left;
}
.searchlist .video {
  width: 90vw;
  border-radius: 3px;
  margin: 4px 2px;
  display: flex;

  background-color: #ffffff;
}
.video .pic {
  width: 50%;
}
.video .info {
  width: 50%;
}
em.keyword {
  background-color: #fb7299;
}
.searchlist .video .pic img {
  width: 100%;
  border-radius: 3px;
}
/* 视频标题 */
.info .desc span {
  height: 66px;
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
</style>