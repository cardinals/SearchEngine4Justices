/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-27 14:03:38
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-09-18 10:49:45
 */

<template>
  <div class="home">
    <div class="home_c">
      <!-- logo -->
      <div class="logo"></div>
      <!-- 类型选择 -->
      <div class="types">
        <span class="span active">调解案例</span>
        <span class="span">调解协议</span>
        <span class="span">裁判文书</span>
        <span class="span">法律法规</span>
      </div>
      <!-- 搜索框 -->
      <div class="search_c">
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
        <div class="search_btn">
          <i class="icon el-icon-search"></i>
        </div>
      </div>
      <!-- 精品案例 -->
      <div class="number_c">
        <div class="box">
          <div class="img img1"></div>
          <span class="num">1229<em>篇</em></span>
          <span class="name">精品案例</span>
        </div>
        <i class="border"></i>
        <div class="box">
          <div class="img img2"></div>
          <span class="num">1229<em>篇</em></span>
          <span class="name">裁判文书</span>
        </div>
        <i class="border"></i>
        <div class="box">
          <div class="img img3"></div>
          <span class="num">1229<em>篇</em></span>
          <span class="name">协议书总量</span>
        </div>
        <i class="border"></i>
        <div class="box">
          <div class="img img4"></div>
          <span class="num">1229<em>次</em></span>
          <span class="name">访问总量</span>
        </div>
      </div>
      <!-- 推荐收藏 -->
      <div class="bottom_c">
        <div class="nav">
          <div class="button" :class="{'active':showWhich==='recommend'}" @click="showWhich='recommend'">推荐</div>
          <div class="button" :class="{'active':showWhich==='collection'}" @click="showWhich='collection'">收藏</div>
        </div>
        <div class="recommend clearfix" v-show="showWhich==='recommend'">
          <div class="re_left">
            <div class="title">
              <i class="border"></i>
              <span>热门检索</span>
              <i class="fire"></i>
            </div>
            <div class="ul">
              <div class="li" v-for="(item,index) in hotArr" :key="index">
                <span class="sort">{{index+1}}</span>
                <span class="content">{{item.title}}</span>
                <i class="new" v-if="index<=2"></i>
              </div>
            </div>
          </div>
           <div class="re_right" v-if="commonArr.length>0">
            <div class="title">
              <i class="border"></i>
              <span>常见检索</span>
            </div>
            <div class="ul">
              <div class="li" v-for="(item,index) in commonArr" :key="index">
                <span class="sort">{{index+1}}</span>
                <span class="content">{{item.title}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="collection" v-show="showWhich==='collection'">
          <div class="ul">
            <div class="li">
              <div class="types"><span>案例</span><i class="circle"></i></div>
              <div class="content">老年人的赡养纠纷,老人该何去何从老人该何去何从老人该何去何从</div>
              <div class="new"></div>
              <div class="btn">取消收藏</div>
            </div>
            <div class="li">
              <div class="types"><span>案例</span><i class="circle"></i></div>
              <div class="content">老年人的赡养纠纷,老人该何去何从</div>
              <div class="new"></div>
              <div class="btn">取消收藏</div>
            </div>
            <div class="li">
              <div class="types"><span>案例</span><i class="circle"></i></div>
              <div class="content">老年人的赡养纠纷,老人该何去何从</div>
              <div class="new"></div>
              <div class="btn">取消收藏</div>
            </div>
            <div class="li">
              <div class="types"><span>案例</span><i class="circle"></i></div>
              <div class="content">老年人的赡养纠纷,老人该何去何从</div>
              <div class="btn">取消收藏</div>
            </div>
            <div class="li">
              <div class="types"><span>案例</span><i class="circle"></i></div>
              <div class="content">老年人的赡养纠纷,老人该何去何从</div>
              <div class="btn">取消收藏</div>
            </div>
            <div class="li">
              <div class="types"><span>案例</span><i class="circle"></i></div>
              <div class="content">老年人的赡养纠纷,老人该何去何从</div>
              <div class="btn">取消收藏</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { tipsCN, tipsEN, recommend, collectionList } from '@/api/api.js'
export default {
  name: 'home',
  data () {
    return {
      showWhich: 'recommend',
      search: '',
      commonArr: [],
      hotArr: [],
      collectionArr: []
    }
  },
  computed: {
    ...mapState('header', {
      ifLogin: state => state.ifLogin
    })
  },
  watch: {
    // 监控一下header的是否登录状态,注意这里不要用箭头函数导致this指向有问题
    ifLogin: function (to, from) {
      if (to) {
        this.collectionListInit(1).then((res) => {
          console.log(res)
        })
      }
    }
  },
  methods: {
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
    },
    // 推荐列表
    recommendInit () {
      return new Promise((resolve, reject) => {
        recommend().then((res) => {
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    // 收藏列表
    collectionListInit (page) {
      return new Promise((resolve, reject) => {
        collectionList({'pagenum': page, 'pagesize': 5}).then((res) => {
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      })
    }
  },
  created () {
    let _this = this
    // 初始化推荐列表
    this.recommendInit().then((res) => {
      _this.commonArr = res.data.datacj
      _this.hotArr = res.data.datarm
      console.log(_this.hotArr)
    })
    // 如果不是从登录页面跳转进来，初始化组件的时候就能拿到公共状态
    // 如果从登录页面进来，则需要watch ifLogin状态的异步操作
    // 初始化收藏列表
    if (this.ifLogin) {
      this.collectionListInit(1).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="less">
.home{
  .inline-input{
    float: left;
    height: 65px;
    width: calc(100% - 84px);
    border-radius:4px 0px 0px 4px;
    border:1px solid rgba(231,229,229,1);
  }
  .el-input__inner{
    font-size:18px;
    height: 63px;
    border:0;
    border-radius:4px 0px 0px 4px;
  }
}
</style>

<style lang="less" scoped>
  @import '~@/assets/css/home.less';
</style>
