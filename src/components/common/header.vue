/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-09-18 10:01:31
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-09-18 11:00:34
 */

<template>
  <div v-if="$route.fullPath!=='/login'">
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  methods: {},
  created () {
    console.log(this.$route)
  }
}
</script>
