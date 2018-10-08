<template>
  <div class="searchList">
    <div class="searchCondition clearfix">
      <div class="label">搜索条件:</div>
      <div class="buttons">
        <span class="span">婚姻</span>
        <span class="iconx">×</span>
      </div>
      <div class="reset">重置条件</div>
    </div>
    <div class="searchCondition">
      <div class="label">相关搜索:</div>
      <div class="span2">婚姻家庭</div>
      <div class="span2">公积金住房</div>
      <div class="span2">住房赡养</div>
    </div>
    <div class="treeList clearfix">
      <div class="tree">
        <div class="classify">
          <div class="titles">
            <i style="font-size:18px" class="el-icon-menu"></i>
            <span>案件分类</span>
          </div>
          <el-tree
           class="main"
           :data="treeData"
           :props="defaultProps"
           @node-click="handleNodeClick"
           highlight-current
          ></el-tree>
        </div>
        <div class="keyword">
          <div class="titles">
            <i style="font-size:18px" class="el-icon-more"></i>
            <span>关键词</span>
          </div>
          <div class="main">
            <div class="once">
              <i class="el-icon-caret-right"></i>
              <span class="">关键词1</span>
            </div>
            <div class="once">
              <i class="el-icon-caret-right"></i>
              <span class="">关键词2</span>
            </div>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="others">
          <div class="label">排序:</div>
          <div class="sort active">
            <span>按相关度</span>
            <i class="el-icon-download"></i>
          </div>
          <div class="sort">
            <span>按时间</span>
            <i class="el-icon-download"></i>
          </div>
          <div class="echarts">
            <i class="el-icon-menu"></i>
            <span>类案分析</span>
          </div>
          <div class="num">共130篇</div>
        </div>
        <div class="once">
          <div class="main">
            <div class="titles">
              <span>夫妻之间严重缺乏信任，住房意见不同起婚姻纠纷</span>
            </div>
            <div class="infos clearfix">
              <span class="span">婚姻家庭纠纷</span>
              <i class="border"></i>
              <span class="span">杨浦区五角场街道调委会</span>
              <i class="border"></i>
              <span class="span">2018-3-21</span>
            </div>
            <div class="details">
              <div class="line1">【案件详情】</div>
              <div class="line2">本案中，调委会调动医患双方选择快捷的专家评鉴形式，引导双方依据专家的评鉴意见理清责任，快速解决医患纠纷，既维护了患者的合理诉求，又维护了院方的合法权益，为医患双方带来和谐，彰显人民调解的巨大作用。</div>
            </div>
            <div class="types">调解案例</div>
          </div>
          <div class="otherInfo">
            <div class="buttons" @click="showDom($event,'法条')" :class="{'active':state==='法条'}">适用法条推荐</div>
            <div class="buttons" @click="showDom($event,'文书')" :class="{'active':state==='文书'}">类案裁判文书</div>
            <div class="buttons" @click="showDom($event,'类案')" :class="{'active':state==='类案'}">类案调解协议</div>
          </div>
          <div class="hide_c">
            <div class="hideBlock" :class="{'delt1':state==='法条','delt2':state==='文书','delt3':state==='类案','active':state}">
              <div class="once_h">
                <div class="title1">《最高人民法院关于人民法院审理未办结婚登记而以夫妻名义同居生活案件的若干意见》第四条</div>
                <div class="title2">【案件详情】</div>
                <div class="contents">任何组织和个人不得以妇女未婚、结婚、离婚、丧偶等为由，侵害妇女在农村集体经济组织中的各项权益因结婚男方到女方住所落户到，男方和子女享有与所在地农村集体经济组织成员平等的权益</div>
              </div>
              <div class="once_h">
                <div class="title1">《最高人民法院关于人民法院审理未办结婚登记而以夫妻名义同居生活案件的若干意见》第四条</div>
                <div class="title2" v-if="false">【案件详情】</div>
                <div class="contents">任何组织和个人不得以妇女未婚、结婚、离婚、丧偶等为由，侵害妇女在农村集体经济组织中的各项权益因结婚男方到女方住所落户到，男方和子女享有与所在地农村集体经济组织成员平等的权益</div>
              </div>
            </div>
          </div>
        </div>
        <div class="once">
          <div class="main">
            <div class="titles">
              <span>夫妻之间严重缺乏信任，住房意见不同起婚姻纠纷</span>
            </div>
            <div class="infos clearfix">
              <span class="span">婚姻家庭纠纷</span>
              <i class="border"></i>
              <span class="span">杨浦区五角场街道调委会</span>
              <i class="border"></i>
              <span class="span">2018-3-21</span>
            </div>
            <div class="details">
              <div class="line1">【案件详情】</div>
              <div class="line2">本案中，调委会调动医患双方选择快捷的专家评鉴形式，引导双方依据专家的评鉴意见理清责任，快速解决医患纠纷，既维护了患者的合理诉求，又维护了院方的合法权益，为医患双方带来和谐，彰显人民调解的巨大作用。</div>
            </div>
            <div class="types">调解案例</div>
          </div>
          <div class="otherInfo">
            <div class="buttons" @click="showDom($event,'法条')" :class="{'active':state==='法条'}">适用法条推荐</div>
            <div class="buttons" @click="showDom($event,'文书')" :class="{'active':state==='文书'}">类案裁判文书</div>
            <div class="buttons" @click="showDom($event,'类案')" :class="{'active':state==='类案'}">类案调解协议</div>
          </div>
          <div class="hide_c">
            <div class="hideBlock" :class="{'delt1':state==='法条','delt2':state==='文书','delt3':state==='类案','active':state}">
              <div class="once_h">
                <div class="title1">《最高人民法院关于人民法院审理未办结婚登记而以夫妻名义同居生活案件的若干意见》第四条</div>
                <div class="title2">【案件详情】</div>
                <div class="contents">任何组织和个人不得以妇女未婚、结婚、离婚、丧偶等为由，侵害妇女在农村集体经济组织中的各项权益因结婚男方到女方住所落户到，男方和子女享有与所在地农村集体经济组织成员平等的权益</div>
              </div>
              <div class="once_h">
                <div class="title1">《最高人民法院关于人民法院审理未办结婚登记而以夫妻名义同居生活案件的若干意见》第四条</div>
                <div class="title2" v-if="false">【案件详情】</div>
                <div class="contents">任何组织和个人不得以妇女未婚、结婚、离婚、丧偶等为由，侵害妇女在农村集体经济组织中的各项权益因结婚男方到女方住所落户到，男方和子女享有与所在地农村集体经济组织成员平等的权益</div>
              </div>
            </div>
          </div>
        </div>
        <div class="page">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      state: '',
      treeData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    showDom (ev, val) {
      this.state = val
      // 重置所有元素,这里可以用ref标记所有dom元素,就不要操作数组了,可以精确到每个元素
      // 接口集成的时候注意一下上面这句话！！！！！！！！！！！！！！！！！！！！！！！！！！！！
      document.querySelectorAll('.hide_c').forEach((item) => {
        item.style.height = '0px'
      })
      // 要把node的height变成实际值
      let node = ev.target.parentElement.nextElementSibling
      let height = node.firstElementChild.offsetHeight
      node.style.height = height + 'px'
    },
    // 分页插件事件
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    // 树形插件点击事件
    handleNodeClick (data) {
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/searchList.less';
</style>
