<template>
  <!-- 裁判文书详情 -->
  <div class="judgmentDetail clearfix">
    <anchor-point :catalog="catalog" :ids="judgementDetail.caseId" :subtype="judgementDetail.smallClass" :title="judgementDetail.title" detailType="judgement" :collectFlag="collectFlag"  ></anchor-point>
    <div class="mainContent">
      <div class="titles">
        <div class="real_title">{{judgementDetail.title}}</div>
        <div class="from">【案例来源】 {{judgementDetail.system}}<i class="icon"></i></div>
        <div class="types">裁判文书</div>
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
             <span class="label">案件类型:</span>
             <span class="des">{{judgementDetail.smallClass}}</span>
           </div>
           <div class="line">
             <span class="label">受理时间:</span>
             <span class="des">{{judgementDetail.trialDate}}</span>
           </div>
           <div class="line">
             <span class="label">案件编号:</span>
             <span class="des">{{judgementDetail.caseId}}</span>
           </div>
           <div class="line">
             <span class="label">审理法院:</span>
             <span class="des">{{judgementDetail.courtName}}</span>
           </div>
           <div class="line">
             <span class="label">关键词:</span>
             <span class="des keyword" v-for="item in judgementDetail.keyword" :key="item">{{item}}</span>
           </div>
         </div>
      </div>
      <div class="contents" v-for="item in content" :key="item.name" :id="item.name">
        <div class="title">
           <span>{{item.name}} <i class="border2"></i></span>
           <i class="border"></i>
        </div>
        <div class="content">
          <div class="stage" v-for="(item,index) in $options.filters.changeEnter(item.value)" :key="index">
            <p>{{item}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 侧边栏组件 -->
    <div class="sideContainer">
      <side-bar url='judgmentDocumentDetail' title="类案裁判文书" :data="judgement"></side-bar>
      <side-bar url='mediationAgreementDetail' title="类案调解协议" :data="protocol"></side-bar>
      <side-bar url='mediationCaseDetails' title="其他相似案例" :data="mediateCase"></side-bar>
      <side-bar url='' title="使用法条推荐" :data="law" model="details"></side-bar>
    </div>
  </div>
</template>

<script>
import { judgement, recommendList } from '@/api/api.js'
import { Message } from 'element-ui'
export default {
  data () {
    return {
      judgementDetail: {
        title: '',
        system: '',
        smallClass: '',
        courtName: '',
        keyword: [],
        lawFltw: '',
        trialDate: '',
        caseId: ''
      },
      content: [],
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
    }
  },
  mounted () {
    let _this = this
    // 获取详情
    judgement({'id': _this.$route.params.id}).then((res) => {
      // 解构赋值
      if (res.code === 1) {
        let {title, system, smallClass, courtName, keyword, lawFltw, trialDate, collectFlag, content, caseId} = res.data
        console.log(res)
        keyword = keyword.split('|')
        _this.judgementDetail = {title, system, smallClass, keyword, courtName, lawFltw, trialDate, caseId}
        _this.collectFlag = collectFlag
        _this.content = content
        // 处理下目录
        _this.catalog = content.map((item) => {
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
    recommendList({
      id: _this.$route.params.id,
      detailType: 'mediateCase'
    }).then((res) => {
      if (res.code === 1) {
        let data = res.data
        // 处理一下数据成为组件标准格式
        _this.judgement = data.judgement.map((item) => {
          return {
            'name': item.title,
            'value': item.caseId,
            'content': ''
          }
        })
        _this.law = data.law.map((item) => {
          return {
            'name': item.lawItem,
            'value': item.number,
            'content': item.content
          }
        })
        _this.mediateCase = data.mediateCase.map((item) => {
          return {
            'name': item.title,
            'value': item.dissensionId,
            'content': item.mediateCircs
          }
        })
        _this.protocol = data.protocol.map((item) => {
          return {
            'name': item.title,
            'value': item.protocolId,
            'content': item.dealdispute
          }
        })
      } else {
        Message({
          message: '获取推荐列表失败',
          type: 'warning'
        })
      }
    })
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/judgmentDocumentDetail.less';
</style>
