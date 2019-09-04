<!--运动队信息-->
<template>
    <el-form :model="teamForm" label-width="130px">
        <el-row>
            <div class="sub-title" style="margin-top:0">个人信息</div>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="运动队名称：">{{teamForm.teamName}}</el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="教练员：">{{teamForm.leaderName}}</el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="隶属大项：">{{teamForm.projectName}}</el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="隶属小项：">{{teamForm.height}}</el-form-item>
                </el-col>
            </el-row>
        </el-row>

        <el-row>
            <div class="sub-title">队员信息</div>
            <el-table :data="list" border fit highlight-current-row
                      style="width: 100%;">
                <el-table-column align="center" label="人员id">
                    <template slot-scope="scope">
                        <span>{{scope.row.staffId}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="姓名">
                    <template slot-scope="scope">
                        <span>{{scope.row.staffName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="身份">
                    <template slot-scope="scope">
                        <span>{{scope.row.jobName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="运动员等级">
                    <template slot-scope="scope">
                        <span>{{scope.row.jobLevel}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="状态" >
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==0">未提交</span>
                        <span v-if="scope.row.status==1">已提交</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="toEdit(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </el-form>
</template>

<script>
    export default {
        props: {
            teamForm: {  // 运动员信息
                type: Object,
                default: () => {
                    return {}
                }
            },
            list: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },

        methods: {
            // 去详情
            toEdit(row) {
                this.$router.push({path: '/personManage/edit', query: {id: row.staffId}})
            },
        }
    }
</script>
