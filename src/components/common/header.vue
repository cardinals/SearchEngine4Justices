/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-09-18 10:01:31
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-09-18 11:00:34
 */

<template>
  <div class="header" v-if="$route.fullPath!=='/login'" :style="{'margin-bottom':$route.fullPath ==='/home'?'0':'23px'}">
    <div class="main" >
      <div v-if="$route.fullPath!=='/home'" class="logo_c clearfix">
        <i class="logo"></i>
        <span class="title">同案同调</span>
      </div>
      <div  v-if="$route.fullPath!=='/home'" class="search_c">
        <div class="select_c">
           <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="border"></div>
        <div class="search">
          <!-- <el-autocomplete
            class="inline-input"
            v-model="searchVal"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete> -->
        </div>
        <div class="search_btn">
          <i class="el-icon-search"></i>
        </div>
      </div>
      <div class="menu_c">
        <div class="icon"></div>
        <div class="menu clearfix">
          <el-dropdown  trigger="click">
            <span class="el-dropdown-link">
              林峰<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { loginStatus } from '@/api/api.js'
export default {
  components: {},
  data () {
    return {
      ifLogin: false,
      options: [{
        value: '01',
        label: '调解案例'
      }, {
        value: '02',
        label: '调解协议'
      }, {
        value: '03',
        label: '裁判文书'
      }, {
        value: '04',
        label: '法律条文'
      }],
      value: '01',
      searchVal: ''
    }
  },
  computed: {

  },
  methods: {

  },
  created () {
    // let _this = this
    // loginStatus().then((res) => {
    //   if (res.code === 1) {
    //     _this.ifLogin = true
    //   }
    // })
  }
}
</script>
<style lang="less">
  @import '~@/assets/css/header.less';
</style>
