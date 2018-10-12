<template>
  <!-- 调解案件详情 -->
  <div class="mediationCD clearfix">
    <!-- 锚点组件 -->
    <anchor-point :catalog="catalog" :ids="caseDetail.dissensionId" :subtype="caseDetail.smallClass" :title="caseDetail.title" detailType="mediateCase" :collectFlag="collectFlag"  ></anchor-point>
    <!-- 内容区 -->
    <div class="mainContent">
      <div class="titles">
        <div class="real_title">{{caseDetail.title|changeNull}}</div>
        <div class="from">【案例来源】 {{caseDetail.system|changeNull}}<i class="icon"></i></div>
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
             <span class="label">案件类型:</span>
             <span class="des">{{caseDetail.smallClass|changeNull}}</span>
           </div>
           <div class="line">
             <span class="label">收录时间:</span>
             <span class="des">{{caseDetail.transactDate|changeNull}}</span>
           </div>
           <div class="line">
             <span class="label">调节单位:</span>
             <span class="des">{{caseDetail.refereeDept|changeNull}}</span>
           </div>
           <div class="line">
             <span class="label">调解员:</span>
             <span class="des name" @click.stop="showPeople($event,caseDetail.refereed)">{{caseDetail.refereed|changeNull}}</span>
           </div>
           <div class="line">
             <span class="label">关键词:</span>
             <span class="des keyword" v-for="item in caseDetail.keyword" :key="item">{{item}}</span>
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
      <side-bar title="裁判文书质量" :data="data"></side-bar>
      <side-bar title="法律条文" :data="data" model="details"></side-bar>
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
  </div>
</template>

<script>
import { mediateCaseDetail, referee } from '@/api/api.js'
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
      caseDetail: {
        title: '',
        system: '',
        smallClass: '',
        keyword: [],
        transactDate: '',
        refereeDept: '',
        refereed: '',
        dissension_id: ''
      },
      catalog: [],
      collectFlag: 0,
      content: [],
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
      left: 0,
      top: 0
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
      referee({'name': name}).then((res) => {
        if (res.code === 1) {
          _this.people = res.data
          _this.left = ev.layerX + 15 + 'px'
          _this.top = ev.layerY + 5 + 'px'
          _this.showPeopleDetail = true
        } else {
          Message({
            message: res.message,
            type: 'warning'
          })
        }
      })
    }
  },
  mounted () {
    let _this = this
    // 监听关闭showPeopleDetail
    window.addEventListener('click', function () {
      _this.showPeopleDetail = false
    })
    // 获取案件
    mediateCaseDetail({'id': _this.$route.params.id}).then((res) => {
      // 解构赋值
      if (res.code === 1) {
        let {title, system, smallClass, keyword, transactDate, refereeDept, refereed, collectFlag, content, dissensionId} = res.data
        // 处理下keyword
        keyword = keyword.split('|')
        _this.caseDetail = {title, system, smallClass, keyword, transactDate, refereeDept, refereed, dissensionId}
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
  @import '~@/assets/css/mediationCaseDetails.less';
</style>
