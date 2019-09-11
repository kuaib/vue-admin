<template>
    <div class="team-report-list-wrapper">
        <!--搜索-->
        <search-section typeName="teamReport" @handleFilter="handleFilter"></search-section>

        <!--表格-->
        <el-row>
            <div class="table-title clearfix">
                <h3>测评记录列表</h3>
                <el-button type="success" @click="addNew">导入</el-button>
            </div>
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                      style="width: 100%;" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                <el-table-column align="center" label="文档id">
                    <template slot-scope="scope">
                        <span>{{scope.row.docId}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="文档名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.docName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="项目">
                    <template slot-scope="scope">
                        <span>{{scope.row.projectName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="上传时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.teamName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <div class="act-btns">
                            <span class="btn" @click="previewItem(scope.row)">预览</span>
                            <span> | </span>
                            <span class="btn" @click="downLoadItem(scope.row)">下载</span>
                            <span> | </span>
                            <span class="btn" @click="deleteItem(scope.row)">删除</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="listQuery.currentPage" :page-sizes="[10,20,30, 50]"
                               :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper"
                               :total="total">
                </el-pagination>
            </div>
        </el-row>

        <import-file ref="importFile" @saveDoc="getList"></import-file>
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    import searchSection from '../components/searchSection'
    import importFile from './components/importFile'
    import {getSportsDocList, deleteSportsDoc} from '@/api/evaluationManagement'
    export default {
        components: {searchSection, importFile},
        mixins: [mixins],
        data() {
            return {
                list: [],            // table列表
                total: null,         // 总条目数
                listLoading: false,  // 查询table的loading
                listQuery: {
                    currentPage: 1,
                    pageSize: 10
                },
            }
        },

        created() {
            this.getList();
        },

        methods: {
            // 获取列表
            getList(formData = {}) {
                this.listLoading = true;
                getSportsDocList({
                    currentPage: this.listQuery.currentPage,
                    pageSize: this.listQuery.pageSize,
                    docId: formData.id,
                    docName: formData.fileName,
                    projectId: formData.project,
                    uploadStartTime: formData.uploadDate && formData.uploadDate[0],
                    uploadEndTime: formData.uploadDate && formData.uploadDate[1]
                }).then(res => {
                    this.listLoading = false;
                    if (res.data.code === 200) {
                        const data = res.data.data;
                        this.list = data.list;
                        this.total = data.pagination.total;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    this.listLoading = false;
                })
            },

            // 导入
            addNew() {
                this.$refs.importFile.showDialog = true;
            },

            // 预览
            previewItem(row) {
                window.open(row.docUrl, '_blank');
            },

            // 下载
            downLoadItem(row) {
                window.location.href = row.docUrl;
            },

            // 删除
            deleteItem(row) {
                this.$confirm('确定删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteSportsDoc({docId: row.docId}).then(res => {
                        if(res.data.code == 200) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getList();
                        } else {
                            this.$message({
                                message: res.data.msg,
                                type: 'warning'
                            })
                        }
                    })
                }).catch(() => {

                });
            }
        }
    }
</script>

<style lang="scss">
    .team-report-list-wrapper {
        .table-title {
            margin-top: 20px;
            margin-bottom: 10px;
            h3 {
                font-size: 18px;
                float: left;
                margin-top: 10px;
            }
            button {
                float: right;
            }
        }

        .act-btns {
            span {
                color: #409EFF;
            }
            .btn {
                cursor: pointer;
            }
        }
    }
</style>
