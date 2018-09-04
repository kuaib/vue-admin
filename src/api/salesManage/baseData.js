/**
销售管理--客户档案申报模块下的所有接口
*/

import request from '@/utils/request'

// 获取客户档案申报列表
export function getClientApllyList(name, type, pageNum, pageSize) {
  	return request({
	    url: 'erp/bd/customer/customerlist.ht',
	    method: 'post',
	    data: {
	    	name: name,
	    	type: type,
	    	pageNum: pageNum,
	    	pageSize: pageSize
	    }
  	})
}

// 获取客户分类
export function getClientType() {
  	return request({
	    url: 'erp/bd/customer/customerlist.ht',
	    method: 'get'
  	})
}