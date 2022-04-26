<template>
  <div class="dynamic">
    <!-- 单个动态 -->
    <div class="card" v-for="it in card" :key="it.id">
      <!-- 身份信息栏 -->
      <div class="faceInfo">
        <!-- 头像 -->
        <img class="face" :src="it.user.head_url" alt="" />
        <div class="Info">
          <!-- 用户名 -->
          <span class="userName">{{ it.user.name }}</span>
          <br>
          <!-- 上传时间 -->
          <span class="uploadTime">{{ it.item.upload_time }}</span>
        </div>
      </div>
      <div class="desc">
          <p class="description">{{it.item.description}}</p>
      </div>
      <!-- 图片栏 -->
      <div class="imgBar">
        <img class="imgBarPit" :src="it.item.pictures[0].img_src" alt="" />
      </div>
      <!-- 工具栏 -->
      <div class="toolBar">
        <!-- 转发 -->
        <div class="forward"></div>
        <!-- 评论 -->
        <div class="comment"></div>
        <!-- 点赞 -->
        <div class="star"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // 动态数组
      cards: [],
      // 单个动态信息
      card: [],
    };
  },
  created() {
    this.getDynamic();
  },
  methods: {
    getDynamic() {
      axios({
        method: "get",
        url: "https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history",
        params: {
          // 用户id
          host_uid: "435609834",
          // 页id
          offset_dynamic_id: "0",
        },
         header:{
          'user-agent': 'Mozilla/5.0(1312096627@qq.com)'
        },
      }).then((res) => {
        // console.log(res.data.data.cards);
        this.cards = res.data.data.cards;

        this.cards.forEach((value) => {
          // console.log(value);
          // json属性值转换，然后存储进动态数组中
          this.card.push(JSON.parse(value.card));
        });
        // console.log(this.card);
        //处理部分数据的格式
        this.card.forEach((value) => {
          // 改变上传时间的格式
          value.item.upload_time = new Date(value.item.upload_time * 1000)
            .toLocaleString()
            .replace(/\d{1,2}:\d{1,2}:\d{1,2}/g, " ");
        });
        
      });
    },
  },
};
</script>

<style scoped>
/* 身份信息栏设置显示模式为flex */
* {
  margin: 0;
  padding: 0;
}
.dynamic {
  margin-top: -20px;
}
/* 单个动态样式 */
.card{
    padding: 10px;
    margin: auto;
    margin-top:5px;
    margin-bottom:5px;
    border: 1px solid;
}
/* 身份信息栏样式 */
.faceInfo {
  display: flex;
  flex: 1 auto;
}
.card .faceInfo{
  width: 50px;
}
/* 头像样式 */
.card .faceInfo img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.Info{
    text-align: left;
    padding-left:15px ;
}
/* 用户名样式 */
.Info .userName{
    color: rgb(251, 114, 153);
    white-space: nowrap;
}

/* 上传时间 */
.Info .uploadTime{
    color: #99a2aa;
    white-space: nowrap;

    
}
/* 描述信息 */
.desc .description{
    text-align: left;
    margin-top:5px;
    margin-bottom:5px;
    /* 超出部分省略 */
    text-overflow: ellipsis;
}
/* 动态图片 */
.imgBar .imgBarPit{
    margin-top:5px ;
    margin-bottom:5px ;

    width: 100%;
}
</style>