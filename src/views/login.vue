<template>
  <div class="login">
    <div class="login-left"></div>
    <div class="login-right">
      <div class="topPic"></div>
      <div class="login-nav">
        <span class="nav-span" :class="{'active':loginFlag==true,'unactive':loginFlag==false}" @click="loginFlag=true">登录</span>
        <!-- 隐藏注册功能 -->
        <span class="nav-span" :class="{'unactive':loginFlag==true,'active':loginFlag==false}" @click="loginFlag=false"  v-if="false">注册</span>
      </div>
      <!-- 登录 -->
      <div class="common-cantainer" v-show="loginFlag==true">
        <div class="common-input">
          <label class="l-label">帐号：</label>
          <input @focus="focusFn($event)" class="l-input" placeholder="请输入用户名" type="text" v-model="login_username"/>
        </div>
        <div class="common-input">
          <label class="l-label">密码：</label>
          <input @keyup.enter="goLogin" @focus="focusFn($event)" class="l-input" placeholder="请输入密码" type="password" v-model="login_password"/>
        </div>
        <div class="rem-password">
          <el-checkbox v-model="rem_password">记住密码</el-checkbox>
          <!-- <input v-model="rem_password" class='checkbox' type="checkbox" checked>
          <span class="span1">记住密码</span> -->
          <!-- 忘记密码功能隐藏 -->
          <span v-if="false" class="span2">忘记密码？</span>
        </div>
        <div class="common-input">
          <div class="common-button"  @click="goLogin">登录</div>
        </div>
          <!-- 隐藏跳过登录 -->
        <div class="jump" v-if="false" @click="$router.push('/home')">跳过登录，直接访问 →</div>
      </div>
      <!-- 注册 -->
      <div class="common-cantainer" v-show="loginFlag==false">
        <div class="common-input">
          <label class="l-label">帐号：</label>
          <input @focus="focusFn($event)" class="l-input" placeholder="请输入用户名" type="text" v-model="registor_username"/>
        </div>
        <div class="common-input">
          <label class="l-label">密码：</label>
          <input @keyup.enter="goRegistor" @focus="focusFn($event)" class="l-input" placeholder="请输入密码" type="password" v-model="registor_password"/>
        </div>
        <div class="common-input">
          <input @keyup.enter="goRegistor" class="l-yzm" placeholder="请输入验证码" type="text" v-model="registor_yzm"/>
          <img  @click="getYzm" class="yzm" />
        </div>
        <div class="common-input">
          <div class="common-button" @click="goRegistor">注册</div>
        </div>
      </div>
    </div>
    <!-- 首次登录弹框 -->
    <div class="module" v-show="ifShowModule==true">
      <div class="main">
        <div class="title">
          <i class="icon_x" @click="ifShowModule=false">×</i>
        </div>
        <div class="content">
          <div class="desc">请选择感兴趣的调解案件类型</div>
          <div class="types clearfix" id="login_choose">
            <div v-for="(item,index) in likesArr" class="once" :key="index">
              <span @click="choose(item)" :class="{'choosed':item.choose===true}">{{item.typeName}}<i class="img" v-show = item.choose></i></span>
            </div>
          </div>
        </div>
        <div class="opration clearfix">
          <div class="btn no" @click="$router.push('/home')">取消</div>
          <div class="btn yes" @click="confirm">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {imgCheck, login, register, focusType} from '@/api/api'
import {Message} from 'element-ui'
export default {
  data () {
    return {
      loginFlag: true,
      login_username: window.localStorage.getItem('tattusername'),
      login_password: window.localStorage.getItem('tattpassword'),
      registor_username: '',
      registor_password: '',
      registor_yzm: '',
      rem_password: true,
      ifShowModule: false,
      likesArr: [],
      chooseArr: []
    }
  },
  methods: {
    // 输入框focus事件,dom操作
    focusFn (ev) {
      ev.target.parentElement.style.transition = '0.3s linear'
      ev.target.parentElement.style.height = '66px'
      ev.target.previousElementSibling.style.opacity = '1'
    },
    // 登录
    goLogin () {
      let _this = this
      // 记住密码
      if (this.rem_password) {
        window.localStorage.setItem('tattusername', _this.login_username)
        window.localStorage.setItem('tattpassword', _this.login_password)
      } else {
        window.localStorage.setItem('tattusername', '')
        window.localStorage.setItem('tattpassword', '')
      }
      login({
        username: _this.login_username,
        password: _this.login_password
      }).then((res) => {
        if (res.code === 1) {
          this.$router.push('/home')
        } else if (res.code === 21) {
          _this.ifShowModule = true
          // 给每个标签设置是否被选中的标记,初始化为false
          _this.likesArr = res.data.map((item) => {
            item.choose = false
            return item
          })
        } else {
          Message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 注册
    goRegistor () {
      let _this = this
      register({
        username: _this.registor_username,
        password: _this.registor_password,
        idencode: _this.registor_yzm
      }).then((res) => {
        if (res.code === 1) {
          Message({
            message: res.message,
            type: 'success'
          })
        } else {
          Message({
            message: res.message,
            type: 'warning'
          })
        }
        // 清空注册信息,重新获取验证码
        _this.registor_yzm = ''
        _this.getYzm()
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取验证码
    getYzm () {
      imgCheck().then((res) => {
        document.getElementsByClassName('yzm')[0].src = 'data:image/png;base64,' + res
      }).catch((err) => {
        console.log(err)
      })
    },
    // 首次登录选择感兴趣
    choose (item) {
      let index = this.likesArr.indexOf(item)
      this.likesArr[index].choose = !this.likesArr[index].choose
      let indexChoose = this.chooseArr.indexOf(item.type)
      if (indexChoose !== -1) {
        this.chooseArr.splice(indexChoose, 1)
      } else {
        if (this.chooseArr.length >= 5) {
          Message({
            message: '最多选择五个感兴趣的类型',
            type: 'warning'
          })
          this.chooseArr.push(item.type)
        } else {
          this.chooseArr.push(item.type)
        }
      }
    },
    // 首次登陆确定按钮
    confirm () {
      let _this = this
      focusType({
        focus: _this.chooseArr
      }).then((res) => {
        if (res.code === 1) {
          Message({
            message: res.message,
            type: 'success'
          })
          this.$router.push('/home')
        } else {
          Message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 是否已经登录
    isLogined () {
      if (this.$store.state.header.ifLogin) {
        this.$router.push('/home')
      }
    }
  },
  mounted () {
    // // 是否已经登录
    // this.isLogined()
    // // 获取验证码
    // this.getYzm()
    // 模拟登陆
    login({
      username: 's1',
      password: '102102102'
    }).then((res) => {
      if (res.code === 1) {
        this.$router.push('/home')
      }
    })
  }
}
</script>
<style>
.el-checkbox{
  margin-left: 5px;
}
.el-checkbox__label{
  color:#B4B4B4!important;
}
</style>

<style lang="less" scoped>
  @import '~@/assets/css/login.less';
</style>
