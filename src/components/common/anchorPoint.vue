<template>
  <div class="anchor_c">
    <div class="nav">
      <div class="box1" @click.stop="showList = !showList">
        <i class="icon"></i>
        <span class="span">目录</span>
      </div>
      <div class="box2">
        <i class="icon"></i>
        <span class="span">收藏</span>
      </div>
    </div>
    <div class="list-ul" v-show="showList">
      <div v-for="item in arr" :key = item.id @click="goAnchor(item.id)" class="list-li" :class="{'active':item.id === showWhich}">
        <i class="circle"></i>
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showList: true,
      showWhich: '#jibenxinxi',
      arr: [
        {id: '#jibenxinxi', name: '基本信息'},
        {id: '#anjianxiangqing', name: '案件详情'},
        {id: '#tiaojiejinguo', name: '调解经过'},
        {id: '#tiaojiejieguo', name: '案件详情'},
        {id: '#tiaojiexinde', name: '调节心得'}
      ]
    }
  },
  methods: {
    goAnchor (selector) {
      let anchor = document.querySelector(selector)
      // 交互
      this.showWhich = selector
      let index = 1
      // 计算当前滚动条和元素之差
      let delt = anchor.offsetTop - document.querySelector('html').scrollTop
      // 写个定时器实现过渡效果
      let timer = setInterval(() => {
        document.querySelector('html').scrollTop += delt / 20
        index++
        if (index === 21) { clearInterval(timer) }
      }, 10)
    }
  },
  mounted () {
    let _this = this
    // 监听滚轮 这个效果暂时不要了，鼠标滚动到底部的时候无法判定最后几个节点
    // window.addEventListener('scroll', function () {
    //   let min = 999
    //   let which = 0
    //   _this.arr.forEach((item, index) => {
    //     let anchor = document.querySelector(item.id)
    //     let delt = anchor.offsetTop - document.querySelector('html').scrollTop
    //     which = Math.abs(delt) < min ? index : which
    //     min = Math.abs(delt) < min ? Math.abs(delt) : min
    //   })
    //   _this.showWhich = _this.arr[which].id
    // })

    // body监听一下点击事件
    window.addEventListener('click', function () {
      _this.showList = false
    })
  }
}
</script>

<style lang="less">
  @import '~@/assets/css/anchorPoint.less';
</style>
