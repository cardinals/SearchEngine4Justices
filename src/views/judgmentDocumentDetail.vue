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
    <div class="sideContainer">
      <side-bar title="裁判文书质量" :data="data"></side-bar>
      <side-bar title="法律条文" :data="data" model="details"></side-bar>
    </div>
  </div>
</template>

<script>
import { judgement } from '@/api/api.js'
import { Message } from 'element-ui'
export default {
  data () {
    return {
      data: [{
        name: '这是一段话',
        value: 'id1',
        content: '这是一段话详情这是一段话详情这是一段话详情这是一段话详情这是一段话详情'
      }, {
        name: '这是一段话这是一段话这是一段话这是一段话这是一段话这是一段话这是一段话这是一段话',
        value: 'id2',
        content: '这是一段话详情这是一段话详情这是一段话详情这是一段话详情这是一段话详情'
      }, {
        name: '这是一段话这是一段话这是一段话这是一段话这是一段话这是一段话这是一段话这是一段话这是一段话这是一段话这是一段话这是一段话',
        value: 'id3',
        content: '这是一段话详情这是一段话详情这是一段话详情这是一段话详情这是一段话详情'
      }],
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
      catalog: []
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
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/judgmentDocumentDetail.less';
</style>
