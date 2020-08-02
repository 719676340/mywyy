import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index.vue'
import Range from '../views/Range.vue'
import SongList from '../views/SongList.vue'
import LeaderBoard from '../views/LeaderBoard.vue'
import HotSinger from '../views/HotSinger.vue'
import playListDetail from '../views/playListDetail.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: Index,
      children: [{
        path: '/index/range',
        component: Range
      },
      {
        path: '/index/songlist',
        component: SongList
      },
      {
        path: '/index/leaderboard',
        component: LeaderBoard
      },
      {
        path: '/index/hotsinger',
        component: HotSinger
      }]
    },
    {
      name: 'playListDetail',
      path: '/playListDetail/:id',
      component: playListDetail
    },
    {
      path: '*',
      redirect: '/index/range'
    }
  ]
})
