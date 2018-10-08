<template>
  <div class="sideBar" :style="{'height':height}">
    <div class="title">
      <span class="main">{{title}}</span>
      <div @click="show($event)" class="show_c">
        <i class="icons" :class="{'el-icon-arrow-down':!ifShow,'el-icon-arrow-up':ifShow}"></i>
        <span class="show">{{ifShow===false?'展开':'收起'}}</span>
      </div>
    </div>
    <div v-if="model==='normal'" class="ul">
        <div class="li" v-for="item in data" :key="item.value">
          <span v-if="item.name.length<=40" class="name">{{item.name|subText}}</span>
          <el-tooltip v-if="item.name.length>40" class="item" effect="dark" :content="item.name" placement="right">
            <span class="name">{{item.name|subText}}</span>
          </el-tooltip>
          <i class="point"></i>
        </div>
    </div>
    <div v-if="model==='details'" class="ul">
        <div class="li" v-for="item in data" :key="item.value" :style="{height:item.name.length > 20 ? '39px' : '19px'}">
          <span v-if="item.name.length<=40" @click="showDetail($event)" class="name">{{item.name|subText}}</span>
          <el-tooltip v-if="item.name.length>40" class="item" effect="dark" :content="item.name" placement="right">
            <span @click="showDetail($event)" class="name">{{item.name|subText}}</span>
          </el-tooltip>
          <span class="content">{{item.content}}</span>
          <i class="point"></i>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    title: String,
    model: {
      default: 'normal',
      required: false
    }
  },
  data () {
    return {
      height: '46px',
      ifShow: false
    }
  },
  filters: {
    subText (val) {
      return val.length > 40 ? val.substring(0, 40) + '...' : val
    }
  },
  methods: {
    show (ev) {
      // 找到对应的ul节点
      if (this.ifShow) {
        this.height = '46px'
      } else {
        let node = ev.target.parentNode.parentNode.nextElementSibling // nextElementSibling可以避免v-if带来的问题
        let height = node.offsetHeight + ev.target.offsetHeight
        this.height = height + 12 + 'px' // 预留12像素给margin
      }
      this.ifShow = !this.ifShow
    },
    showDetail (ev) {
      let node = ev.target.nextElementSibling
      let height = node.offsetHeight + ev.target.offsetHeight
      let container = ev.target.parentNode.parentNode.parentNode
      if (parseInt(ev.target.offsetHeight) === parseInt(ev.target.parentNode.offsetHeight)) {
        ev.target.parentNode.style.height = height + 'px'
        this.height = container.offsetHeight + node.offsetHeight + 'px'
      } else {
        ev.target.parentNode.style.height = height - node.offsetHeight + 'px'
        this.height = container.offsetHeight - node.offsetHeight + 'px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/sideBar.less';
</style>
