/**
 * 混入
 */

import {getBaseInfo, childProject} from '@/api/common'
export default {
    data() {
        return {
            jobInfoList: [],      // 职位列表(无key值)
            teamInfoList: [],     // 队伍列表
            coachInfoList: [],    // 教练列表
            provinceList: [],     // 省份列表
            bigProList: [],       // 大项列表
            smallProList: [],     // 小项列表(无key值，通过大项获取小项)
        }
    },

    methods: {
        // 保存成功后跳转 / 点击页面的取消按钮，回到上一页面
        cancelAct(isSave) {
            // 是否是保存成功后跳转
            if(isSave === 'save') {
                this.$store.dispatch('delVisitedViews', this.$route).then((views) => {
                    this.$router.go(-1)
                })

            } else { // 点击取消
                this.$confirm('离开后页面的信息将不能保存，确认离开吗？ ').then(() => {
                    this.$store.dispatch('delVisitedViews', this.$route).then((views) => {
                        this.$router.go(-1)
                    })
                    // done();
                }).catch(() => {})
            }
        },

        // 重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        // 点击搜索
        handleFilter(formData) {
            this.listQuery.currentPage = 1;
            this.getList(formData)
        },

        // 改变每页显示条目数
        handleSizeChange(val) {
            this.listQuery.pageSize = val;
            this.getList()
        },

        // 跳转到指定页数
        handleCurrentChange(val) {
            this.listQuery.currentPage = val;
            this.getList()
        },

        //--------------------- 公用接口--------------------------//

        // 基础下拉
        getAllList(successCallback) {
            getBaseInfo().then(res => {
                if(res.data.code == 200) {
                    let allObj = res.data.data;
                    this.jobInfoList = allObj.jobInfo;      // 职位列表(无key值)
                    this.teamInfoList = allObj.teamInfo;    // 队伍列表
                    this.coachInfoList = allObj.coachInfo;  // 教练列表
                    this.provinceList = allObj.placeInfo;   // 省份列表
                    this.bigProList = allObj.projectInfo;  // 大项列表
                    successCallback && successCallback();
                } else {
                    this.$message({
                        message: '获取基础下拉列表失败',
                        type: 'warning'
                    });
                }
            })
        },

        // 通过大项获取小项
        getSmallProList(projectId) {
            childProject({projectId: projectId}).then(res => {
                if(res.data.code == 200) {
                    this.smallProList = res.data.data;
                } else {
                    this.$message({
                        message: '获取小项失败',
                        type: 'warning'
                    });
                }
            })
        }
    }
}
