const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  setting: state => state.user.setting,
  errorLogs: state => state.errorLog.logs,

  roles: state => state.user.roles,
  userName: state => state.user.userName,
  realName: state => state.user.realName,
  user_routers: state => state.user.routers,    // 已有路由
  user_addRouters: state => state.user.addRouters    // 自己新增的路由
}
export default getters
