<template>
  <pull_refresh @refresh="refresh">
    <div class="content">
      <p class="text">基础用法</p>
      刷新次数：{{ num }}
    </div>
  </pull_refresh>
</template>
 
<script>
import pull_refresh from '@/components/pull-reflash' 
export default {
    components:{pull_refresh},
  data () {
    return {
      num: 0
    }
  },
  methods: {
    refresh (done) {
      setTimeout(() => {
        this.num++
        done()    //我就想说这里，把状态归0
      }, 500)
    }
  }
}
</script>
 
<style>
.content{
  padding:0 15px;
  
}
.text{
    font-size: 14px;
    color: rgba(69,90,100,.6);
  }
</style>