/**
 * 混入
 */

import {getSportsList, getBaseInfo} from '@/api/common'
export default {
    data() {
        return {
            allBaseListObj: [],      // 基础下拉对象
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

            } else {
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

        // 获取大项列表
        getBigProList(formData = {}) {
            getSportsList({
                projectId: formData.id,
                projectName: formData.name,
                status: formData.bigProjectState,
                currentPage:  this.listQuery.currentPage,
                pageSize: listQuery.pageSize
            }).then(res => {
                if(res.data.code == 200) {
                    this.list = res.data.data.list;
                    this.total =  res.data.data.pagination.total;
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    });
                }
            })
        },

        // 基础下拉
        getAllList() {
            getBaseInfo().then(res => {
                if(res.data.code == 200) {
                    this.allBaseListObj = res.data.data;
                } else {
                    this.$message({
                        message: '获取基础下拉列表失败',
                        type: 'warning'
                    });
                }
            })
        }

    }
}
