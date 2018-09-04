/**
销售管理--单据模块下的所有接口
*/

import request from '@/utils/request'

// 获取销售订单列表
export function getSalesOrderList(dep, name) {
  	return request({
	    url: 'aaa/bbb',
	    // url: 'erp/bd/employee/loadItems.ht',
	    method: 'post',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        // headers: {'Content-Type': 'application/json'},
	    params: {
	    	dep: 'a',
	    	name: 'b'
	    }
  	})
}

// 获取职员信息列表
export function getEmployeeList(dep, name) {
  	return request({
	    url: 'erp/bd/employee/loadItems.ht',
	    method: 'get',
	    data: {
	    	dep: dep,
	    	name: name
	    }
  	})
}

// 获取客户信息列表
export function getCustomerList() {
  	return request({
	    url: 'erp/bd/getCustomerList/loadItems.ht',
	    method: 'get'
  	})
}

// 获取部门信息
export function getDepartment() {
  	return request({
	    url: 'erp/bd/department/loadItems',
	    method: 'get'
  	})
}

// 获取客户类型
export function getCustomerType() {
  	return request({
	    url: 'erp/bd/customer/type',
	    method: 'get'
  	})
}

// 获取物品列表
export function getGoodsList() {
  	return request({
	    url: 'erp/bd/goods/list',
	    method: 'get'
  	})
}

// 获取物品分类
export function getGoodsTypes() {
  	return request({
	    url: 'erp/bd/goods/types',
	    method: 'get'
  	})
}

