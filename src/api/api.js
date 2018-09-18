/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-09-18 10:19:23
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-09-18 11:03:36
 */
//  引入httpUtil
import { get, post, all } from '@/utils/httpUtil'

// 基本路径
const baseUrl = ''

// 接口示例

// 退出登录
export const logout = (params) => get(`${baseUrl}/logout`, params)

// 机构排名接口
export const organizationRankings = (params, responseType) => post(`${baseUrl}/institutionalRankings`, params, responseType)

// 机构详情接口 (司法局和司法所)
export const organizationDetails = (params) => all([
  {url: `${baseUrl}/organizationDetailsBaseTeamNumber`, params: params},
  {url: `${baseUrl}/organizationDetailsSpecializationResource`, params: params},
  {url: `${baseUrl}/organizationDetailsSuccessAmount`, params: params}
])
