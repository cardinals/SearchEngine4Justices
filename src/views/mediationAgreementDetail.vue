<template>
  <!-- 调解协议详情 -->
  <div class="mediationAD clearfix">
    <!-- 锚点组件 -->
    <anchor-point :catalog="catalog" :ids="agreementDetail.protocolId" :subtype="agreementDetail.classId" :title="agreementDetail.title" detailType="protocol" :collectFlag="collectFlag"  ></anchor-point>
    <!-- 内容区 -->
    <div class="mainContent">
      <div class="titles">
        <div class="real_title">{{agreementDetail.title}}</div>
        <div class="from">【案例来源】 {{agreementDetail.system}}<i class="icon"></i></div>
        <div class="types">调解协议书</div>
      </div>
      <div class="contents" id="办案信息">
        <div class="title">
          <span>办案信息
            <i class="border2"></i>
          </span>
          <i class="border"></i>
        </div>
        <div class="content">
          <div class="line">
             <span class="label">案件编号:</span>
             <span class="des">{{agreementDetail.num|changeNull}}</span>
           </div>
           <div class="line">
             <span class="label">案件类型:</span>
             <span class="des">{{agreementDetail.smallClass|changeNull}}</span>
           </div>
           <div class="line">
             <span class="label">受理时间:</span>
             <span class="des">{{agreementDetail.dateaccepted|changeNull}}</span>
           </div>
           <div class="line">
             <span class="label">调解单位:</span>
             <span class="des">{{agreementDetail.refereeDept|changeNull}}<i style="margin-left:4px" class="icon el-icon-location"></i></span>
           </div>
           <div class="line">
             <span class="label">调解员:</span>
             <span class="des name" @click.stop="showPeople($event,agreementDetail.refereeName)">{{agreementDetail.refereeName|changeNull}}</span>
           </div>
           <div class="line">
             <span class="label">履行方式:</span>
             <span class="des keyword" v-for="item in agreementDetail.fulfillway" :key="item">{{item}}</span>
           </div>
           <div class="line">
             <span style="float:left" class="label">协议金额:</span>
             <span style="float:left;cursor:default" class="des name">{{agreementDetail.agreementAmount + '元'}}</span>
             <span class="img" @click.stop="showMoney($event)"></span>
           </div>
           <div class="line">
             <span class="label">即时履行:</span>
             <span class="des">{{agreementDetail.performAmount + '元'}}</span>
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
    <!-- 人物详情悬浮窗  这里阻止下事件冒泡-->
    <div @click.stop class="peopleDetail nv" :style="{'top':top,'left':left}" v-show="showPeopleDetail">
      <div class="line1">{{people.refereeName|changeNull}}</div>
      <div class="line2">
        <span class="span">{{people.gender|changeNull}}</span>
        <i class="border"></i>
        <span class="span">{{people.age|changeNull}}</span>
        <i class="border"></i>
        <span class="span">{{people.education|changeNull}}</span>
      </div>
      <div class="line3">
        <span class="info">{{people.workUnit|changeNull}}</span>
      </div>
      <div class="line3">
        <span class="info">{{people.mobile|changeNull}}</span>
      </div>
      <div class="line3">
        <span class="info">{{people.goodatType|changeNull}}</span>
      </div>
      <div class="abs">{{people.position|changeNull}}</div>
    </div>
    <!-- 赔偿金额悬浮窗 -->
    <div @click.stop class="moneyDetail" :style="{'top':top2,'left':left2}" v-if="showMoneyDetail">
      <div class="title">协议金额分布</div>
      <div class="echarts">
        <g2-pie :color-map="['#5AAFFE','#36CBCB','#FAD337','#4DCB73','#F2637B','#975FE4']" :padding="[20,160,20,20]" :legend-option="{'show':true,'position':'right-center'}" :width="507" :height="274" :id="'ring2'" :type="'ring'" :axis-name="{name:'金额区间(元)', value:'数量(件)'}"
        :data="moneyArr"
        :guide="guideVal"
        >
        </g2-pie>
      </div>
    </div>
  </div>
</template>

<script>
import { protocol, referee, recommendList, protocolAmount } from '@/api/api.js'
import { Message } from 'element-ui'
export default {
  data () {
    return {
      agreementDetail: {
        title: '',
        num: '',
        smallClass: '',
        dateaccepted: '',
        refereeDept: '',
        refereeName: '',
        dealAgreement: '',
        fulfillway: [],
        agreementAmount: 0,
        performAmount: 0,
        protocolId: '',
        classId: ''
      },
      collectFlag: 0,
      content: [],
      catalog: [],
      people: {
        age: 0,
        education: '',
        gender: '',
        goodatType: '',
        mobile: '',
        position: '',
        refereeName: '',
        workUnit: ''
      },
      showPeopleDetail: false,
      showMoneyDetail: false,
      left: 0,
      top: 0,
      left2: 0,
      top2: 0,
      judgement: [],
      law: [],
      mediateCase: [],
      protocol: [],
      moneyArr: [],
      guideVal: {name: '', value: ''}
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
  methods: {
    showPeople (ev, name) {
      let _this = this
      _this.showMoneyDetail = false
      referee({'name': name}).then((res) => {
        if (res.code === 1) {
          _this.people = res.data
          _this.left = ev.layerX + 15 + 'px'
          _this.top = ev.layerY + 5 + 'px'
          _this.showPeopleDetail = true
        }
      })
    },
    showMoney (ev) {
      let _this = this
      _this.showPeopleDetail = false
      _this.left2 = ev.layerX + 15 + 'px'
      _this.top2 = ev.layerY + 5 + 'px'
      _this.showMoneyDetail = true
    }
  },
  mounted () {
    let _this = this
    // 监听关闭showPeopleDetail
    window.addEventListener('click', function () {
      _this.showPeopleDetail = false
      _this.showMoneyDetail = false
    })
    // 获取调解协议书详情
    protocol({'id': _this.$route.params.id}).then((res) => {
      console.log(res)
      if (res.code === 1) {
        let {title, num, system, smallClass, dateaccepted, refereeDept, refereeName, dealAgreement, fulfillway, agreementAmount, performAmount, collectFlag, content, protocolId, classId} = res.data
        // 处理旅行方式
        fulfillway = fulfillway ? fulfillway.split(',') : ['暂无信息']
        _this.agreementDetail = {title, num, system, smallClass, dateaccepted, refereeDept, refereeName, dealAgreement, fulfillway, agreementAmount, performAmount, protocolId, classId}
        _this.collectFlag = collectFlag
        _this.content = content
        // 处理下目录
        _this.catalog = content.map((item) => {
          return item.name
        })
        _this.catalog.unshift('办案信息')
        protocolAmount({'classId': classId}).then((res) => {
          _this.moneyArr = res.data.map((item) => {
            return {
              name: item.name,
              value: item.value
            }
          })
          this.guideVal = {
            name: '平均赔偿金额',
            value: res.data[0].aveAmount + '元'
          }
        })
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
      detailType: 'protocol'
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
  @import '~@/assets/css/mediationAgreementDetail.less';
</style>
