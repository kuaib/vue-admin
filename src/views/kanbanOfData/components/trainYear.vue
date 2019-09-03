<!--最近年训练计划-->
<template>
    <el-table :data="list" border fit highlight-current-row
                  style="width: 100%;">
            <el-table-column align="center" label="年计划id">
                <template slot-scope="scope">
                    <span>{{scope.row.trainId}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="项目">
                <template slot-scope="scope">
                    <span>{{scope.row.projectName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="队伍">
                <template slot-scope="scope">
                    <span>{{scope.row.teamName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="训练年度">
                <template slot-scope="scope">
                    <span>{{scope.row.trainYear}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="教练员">
                <template slot-scope="scope">
                    <span>{{scope.row.coachName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status==0" style="color:red;">未提交</span>
                    <span v-if="scope.row.status==1">已提交</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="提交时间">
                <template slot-scope="scope">
                    <span>{{scope.row.updatedTime}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="toEdit(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
            }
        },

        methods: {
            // 去详情
            toEdit(row) {
                this.$router.push({path: '/yearTraining/edit', query: {id: row.trainId, status: row.status}})
            },
        }
    }
</script>
