<template>
  <div class=''>
      <div class="wrapper">
        <div class="content">
          <div class="title">全部歌单</div>
          <div class="playlistbox">
            <div class="playlist" v-for="item in playlist" :key="item.id" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
              <router-link :to="{name:'playListDetail',params:{id: item.id, name: item.name, coverImg: item.coverImgUrl, creator: item.creator, count: item.playCount, desc: item.description }}">
                <div class="bar">{{item.playCount|formatCount}}</div>
                <img class="imgresponse" :src="item.coverImgUrl + '?param=300y300'" alt="" lazy="loading">
                <div class="item-name">{{item.name}}</div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {getPlayListByWhere} from '../api/index'
// import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      playlist: [],
      offset: 0,
      loading: false
    }
  },
  components: {},
  created () {
    this.get()
  },
  mounted () {},
  methods: {
    get () {
      this.loading = true
      getPlayListByWhere(this.offset, 6).then((data) => {
        var total = data.total
        var list = data.playlists
        list.forEach((val) => {
          this.playlist.push(val)
        })
        this.offset += 6
        if (this.offset > total) {
          this.offset = total
        }
        this.loading = false
      })
    },
    loadMore () {
      this.get()
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
<style>
.wrapper{
  width: 100%;
  /* padding: 0 10px; */
  /* 原来有个padding的但是在自己制作的版本的话会使range页面位置偏移 */
  height: 630px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.title{
  margin: 4.5px 0 6.75px 0;
  padding-left: 4.5px;
  border-left: 3.372px solid blue;
  text-align: left;
  font-size: 14px;
}
.playlistbox{
  display: flex;
  display: -webkit-flex;
  min-height: 323px;
  width: 100%;
  flex-wrap: wrap;
  justify-content:space-between
}
.playlistbox .playlist{
  /* height: 50px; */
  /* min-width: 80px; */
  position: relative;
  margin: 0 5px 5px 0;
  flex: 1 1 48%;
  text-align: center;
  text-decoration: none;
}
.playlistbox .playlist a{
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
}
.playlistbox .playlist .bar{
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
.playlistbox .playlist .imgresponse{
  width: 100%;
  height: 180px;
}
.playlistbox .playlist .item-name{
  height: 42px;
  font-size: 14px;
  overflow: hidden;
  text-align: left;
}
</style>
