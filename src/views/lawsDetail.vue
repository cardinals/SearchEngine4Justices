<template>
  <!-- 法律法规详情 -->
  <div class="mediationCD clearfix">
    <!-- 锚点组件 -->
    <anchor-point :catalog="catalog" :ids="lawDetail.lawId" :subtype="lawDetail.levelEffective" :title="lawDetail.lawName" detailType="law" :collectFlag="collectFlag"  ></anchor-point>
    <!-- 内容区 -->
    <div class="mainContent">
      <div class="titles">
        <div class="real_title">{{lawDetail.lawName}}</div>
        <div class="from">【案例来源】 {{lawDetail.source}}<i class="icon"></i></div>
        <div class="types">调解案例</div>
      </div>
       <div class="contents" id="基本信息">
         <div class="title">
           <span>基本信息
             <i class="border2"></i>
           </span>
           <i class="border"></i>
          </div>
         <div class="content">
           <div class="line">
             <span class="label">时效性:</span>
             <span class="des name">{{lawDetail.timeLiness}}</span>
           </div>
           <div class="line">
             <span class="label">实行时间:</span>
             <span class="des">{{lawDetail.enforceDate}}</span>
           </div>
           <div class="line">
             <span class="label">发布机关:</span>
             <span class="des">{{lawDetail.publisher}}</span>
           </div>
         </div>
        </div>
      <div class="contents" v-for="item in lawContent" :key="item.name" :id="$options.filters.deleteSpace(item.name)">
        <div class="title">
           <span>{{item.name}} <i class="border2"></i></span>
           <i class="border"></i>
        </div>
        <div class="content">
          <div class="stage" v-for="(item2,index2) in item.value" :key="index2">
            <p :style="{'text-indent':item3[0]==='第'&&item2[item3.length-1]==='条'?'1em':'2em'}" v-for="(item3,index3) in $options.filters.changeEnter(item2)" :key="index3">{{item3}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 侧边栏组件 -->
    <!-- <div class="sideContainer">
      <side-bar url='judgmentDocumentDetail' title="类案裁判文书" :data="judgement"></side-bar>
      <side-bar url='mediationAgreementDetail' title="类案调解协议" :data="protocol"></side-bar>
      <side-bar url='mediationCaseDetails' title="其他相似案例" :data="mediateCase"></side-bar>
      <side-bar url='' title="使用法条推荐" :data="law" model="details"></side-bar>
    </div> -->
  </div>
</template>

<script>
import { law, recommendList } from '@/api/api.js'
import { Message } from 'element-ui'
export default {
  data () {
    return {
      lawDetail: {
        enforceDate: '',
        lawName: '',
        timeLiness: '',
        publisher: ''
      },
      lawContent: [],
      collectFlag: 0,
      catalog: [],
      judgement: [],
      law: [],
      mediateCase: [],
      protocol: []
    }
  },
  filters: {
    changeNull (val) {
      return !val ? '暂无信息' : val
    },
    // 解析\n
    changeEnter (val) {
      return val.split('\\n')
    },
    // id删除空格
    deleteSpace (val) {
      return val.replace(/\s/g, '')
    }
  },
  methods: {
    showPeople (ev) {
      this.left = ev.layerX + 15 + 'px'
      this.top = ev.layerY + 5 + 'px'
      this.showPeopleDetail = true
    }
  },
  mounted () {
    let _this = this
    // 法律详情
    law({'id': _this.$route.params.id}).then((res) => {
      if (res.code === 1) {
        console.log(res)
        let {enforceDate, lawName, timeLiness, publisher, lawContent, source, levelEffective, collectFlag, lawId} = res.data
        _this.lawDetail = {enforceDate, lawName, timeLiness, publisher, source, levelEffective, lawId}
        _this.lawContent = lawContent
        _this.collectFlag = collectFlag
        console.log(_this.lawDetail)
        // 处理下目录
        _this.catalog = lawContent.map((item) => {
          return item.name
        })
        _this.catalog.unshift('基本信息')
      } else {
        Message({
          message: res.message,
          type: 'warning'
        })
      }
    })
    // 获取推荐
    // recommendList({
    //   id: _this.$route.params.id,
    //   detailType: 'law'
    // }).then((res) => {
    //   if (res.code === 1) {
    //     let data = res.data
    //     // 处理一下数据成为组件标准格式
    //     _this.judgement = data.judgement.map((item) => {
    //       return {
    //         'name': item.title,
    //         'value': item.caseId,
    //         'content': ''
    //       }
    //     })
    //     _this.law = data.law.map((item) => {
    //       return {
    //         'name': item.lawItem,
    //         'value': item.number,
    //         'content': item.content
    //       }
    //     })
    //     _this.mediateCase = data.mediateCase.map((item) => {
    //       return {
    //         'name': item.title,
    //         'value': item.dissensionId,
    //         'content': item.mediateCircs
    //       }
    //     })
    //     _this.protocol = data.protocol.map((item) => {
    //       return {
    //         'name': item.title,
    //         'value': item.protocolId,
    //         'content': item.dealdispute
    //       }
    //     })
    //   } else {
    //     Message({
    //       message: '获取推荐列表失败',
    //       type: 'warning'
    //     })
    //   }
    // })
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/lawsDetail.less';
</style>
