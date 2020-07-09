<template>
  <div class=''>
      <div class="loading-wrapper" v-if="isloading">
        <div class="loading"></div>
        <div class="loading-txt">正在加载中</div>
      </div>
      <div class="container" v-if="!isloading">
        <div class="slider">
          <swiper  :options="swiperOptions" >
            <swiper-slide v-for=" item in bannerList" :key="item.imageUrl" >
              <img :src="item.imageUrl" alt="" class="banner-item">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </div>
      <div class="wrapper">
        <div class="g-title song-list">
          推荐歌单
          <router-link :to="{path: '/index/songList'}">更多></router-link>
        </div>
        <div class="songlistbox">
          <div class="songbox" v-for="item in playList" :key="item.id">
            <div class="bar">{{item.playCount|formatCount}}</div>
            <img class="imgresponse" :src="item.picUrl">
            <div class="item-name">{{item.name}}</div>
          </div>
        </div>
        <!-- 这里会有个问题就是当我跳转路由之后导航栏的高亮标不会跟着移动 所以是需要监听路由变化的 -->
      </div>
  </div>
</template>

<script>
import {getBannerList, getPersonalized, getPersonalizedMV} from '../api/index'
export default {
  name: '',
  data () {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      isloading: true,
      bannerList: [],
      playList: [],
      mvList: []
    }
  },
  components: {
  },
  created () {
    this.loadDate()
  },
  mounted () {},
  methods: {
    loadDate () {
      let personSongList = getPersonalized()
      let BannerList = getBannerList()
      let PersonalizedMV = getPersonalizedMV()
      Promise.all([personSongList, BannerList, PersonalizedMV]).then(data => {
        this.playList = data[0].result.length > 6 ? data[0].result.slice(0, 6) : data[0].result
        this.bannerList = data[1].banners
        this.mvList = data[2].result.length > 4 ? data[2].result.slice(0, 6) : data[2].result
        this.isloading = false
      })
    }
  },
  filters: {
    formatCount (value) {
      if (value < 10000) {
        return value
      } else {
        return (value / 10000).toFixed(0) + '万'
      }
    }
  }
}
</script>
<style>
.loading{
  position: absolute;
  top: 0;
  left: 50%;
  width: 2rem;
  height: 2rem;
  margin-top: 70%;
  margin-left: -1.5rem;
  background: #fff;
  background:url('../../static/rage_loading.png') no-repeat;
  background-size: cover;
  -webkit-animation: rotateArround 3.5s linear 3s infinite;
  animation: rotateArround 3.5s linear 3s infinite;
}
/* .slider{
  width: 100%;
  height: 166.5px;
} */
.container{
  padding: 0;
  margin-top: 0;
}
.banner-item{
  width: 100%;
  height: 166.5px;
  background: url('../../static/banner-item-load.png') no-repeat;
  background-size: cover;
  overflow: hidden;
}
.g-title{
  padding-left: 25px;
  color: #333;
  height: 35px;
  line-height: 35px;
  font-size: 16px;
  text-align: left;
}
.g-title a{
  float: right;
  font-size: 12px;
  color: #666;
}
.song-list {
  background: url("../../static/aei.png") no-repeat left center;
  background-size: 20px 20px;
}

.songlistbox{
  display: flex;
  display: -webkit-flex;
  min-height: 323px;
  width: 100%;
  flex-wrap: wrap;
  justify-content:space-between
}
.songlistbox .songbox{
  /* height: 50px; */
  /* min-width: 80px; */
  position: relative;
  margin: 0 5px 5px 0;
  flex: 1 1 30%;
  text-align: center;
}
.songlistbox .songbox .bar{
  position: absolute;
  color: #fff;
  left: 0px;
  top: 0px;
  width: 100%;
  box-sizing: border-box;
  text-align: right;
  padding: 2px 5px;
  background-color: rgba(0,0,0,.2);
}
.songlistbox .songbox .imgresponse{
  width: 100%;
  height: 112.5px;
}
.songlistbox .songbox .item-name{
  height: 38.25px;
  font-size: 12px;
  overflow: hidden;
  text-align: left;
}
</style>
