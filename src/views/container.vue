/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-09-18 10:05:15
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-09-18 10:51:24
 */

<template>
  <!-- 外层容器，当子元素中包含 <el-header> 或 <el-footer> 时，全部子元素会垂直上下排列，否则会水平左右排列。 -->
  <div class="container">
    <!-- 顶栏容器 -->
    <header-com class="header"></header-com>
    <div class="body">
      <!-- 路由区域 -->
      <transition name="fade"  mode="out-in">
          <router-view class="router"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'container',
  created () {
    // 保存url search 中的token
    const search = window.location.search
    if (search) {
      const token = search.split('?token=')[1]
      if (token) {
        this.$store.dispatch({ type: 'app/setToken', amount: token.split('/')[0] })
      }
    }
  }
}
</script>

<style lang="less">
  // 修改elementui默认样式
  @import '~@/assets/css/editElementui.less';
  html,body{margin:0;padding:0;}
  html{
    height:100%;
  }
  body{
    height:100%;
    overflow-x:auto;
    overflow-y:auto;
  }
  .container{
    position: relative;
    min-height:100%;
    min-width: 1366px;
  }
</style>
