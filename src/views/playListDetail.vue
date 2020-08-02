<template>
  <div class='playList view'>
    <div class="fixed-title">
      <mt-header fixed>
        <mt-button class="play-back" icon="back" slot="left" @click="back()"></mt-button>
        <span class="play-name" slot="left"><span>{{fname}}</span></span>
      </mt-header>
    </div>
    <div class="playlist-info">
      <div class="info-wrapper">
        <div class="info-gallery">
          <div class="bar">{{playCount|formatCount}}</div>
          <img :src="coverImgUrl + '?param=300y300'" alt="">
        </div>
        <div class="info-title">
          <p class="intitle">{{name}}</p>
          <div>
            <img :src="creator.avatarUrl" alt="用户头像">
            <span class="author-name">{{creator.nickname}}</span>
          </div>
        </div>
      </div>
      <div class="bg-mask"></div>
      <div class="bg-player" :style="{'background-image':'url('+coverImgUrl + '?param=300y300)'}"></div>
    </div>
  </div>
</template>

<script>
import {getPlayListDetail} from '../api/index'
export default {
  name: '',
  data () {
    return {
      coverImgUrl: '../../static/default_cover.png',
      name: '歌单标题',
      id: 0,
      fname: '歌单',
      playCount: 0,
      description: '描述描述',
      creator: {
        'avatarUrl': '../../static/user-default.png',
        'nickname': '昵称'
      },
      list: [],
      opacity: 0,
      value: 0,
      isloading: false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (parseInt(vm.$route.params.id) !== parseInt(vm.id)) {
        vm.get()
      }
      // 假如过来的路由有带有相关的参数信息就对应的赋值 注意这里的要使用vm而不能使用this 原因在于vue-route守卫
      if (to.params.coverImg) {
        vm.coverImgUrl = vm.$route.params.coverImg
        vm.name = vm.$route.params.name
        vm.description = vm.$route.params.desc
        vm.playCount = vm.$route.params.count
        vm.creator = vm.$route.params.creator
        vm.id = vm.$route.params.id
      }
      window.onscroll = () => {
        var opa = window.pageYOffset / 150
        if (opa > 0.5) {
          vm.fname = vm.name
        } else {
          vm.fname = '歌单'
        }
        vm.opacity = window.pageYOffset / 150
      }
    })
  },
  // 离开守卫
  beforeRouteLeave (to, from, next) {
    window.onscroll = false
    next()
  },
  components: {},
  created () {},
  mounted () {
    this.get()
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    get () {
      this.isloading = true
      // this.$route.params 来访问之前网址的参数 例如说/A/：id 然后使用的时候是/A/123 123就直接被赋值给ID
      getPlayListDetail(this.$route.params.id).then((data) => {
        this.list = data.playlist.tracks
        this.isloading = false
      }).catch((error) => {
        console.log('歌单加载有问题' + error)
      })
    }
  },
  filters: {
    formatCount (v) {
      if (v < 10000) {
        return v
      } else {
        return (v / 10000).toFixed(0) + '万'
      }
    }
  }
}
</script>
<style lang="scss">
.view{
  width: 100%;
}
.mint-header{
  height: 56px;
}
.mintui{
  font-size: 20px;
}
.fixed-title{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  z-index: 15;
  .play-back{
    line-height: 56px;
  }
  .play-name{
    font-size: 20px;
    margin-left: 10px;
    line-height: 56px;
  }
}
.playlist-info{
  position: relative;
  background-color: brown;
  height: 10rem;
  padding: 60px .5rem 0 ;
  margin-top: -56px;
  .info-wrapper{
    position: relative;
    z-index: 10;
    color: white;
      .info-gallery{
        position: relative;
        width: 9rem;
        .bar{
          position: absolute;
          left: 0px;
          top: 0px;
          width: 100%;
          box-sizing: border-box;
          text-align: right;
          padding: 2px 5px;
          background-color: rgba(0,0,0,.2);
        }
        img{
          width: 100%;
          height: auto;
        }
      }
      .info-title{
        position: absolute;
        top: 20px;
        left: 10rem;
        .intitle{
          font-size: 16px;
          text-align: left;
        }
        img{
          float: left;
          border-radius: 15px;
          width:30px;
          height:30px;
        }
        .author-name{
          float: left;
          line-height: 30px;
          margin-left: 10px;
        }
      }
  }
  .bg-mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #292a2b;
    background-color: rgba(0,0,0,.35);
    z-index: 2;
  }
  .bg-player{
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom right;
    filter: blur(40px);
    -webkit-filter: blur(40px);
  }
}
</style>
