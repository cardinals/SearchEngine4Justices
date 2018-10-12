/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-09-18 10:01:31
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-09-18 11:00:34
 */

<template>
  <div class="header" :style="{'margin-bottom':$route.fullPath ==='/home'?'0':'23px'}">
    <div class="main" >
      <div @click="$router.push('/home')" v-if="$route.fullPath!=='/home'" class="logo_c clearfix">
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
          <el-autocomplete
            class="inline-input"
            v-model="search"
            :fetch-suggestions="querySearch"
            placeholder="请输入关键词或案件详情"
            @select="handleSelect"
            :trigger-on-focus="false"
          >
          <template slot-scope="props">
            <div class="name">{{ props.item.text }}</div>
          </template>
          </el-autocomplete>
        </div>
        <div class="search_btn">
          <i class="el-icon-search"></i>
        </div>
      </div>
      <div class="menu_c">
        <div class="icon"></div>
        <div class="menu clearfix">
          <el-dropdown @command="goLogin" trigger="click">
            <span class="el-dropdown-link">
              {{ifLogin?'已登录':'未登录'}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command='ifLogin'>{{ifLogin?'注销':'登录'}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { tipsCN, tipsEN } from '@/api/api.js'
import {Message} from 'element-ui'
export default {
  components: {},
  data () {
    return {
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
      search: ''
    }
  },
  computed: {
    ...mapState('header', {
      ifLogin: state => state.ifLogin
    })
  },
  methods: {
    ...mapActions({
      changeLoginAsync: 'header/changeLoginAsync',
      logoutAsync: 'header/logoutAsync'
    }),
    // 注销或登录按钮
    goLogin (command) {
      let _this = this
      if (command) {
        _this.logoutAsync().then((res) => {
          if (res.code === 1) {
            Message({
              message: res.message,
              type: 'success'
            })
            _this.$router.push('/login')
          } else {
            Message({
              message: res.message,
              type: 'warning'
            })
          }
        })
      } else {
        _this.$router.push('/login')
      }
    },
    // 获取汉字
    ifCN (v) {
      if (v === '' || (/^\s*$/gi).test(v)) return ''
      let res = v.match(/[\u4e00-\u9fa5]*/g)
      if (res) {
        return res.join('')
      } else return false
    },
    // 选择下拉列表搜索条件
    handleSelect (select) {
      console.log(select)
      this.search = select.text
    },
    // 搜索提示
    querySearch (queryString, callback) {
      console.log(this.ifCN(queryString))
      let CN = this.ifCN(queryString)
      if (CN) {
        tipsCN({'prefix': CN}).then((res) => {
          callback(res.data)
        })
      } else {
        tipsEN({'prefix': queryString}).then((res) => {
          callback(res.data)
        })
      }
    }
  },
  mounted () {
    this.changeLoginAsync()
  }
}
</script>
<style lang="less">
  @import '~@/assets/css/header.less';
</style>
