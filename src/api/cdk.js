import request from '@/utils/common/request'
import qs from 'qs'
import {exportDataLink} from '@/utils/model/fileExport'

// 获取激活码日志  分页列表
export function getCdkLogList(query, params) {
    query = qs.stringify(query)
    return request.post(`/cdk/api/v1/GameCdKey/QueryCdKeyLogList?${query}`, params)
}

// 获取Cdk配置idname
export function getCdkManageList(query, params) {
    query = qs.stringify(query)
    return request.post(`/cdk/api/v1/GameCdKey/QueryCdKeyInfoList?${query}`, params)
}

// 激活码下载
export function cdkFileExport(params, query, filename) {
    exportDataLink('/cdk/api/v1/GameCdKey/FileExport', params, query, filename)
}

// 获取Cdk配置Idname
export function getCdKeyOptions(query, params) {
    query = qs.stringify(query)
    return request.post(`/cdk/api/v1/GameCdKey/QueryCdKeyOptionIdName?${query}`, params)
}

// 创建激活码配置
export function createCdKeyOption(query, params) {
    query = qs.stringify(query)
    return request.post(`/cdk/api/v1/GameCdKey/CreateCdKeyOption?${query}`, params)
}

// 创建激活码
export function createCdKey(query, params) {
    query = qs.stringify(query)
    return request.post(`/cdk/api/v1/GameCdKey/CreateCdKey?${query}`, params)
}

// 修改激活码配置
export function updateCdKey(query, params) {
    query = qs.stringify(query)
    return request.post(`/cdk/api/v1/GameCdKey/UpdateCdKey?${query}`, params)
}

// 获取单一激活码配置
export function getSigleCdKey(query, params) {
    query = qs.stringify(query)
    return request.post(`/cdk/api/v1/GameCdKey/QueryCdKeyOptionTop?${query}`, params)
}

// 获取Cdk配置  分页列表
export function getCdkConfigList(query, params) {
    query = qs.stringify(query)
    return request.post(`/cdk/api/v1/GameCdKey/QueryCdKeyOptionList?${query}`, params)
}

// 获取Cdk配置idname
export function getCdKeyById(query, params) {
    query = qs.stringify(query)
    return request.post(`/cdk/api/v1/GameCdKey/QueryCdKeyOptionIdName?${query}`, params)
}

// 停用激活码
export function stopCdKey(query) {
    query = qs.stringify(query)
    return request.post(`/cdk/api/v1/GameCdKey/StopCdKey?${query}`)
}

// 关闭和开启激活码配置（礼包卡）
export function updataCdkConfigState(query) {
    query = qs.stringify(query)
    return request.post(`/cdk/api/v1/GameCdKey/CloseCdKeyOption?${query}`)
}
