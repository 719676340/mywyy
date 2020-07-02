<template>
  <div class=''>
      range
  </div>
</template>

<script>
import {getPersonalized} from '../api/index'
export default {
  name: '',
  data () {
    return {
      personSongList: []
    }
  },
  components: {},
  created () {
    this.loadDate()
  },
  mounted () {},
  methods: {
    async loadDate () {
      this.personSongList = await getPersonalized()
    }
  }
}
</script>
<style>
</style>
