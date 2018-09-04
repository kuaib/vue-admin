## 项目启动介绍

将项目clone到本地之后，需要进行一下步骤来启动项目：

- 安装node.js

    1.执行 ```node -v``` 查看node.js是否已安装，已安装请忽略此步骤

    2.[安装地址](https://nodejs.org/en/download/)

- 安装淘宝镜像

    1.命令：```npm install -g cnpm --registry=https://registry.npm.taobao.org```

    2.目的：以后安装包依赖的时候直接使用cnpm命令，加快安装速度

- 安装依赖包

    1.打开dos窗口，进入到项目的根目录下

    2.执行 ```cnpm install```，回车（需要等一小会哦）

    3.(附加)：在项目的使用中可能还需要安装自己所需要的包，你可以执行以下命令进行安装

        ```
        cnpm install 包名 --save-dev          //这个包只在开发的过程中需要，上线之后不需要
        cnpm install 包名 --save              //这个包在开发的过程中和上线之后都需要
        ```

- 启动项目

    依赖安装完成后，执行 ```npm run dev```, 回车（等待项目启动）

## 项目的改动说明

- gitlab上该项目去掉了原项目中不相关的页面，只留下框架和demo页面（demo页面：```src/views/salesManage```）

- 路由改为动态配置，由后台接口返回，暂时使用的是假数据，添加路由时可在```src/store/modules/user.js```中，修改```reformRouters```这个函数的返回值，后续有接口的时候要把接口的list集合改装成这个样子

- 去掉了自行配置的i18n数据

- 关于按钮权限的使用方法，参照 ```src/views/salesManage/documents/salsesOrder/list.vue``` 中的查看按钮

## 原 项目介绍

各位可下载或直接在线预览原著项目，原项目中有丰富的组件，我们可以从中直接拷贝所需组件放置到自己的页面中，快速形成新的页面

- [原项目在线访问地址](https://panjiachen.gitee.io/vue-element-admin/)

- [原项目GitHub地址](https://github.com/PanJiaChen/vue-element-admin/)

