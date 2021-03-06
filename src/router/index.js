import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
    {path: '/login', component: () => import('@/views/login/index'), hidden: true},
    // {path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true},
    {path: '/404', component: () => import('@/views/errorPage/404'), hidden: true},
    {path: '/401', component: () => import('@/views/errorPage/401'), hidden: true},
    {
        path: '',
        component: Layout,
        redirect: 'dashboard',
        children: [{
            path: 'dashboard',
            component: () => import('@/views/dashboard/index'),
            name: 'dashboard',
            meta: {title: '首页', icon: 'dashboard', noCache: true}
        }]
    }
]

export default new Router({
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})

// export const asyncRouterMap = [
//   {
//     path: '/salesManage',
//     component: Layout,
//     meta: {
//       title: '销售管理',
//       icon: 'lock',
//       roles: ['admin', 'editor'] // you can set roles in root nav
//     },
//     children: [
//       {
//         path: 'baseData',
//         component: () => import('@/views/salesManage/baseData/index'),
//         meta: {title: '基础数据'},
//         children: [{
//           path: 'clientFiles/list',
//           component: () => import('@/views/salesManage/baseData/clientFiles/list'),
//           name: 'clientFilesList',
//           meta: {
//             title: '客户档案列表',
//             // roles: ['admin'] // or you can only set roles in sub nav
//           }
//         }, {
//           path: 'clientFiles/add',
//           component: () => import('@/views/salesManage/baseData/clientFiles/add'),
//           name: 'clientFilesAdd',
//           hidden: true,
//           meta: {
//             title: '新增客户档案',
//             // roles: ['admin'] // or you can only set roles in sub nav
//           }
//         },{
//           path: 'directive',
//           component: () => import('@/views/salesManage/baseData/clientFiles/add'),
//           name: 'directivePermission',
//           meta: {
//             title: '合同管理'
//             // if do not set roles, means: this page does not require permission
//           }
//         }]
//       },
//       {
//         path: 'documents',
//         component: () => import('@/views/salesManage/documents/index'), // Parent router-view
//         name: 'documents',
//         meta: { title: '单据' },
//         redirect: '/salesManage/documents/salesOrder/list',
//         children: [
//           {
//             path: 'salesOrder/list',
//             component: () => import('@/views/salesManage/documents/salesOrder/list'),
//             name: 'salesOrderList',
//             meta: { title: '销售订单列表' }
//           },
//           {
//             path: 'salesOrder/add',
//             component: () => import('@/views/salesManage/documents/salesOrder/add'),
//             name: 'salesOrderAdd',
//             hidden: true,
//             meta: { title: '新增销售订单' }
//           },
//           {
//             path: 'salesSendOrder/list',
//             component: () => import('@/views/salesManage/documents/salesSendOrder/list'),
//             name: 'salesSendOrderList',
//             meta: { title: '销售发货单列表' }
//           },
//           {
//             path: 'salesSendOrder/add',
//             component: () => import('@/views/salesManage/documents/salesSendOrder/add'),
//             name: 'salesSendOrderAdd',
//             hidden: true,
//             meta: { title: '新增销售订单' }
//           },
//         ]
//       },
//     ]
//   },
//
//   { path: '*', redirect: '/404', hidden: true },
//
//
//
//   {
//     path: '/components',
//     component: Layout,
//     redirect: 'noredirect',
//     name: 'component-demo',
//     meta: {
//       title: 'components',
//       icon: 'component'
//     },
//     children: [
//       { path: 'tinymce', component: () => import('@/views/components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
//       { path: 'markdown', component: () => import('@/views/components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
//       { path: 'json-editor', component: () => import('@/views/components-demo/jsonEditor'), name: 'jsonEditor-demo', meta: { title: 'jsonEditor' }},
//       { path: 'splitpane', component: () => import('@/views/components-demo/splitpane'), name: 'splitpane-demo', meta: { title: 'splitPane' }},
//       { path: 'avatar-upload', component: () => import('@/views/components-demo/avatarUpload'), name: 'avatarUpload-demo', meta: { title: 'avatarUpload' }},
//       { path: 'dropzone', component: () => import('@/views/components-demo/dropzone'), name: 'dropzone-demo', meta: { title: 'dropzone' }},
//       { path: 'sticky', component: () => import('@/views/components-demo/sticky'), name: 'sticky-demo', meta: { title: 'sticky' }},
//       { path: 'count-to', component: () => import('@/views/components-demo/countTo'), name: 'countTo-demo', meta: { title: 'countTo' }},
//       { path: 'mixin', component: () => import('@/views/components-demo/mixin'), name: 'componentMixin-demo', meta: { title: 'componentMixin' }},
//       { path: 'back-to-top', component: () => import('@/views/components-demo/backToTop'), name: 'backToTop-demo', meta: { title: 'backToTop' }},
//       { path: 'drag-dialog', component: () => import('@/views/components-demo/dragDialog'), name: 'dragDialog-demo', meta: { title: 'dragDialog' }},
//       { path: 'dnd-list', component: () => import('@/views/components-demo/dndList'), name: 'dndList-demo', meta: { title: 'dndList' }},
//       { path: 'drag-kanban', component: () => import('@/views/components-demo/dragKanban'), name: 'dragKanban-demo', meta: { title: 'dragKanban' }}
//     ]
//   },
//
//   {
//     path: '/example',
//     component: Layout,
//     redirect: '/example/list',
//     name: 'example',
//     meta: {
//       title: 'example',
//       icon: 'example'
//     },
//     children: [
//       { path: 'create', component: () => import('@/views/example/create'), name: 'createArticle', meta: { title: 'createArticle', icon: 'edit' }},
//       { path: 'edit/:id(\\d+)', component: () => import('@/views/example/edit'), name: 'editArticle', meta: { title: 'editArticle', noCache: true }, hidden: true },
//       { path: 'list', component: () => import('@/views/example/list'), name: 'articleList', meta: { title: 'articleList', icon: 'list' }}
//     ]
//   }
// ]
