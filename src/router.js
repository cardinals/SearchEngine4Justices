/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-10 11:54:33
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-09-18 10:52:51
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // 重定向根路径对应的模块
      redirect: '/home'
    },
    {
      path: '/home',
      name: '首页',
      // 登录模块
      component: () => import('./views/home.vue')
    },
    {
      path: '/error/:code',
      name: '错误页',
      // 错误页
      component: () => import('./views/error.vue')
    },
    {
      path: '*',
      redirect: '/error/404'
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue')
    },
    // 调解协议书详情页
    {
      path: '/mediationAgreementDetail/:id',
      name: 'mediationAgreementDetail',
      component: () => import('./views/mediationAgreementDetail.vue')
    },
    // 裁判文书详情页
    {
      path: '/judgmentDocumentDetail/:id',
      name: 'judgmentDocumentDetail',
      component: () => import('./views/judgmentDocumentDetail.vue')
    },
    // 调解案件详情页
    {
      path: '/mediationCaseDetails/:id',
      name: 'mediationCaseDetails',
      component: () => import('./views/mediationCaseDetails.vue')
    },
    // 法律法规详情页
    {
      path: '/lawsDetail/:id',
      name: 'lawsDetail',
      component: () => import('./views/lawsDetail.vue')
    },
    // 搜索列表页
    {
      path: '/searchList',
      name: 'searchList',
      component: () => import('./views/searchList.vue')
    }
  ]
})
