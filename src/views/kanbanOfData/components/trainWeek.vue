<!--最近周训练计划-->
<template>
    <el-table :data="list" border fit highlight-current-row
              style="width: 100%;" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column align="center" :label="!isSummary?'周计划id':'日计划id'">
            <template slot-scope="scope">
<!--                <span v-if="!isSummary">{{scope.row.trainWeekId}}</span>-->
<!--                <span v-else>{{scope.row.trainDayId}}</span>-->
              <span>{{scope.row.trainWeekId}}</span>
            </template>
        </el-table-column>

        <el-table-column align="center" label="项目">
            <template slot-scope="scope">
                <span>{{scope.row.projectName}}</span>
            </template>
        </el-table-column>

        <el-table-column align="center" label="教练员">
            <template slot-scope="scope">
                <span>{{scope.row.coachName}}</span>
            </template>
        </el-table-column>

        <el-table-column align="center" label="训练年度">
            <template slot-scope="scope">
                <span>{{scope.row.trainDate}}</span>
            </template>
        </el-table-column>

        <el-table-column align="center" label="时间范围" v-if="!isSummary">
            <template slot-scope="scope">
                <span>{{scope.row.trainDay}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="日期" v-if="isSummary">
            <template slot-scope="scope">
                <span>{{scope.row.dayStr}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="是否有视频" v-if="isSummary">
            <template slot-scope="scope">
                <span>{{scope.row.video?'是':'否'}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="是否总结" v-if="isSummary">
            <template slot-scope="scope">
                <span>{{scope.row.summary=='0'?'否':'是'}}</span>
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
                let path;
                path = '/weekTraining/weekPlan/edit';
                this.$router.push({path: path, query: {id: row.trainWeekId, canOperate: false}})

                // let path;
                // if (this.isSummary) {
                //     path = '/weekTraining/weekSummary/edit';
                //     this.$router.push(
                //         {path: path, query: {id: row.trainDayId, canOperate: false}})
                // } else {
                //     path = '/weekTraining/weekPlan/edit';
                //     this.$router.push(
                //         {path: path, query: {id: row.trainWeekId, canOperate: false}})
                // }

            },
        }
    }
</script>
