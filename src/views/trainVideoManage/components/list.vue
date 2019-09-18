<template>
    <el-row>
        <!--搜索-->
        <search-section :typeName="typeName" @handleFilter="handleFilter"></search-section>

        <div class="table-title clearfix">
            <h3>{{typeName==='champion'?'冠军视频源列表':'运动员视频源列表'}}</h3>
            <!--<el-button type="success" @click="addNew" v-if="extInfo.canOperate">上传视频</el-button>-->
            <el-button type="success" @click="addNew">上传视频</el-button>
        </div>
        <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                  style="width: 100%;" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <el-table-column align="center" label="视频id">
                <template slot-scope="scope">
                    <span>{{scope.row.videoId}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="视频名称">
                <template slot-scope="scope">
                    <span>{{scope.row.videoName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="所属项目">
                <template slot-scope="scope">
                    <span>{{scope.row.projectName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="视频类型">
                <template slot-scope="scope">
                    <span v-if="scope.row.videoType==1">短节目</span>
                    <span v-if="scope.row.videoType==2">长节目</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="typeName==='champion'?'冠军':'运动员'">
                <template slot-scope="scope">
                    <span>{{scope.row.athleteName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="处理状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == '-1'">未处理</span>
                    <span v-if="scope.row.status == '0'">处理中</span>
                    <span v-if="scope.row.status == '1'">已处理</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="上传人">
                <template slot-scope="scope">
                    <span>{{scope.row.createdName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="上传时间">
                <template slot-scope="scope">
                    <span>{{scope.row.createdTime}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="toDetail(scope.row)">详情</el-button>
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
</template>

<script>
    import mixins from '@/utils/mixins'
    import {getVideoList} from '@/api/trainVideoManage'
    import searchSection from './searchSection'

    export default {
        mixins: [mixins],
        props: ['typeName'],
        components: {searchSection},
        data() {
            return {
                list: null,          // table列表
                total: null,         // 总条目数
                listLoading: false,  // 查询table的loading
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                },
                extInfo: {}  // 账号的权限
            }
        },

        created() {
            this.getList();
        },

        methods: {
            // 获取列表
            getList(formData = {}) {
                this.listLoading = true;
                getVideoList({
                    videoGroup: this.typeName === 'champion' ? '1' : '2',  // 1: 冠军视频;  2: 运动员视频
                    videoId: formData.id,
                    projectId: formData.project,
                    videoType: formData.videoType,
                    status: formData.status,
                    videoName: formData.videoName,
                    athleteId: formData.athlete,
                    startTime: formData.uploadDate && formData.uploadDate[0],
                    endTime: formData.uploadDate && formData.uploadDate[1],
                    currentPage: this.listQuery.currentPage,
                    pageSize: this.listQuery.pageSize
                }).then(res => {
                    this.listLoading = false;
                    if (res.data.code == 200) {
                        let resData = res.data.data;
                        this.list = resData.list;
                        this.extInfo = resData.extInfo;
                        this.total = resData.pagination.total;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                }).catch(() => {
                    this.listLoading = false;
                })
            },

            // 上传视频
            addNew() {
                if(this.typeName === 'champion') {
                    this.$router.push('/championVideo/add');
                } else if(this.typeName === 'athlete') {
                    this.$router.push('/athleteVideo/add');
                }
            },

            // 去详情
            toDetail(row) {
                if(this.typeName === 'champion') {
                    if(row.status == '1') { // 已处理
                        this.$router.push({path: '/championVideo/detail', query: {id: row.videoId}})
                    } else { // 未处理/处理中
                        this.$router.push({path: '/championVideo/edit', query: {id: row.videoId}})
                    }
                } else if(this.typeName === 'athlete') {
                    if(row.status == '1') { // 已处理
                        this.$router.push({path: '/athleteVideo/detail', query: {id: row.videoId}})
                    } else { // 未处理/处理中
                        this.$router.push({path: '/athleteVideo/edit', query: {id: row.videoId}})
                    }

                }
            }
        }
    }
</script>

<style lang="scss" scoped>
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
</style>
