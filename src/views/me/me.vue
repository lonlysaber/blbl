<template>
  <div class="inner">
    <!-- 身份信息 -->
    <div class="faceInfo">
      <!-- 头像 -->
      <div class="face">
        <img src="../../image/face.jpg" alt="">
      </div>
      <div class="info">
        <!-- 用户名 -->
        <div class="userName">
          <span class="name" >新大陆非法猎人</span>
          <span class="level">lv5</span>
        </div>
        <!-- 等级 -->
        
        <!-- 会员信息 -->
        <div class="vip">
          <span>年度大会员</span>
        </div>
        <!-- bb -->
        <div class="bb">
          <span>B币：0.0</span>
          <span>硬币：469</span>
        </div>
        
        
      </div>
    </div>
    <!-- 空间信息 -->
    <div class="zoom">
      <!-- 动态数 -->
      <div class="dyna">
        <p>5</p>
        <p>动态</p>
      </div>
      <!-- 关注数 -->
      <div class="following">
        <p>76</p>
        <p>关注</p>
      </div>
      <!-- 粉丝数 -->
      <div class="follower">
        <p>0</p>
        <p>粉丝</p>
      </div>
    </div>
    <div>
      <p>没有更多了..</p>
    </div>

  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* 整体样式 */
.inner{
  height: 100vh;
  margin-top: -40px;
}
/* flex布局 */
.inner .faceInfo{
  display: flex;
  padding: 10px;
  align-items: center;
}
/* 图片样式 */
.faceInfo .face{
  width: 100px;
}
.faceInfo .face img{
  width: 100%;
  border-radius: 50%;
}
.faceInfo .info{
  margin-left: 10px;
  text-align: left;
}
/* 相邻兄弟选择器 */
.info > div + div{
  margin-top: 15px;
}
.info .userName span,.bb span{
  margin-right: 15px;
}
.userName .name{
  color: #fa366e;
  font-size: large;
}
.vip{
  background: #fb7299;
  white-space: nowrap;
  width: min-content;
  padding:0 5px;
  border-radius: 3px;
}
.zoom{
  display: flex;
  justify-content: space-around;
}


</style>