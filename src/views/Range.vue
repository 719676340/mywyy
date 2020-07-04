<template>
  <div class=''>
      range
      <div class="loading-wrapper">
        <div class="loading"></div>
        <div class="loading-txt">正在加载中</div>
      </div>
  </div>
</template>

<script>
import {getBannerList, getPersonalized, getPersonalizedMV} from '../api/index'
export default {
  name: '',
  data () {
    return {
      bannerList: [],
      playList: [],
      mvList: []
    }
  },
  components: {},
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
      })
    }
  }
}
</script>
<style>
/* .loading{

} */
</style>
