<template>
  <div class=''>
      <div class="fixed-bar">
        <mt-header class="header" fixed>
            <div class="logo" slot="left"></div>
            <i class="iconfont icon-sousuo" slot="right"></i>
        </mt-header>
        <mt-navbar v-model="selected" class="navbar">
            <!-- 关于子路由跳转的可以使用内嵌<router-link>进行跳转 <router-link to="/index/range">选项一</router-link>-->
            <mt-tab-item id="range"><div>时下流行</div></mt-tab-item>
            <mt-tab-item id="songList"><div>歌单</div></mt-tab-item>
            <mt-tab-item id="leaderBoard"><div>排行榜</div></mt-tab-item>
            <mt-tab-item id="hotSinger"><div>热门歌手</div></mt-tab-item>
        </mt-navbar>
      </div>
      <div class="default-view">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
      </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      selected: 'range'
    }
  },
  components: {},
  created () {
    let temparr = this.$route.path.split('/')
    if (temparr[1] === 'index') {
      this.handleTapChange(temparr[2])
    }
  },
  mounted () {},
  methods: {
    handleTapChange (val) {
      this.selected = val
    }
  },
  watch: {
    selected: function (val, oldVal) {
      this.$router.push({ path: '/index/' + val })
    },
    $route (to, from) {
      const path = to.path
      var temp = path.split('/')
      if (temp[1] === 'index') {
        this.handleTapChange(temp[2])
      }
    }
  }
}
</script>
<style>
/* 为了保持header和navbar的置顶 position设定为fixed层级子z-index设置得高一些，但是回出现navbar被header遮挡得问题
解决方法是通过使用margintop将展示部分下移调动到合适得位置才解决*/
.fixed-bar{
  position: fixed;
  width: 100%;
  top:0;
  left: 0;
  z-index: 15;
}
.header{
  height: 56px;
}
.navbar{
  margin-top: 56px;
}
.logo{
    width: 150px;
    height: 48px;
    background: url("../../static/logo.png") no-repeat left center;
    background-size: cover;
}
.icon-sousuo{
    font-size: 24px;
}
.fixed-bar .range div{
  font-size: 14px;
}
.default-view{
    margin-top: 104px;
}
</style>
