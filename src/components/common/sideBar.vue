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
        <div v-if="index<5" @click="goToDetail(item.value)" class="li" v-for="(item,index) in data" :key="index">
          <span v-if="item.name.length<=40" class="name">{{item.name|subText}}</span>
          <el-tooltip v-if="item.name.length>40" class="item" effect="dark" :content="item.name" placement="right">
            <span class="name">{{item.name|subText}}</span>
          </el-tooltip>
          <i class="point"></i>
        </div>
    </div>
    <div v-if="model==='details'" class="ul details">
        <div class="li" v-if="index<5" v-for="(item,index) in data" :key="index" :style="{height:item.name.length > 19 ? '39px' : '19px'}">
          <span v-if="item.name.length<=40" @click="showDetail($event)" class="name">{{item.name|subText}}</span>
          <el-tooltip v-if="item.name.length>40" class="item" effect="dark" :content="item.name" placement="right">
            <span @click="showDetail($event)" class="name">{{item.name|subText}}</span>
          </el-tooltip>
          <span class="content">{{item.content|deleteEnter}}</span>
          <i class="point"></i>
          <i class="triangle unshow"></i>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    title: String,
    url: {
      type: String,
      required: false
    },
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
    },
    deleteEnter (val) {
      return val.replace(/\\n/g, '')
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
    // 点击展开
    showDetail (ev) {
      let node = ev.target.nextElementSibling
      let height = node.offsetHeight + ev.target.offsetHeight
      let container = ev.target.parentNode.parentNode.parentNode
      if (parseInt(ev.target.offsetHeight) === parseInt(ev.target.parentNode.offsetHeight)) {
        ev.target.parentNode.style.height = height + 'px'
        this.height = container.offsetHeight + node.offsetHeight + 'px'
        node.nextElementSibling.nextElementSibling.className = 'triangle show'
        node.parentNode.className = 'li gray'
      } else {
        ev.target.parentNode.style.height = height - node.offsetHeight + 'px'
        this.height = container.offsetHeight - node.offsetHeight + 'px'
        node.nextElementSibling.nextElementSibling.className = 'triangle unshow'
        node.parentNode.className = 'li white'
      }
    },
    // 第一种 跳转链接
    goToDetail (val) {
      let url = '/' + this.url + '/' + val
      this.$router.push(url)
      // 如果当前页面只更改哈希，页面不会刷新，手动刷新，这里的name和页面路由一样，如有区别请手动正则\
      if (this.url === this.$route.name) {
        window.location.reload()
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/sideBar.less';
</style>
