/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-10 11:54:23
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-09-18 10:51:51
 */

<template>
  <div id="app" v-loading="$store.state.app.isShowLoading">
    <container></container>
  </div>
</template>

<script>
import container from '@/views/container'

export default {
  name: 'app',
  components: {
    container
  }
}
</script>

<style lang="less">
  html,body {
    height: 100%;
    width: 100%;
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    width: 100%;
  }
</style>
