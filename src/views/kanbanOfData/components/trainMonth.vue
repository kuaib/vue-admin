<!--最近月训练计划-->
<template>
    <el-table :data="list" border fit highlight-current-row
              style="width: 100%;" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column align="center" label="月计划id">
            <template slot-scope="scope">
                <span>{{scope.row.trainMonthId}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="训练年度">
            <template slot-scope="scope">
                <span>{{scope.row.trainMonth}}</span>
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
        <el-table-column align="center" label="教练员">
            <template slot-scope="scope">
                <span>{{scope.row.coachName}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
            <template slot-scope="scope">
                <span v-if="scope.row.status==0">未提交</span>
                <span v-if="scope.row.status==1">已提交</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="是否总结" v-if="isSummary">
            <template slot-scope="scope">
                <span v-if="scope.row.summary==0">否</span>
                <span v-if="scope.row.summary==1">是</span>
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
        props: {
            list: {
                type: Array,
                default: () => {
                    return []
                }
            },
            isSummary: {
                type: Boolean,
                default: false
            }
        },

        methods: {
            // 去详情
            toEdit(row) {
                let path, updatedTime;
                if(this.isSummary) {
                    path = '/monthTraining/monthSummary/edit';
                    updatedTime = row.updatedTime;
                } else {
                    path = '/monthTraining/monthPlan/edit'
                }
                this.$router.push(
                    {path: path, query: {id: row.trainMonthId, status: row.status, updatedTime: updatedTime, canOperate: false }})
            }
        }
    }
</script>
