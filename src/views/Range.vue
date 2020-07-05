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
</style>
