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
        <div class="types">法律法规</div>
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
             <span class="des keyword">{{lawDetail.timeLiness}}</span>
           </div>
           <div class="line">
             <span class="label">实行时间:</span>
             <span class="des">{{lawDetail.enforceDate}}</span>
           </div>
           <div class="line">
             <span class="label">发布机关:</span>
             <span class="des">{{lawDetail.publisher}}<i style="margin-left:4px" class="icon el-icon-location"></i></span>
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
            <p :style="{'text-indent':item3[0]==='第'&&item2[item3.length-1]==='条'?'0em':'2em'}" v-for="(item3,index3) in $options.filters.changeEnter(item2)" :key="index3">{{item3}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { law } from '@/api/api.js'
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
    getLawData () {
      let _this = this
      // 法律详情
      law({'id': _this.$route.params.id}).then((res) => {
        if (res.code === 1) {
          let {enforceDate, lawName, timeLiness, publisher, lawContent, source, levelEffective, collectFlag, lawId} = res.data
          _this.lawDetail = {enforceDate, lawName, timeLiness, publisher, source, levelEffective, lawId}
          _this.lawContent = lawContent[0].name === null ? [] : lawContent
          _this.collectFlag = collectFlag
          // 处理下目录
          if (lawContent.length > 0) {
            _this.catalog = lawContent.map((item) => {
              return item.name
            })
          }
          _this.catalog.unshift('基本信息')
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
    this.getLawData()
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/lawsDetail.less';
</style>
