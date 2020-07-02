<template>
  <div class=''>
      <div class="fixed-bar">
        <mt-header class="header" fixed>
            <div class="logo" slot="left"></div>
            <i class="iconfont icon-sousuo" slot="right"></i>
        </mt-header>
        <mt-navbar v-model="selected">
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
  created () {},
  mounted () {},
  methods: {
  },
  watch: {
    selected: function (val, oldVal) {
      this.$router.push({ path: '/index/' + val })
    }
  }
}
</script>
<style>
.fixed-bar{
    width: 100%;
}
.header{
    height: 56px;
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
