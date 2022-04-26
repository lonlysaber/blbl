<template>
  <div class="loading">
    <div class="cube">
      <div class="inner">
        <div class="img">
          <img src="../../assets/img/loading.gif" alt="" />
        </div>
        <div class="text">
          <span>正在加载...</span>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style scoped>
.loading {
  position: fixed;
  left: 0;
  top: 0;
  /* background: url('~@/assets/img/loading.gif') center center no-repeat rgba(255, 255, 255, 0.5); */
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  /* margin: auto; */
}
.cube{
  margin: auto;
  background: white;
  width: 50%;
  height: 50vw;
  margin-top: 50vw;
  padding: 10px ;
  border-radius: 5px;
  
}
.inner{
  margin-top: 25%;
}

.cube .img{
  width:50%;
  margin: auto;

}
.cube .img img{
  width: 100%;
}


</style>