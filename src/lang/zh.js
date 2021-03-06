export default {
    route: {
        dashboard: '首页',
        introduction: '简述',
        documentation: '文档',
        guide: '引导页',
        permission: '权限测试页',
        pagePermission: '页面权限',
        directivePermission: '指令权限',
        icons: '图标',
        components: '组件',
        componentIndex: '介绍',
        tinymce: '富文本编辑器',
        markdown: 'Markdown',
        jsonEditor: 'JSON编辑器',
        dndList: '列表拖拽',
        splitPane: 'Splitpane',
        avatarUpload: '头像上传',
        dropzone: 'Dropzone',
        sticky: 'Sticky',
        countTo: 'CountTo',
        componentMixin: '小组件',
        backToTop: '返回顶部',
        dragDialog: '拖拽 Dialog',
        dragKanban: '可拖拽看板',
        charts: '图表',
        keyboardChart: '键盘图表',
        lineChart: '折线图',
        mixChart: '混合图表',
        example: '综合实例',
        nested: '路由嵌套',
        menu1: '菜单1',
        'menu1-1': '菜单1-1',
        'menu1-2': '菜单1-2',
        'menu1-2-1': '菜单1-2-1',
        'menu1-2-2': '菜单1-2-2',
        'menu1-3': '菜单1-3',
        menu2: '菜单2',
        Table: 'Table',
        dynamicTable: '动态Table',
        dragTable: '拖拽Table',
        inlineEditTable: 'Table内编辑',
        complexTable: '综合Table',
        treeTable: '树形表格',
        customTreeTable: '自定义树表',
        tab: 'Tab',
        form: '表单',
        createArticle: '创建文章',
        editArticle: '编辑文章',
        articleList: '文章列表',
        errorPages: '错误页面',
        page401: '401',
        page404: '404',
        errorLog: '错误日志',
        excel: 'Excel',
        exportExcel: 'Export Excel',
        selectExcel: 'Export Selected',
        uploadExcel: 'Upload Excel',
        zip: 'Zip',
        exportZip: 'Export Zip',
        theme: '换肤',
        clipboardDemo: 'Clipboard',
        i18n: '国际化'
    },
    // 常用词
    commonwords: {
        pIpt: '请输入',
        pIptA: '请输入',
        pSel: '请选择',
        pSelA: '请选择',
        cancel: '取 消',
        confirm: '确 认',
        reset: '重 置',
        edit: '编辑',
        delete: '删除',
        create: '新建',
        actions: '操作',
        export: '导出',
        athlete: '运动员',
        member: '队员',
        team: '队伍'
    },
    navbar: {
        logOut: '注销',
        allAthlete: '所有运动员',
        teamManage: '队伍管理',
        enterData: '录入数据',
        test: '测试',

        dashboard: '首页',
        github: '项目地址',
        screenfull: '全屏',
        theme: '换肤'
    },
    // 登录页面
    login: {
        title: '系统登录',
        logIn: '登录',
        username: '用户名或邮箱',
        password: '密码',
        forgetPswd: '忘记密码？',
        usernameW1: '请输入用户名',
        usernameW2: '用户名不存在',
        passwordW1: '请输入密码',
        passwordW2: '密码不正确',
        passwordW3: '密码长度不能小于6位',
    },
    // 所有运动员页面
    allAthlete: {
        baseInfo: '基础信息',
        dailyMonitoring: '日常监测',
        damageRisk: '损伤风险',
        ranks: '队伍',
        title: '运动员照片上传',

        name: '姓名',
        special: '专项',
        sex: '性别',
        age: '年龄',
        height: '身高',
        tel: '电话',
        wx: '微信',
        birthday: '生日',
        weight: '体重',
        idCard: '身份证',
        male: '男',
        female: '女'
    },






    documentation: {
        documentation: '文档',
        github: 'Github 地址'
    },
    permission: {
        roles: '你的权限',
        switchRoles: '切换权限'
    },
    guide: {
        description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
        button: '打开引导'
    },
    components: {
        documentation: '文档',
        tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
        dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
        stickyTips: '当页面滚动到预设的位置会吸附在顶部',
        backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
        backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
        imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
    },
    table: {
        dynamicTips1: '固定表头, 按照表头顺序排序',
        dynamicTips2: '不固定表头, 按照点击顺序排序',
        dragTips1: '默认顺序',
        dragTips2: '拖拽后顺序',
        title: '标题',
        importance: '重要性',
        type: '类型',
        remark: '点评',
        search: '搜索',
        add: '添加',
        export: '导出',
        reviewer: '审核人',
        id: '序号',
        date: '时间',
        author: '作者',
        readings: '阅读数',
        status: '状态',
        actions: '操作',
        edit: '编辑',
        publish: '发布',
        draft: '草稿',
        delete: '删除',
        cancel: '取 消',
        confirm: '确 定'
    },
    errorLog: {
        tips: '请点击右上角bug小图标',
        description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
        documentation: '文档介绍'
    },
    excel: {
        export: '导出',
        selectedExport: '导出已选择项',
        placeholder: '请输入文件名(默认excel-list)'
    },
    zip: {
        export: '导出',
        placeholder: '请输入文件名(默认file)'
    },
    theme: {
        change: '换肤',
        documentation: '换肤文档',
        tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
    },
    tagsView: {
        close: '关闭',
        closeOthers: '关闭其它',
        closeAll: '关闭所有'
    }
}
