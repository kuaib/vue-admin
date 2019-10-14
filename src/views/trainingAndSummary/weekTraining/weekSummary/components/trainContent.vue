<!--日计划  训练内容反显-->
<template>
    <div class="week-summary-train-wrapper">
        <!--专项训练-->
        <el-row>
            <el-row class="item-title">专项训练</el-row>
            <el-table :data="listSpecial" border fit highlight-current-row
                      style="width: 100%;">
                <el-table-column align="center" label="训练时段">
                    <template slot-scope="scope">
                        <span>{{scope.row.trainTime[0]}}~{{scope.row.trainTime[1]}} | </span>
                        <span>{{scope.row.trainDuration}}分钟</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="训练类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.trainTypeName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="left" label="训练内容">
                    <template slot-scope="scope">
                        <span>{{scope.row.trainContentName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="left" label="内容细节" width="500">
                    <template slot-scope="scope">
                        <span>{{scope.row.trainDetailName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="重复次数" width="50">
                    <template slot-scope="scope">
                        <span>{{scope.row.repeatTimes}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>

        <!--体能训练-->
        <el-row>
            <el-row class="item-title">体能训练</el-row>
            <el-table :data="listBody" border fit highlight-current-row
                      style="width: 100%;">
                <el-table-column align="center" label="训练时段">
                    <template slot-scope="scope">
                        <span>{{scope.row.trainTime[0]}}~{{scope.row.trainTime[1]}} | </span>
                        <span>{{scope.row.trainDuration}}分钟</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="训练类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.trainTypeName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="left" label="训练内容" width="400">
                    <template slot-scope="scope">
                        <span>{{scope.row.trainContentName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="每组重复次数" width="60">
                    <template slot-scope="scope">
                        <span>{{scope.row.repeatTimes}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="动作组数" width="60">
                    <template slot-scope="scope">
                        <span>{{scope.row.actionTimes}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="组件休息间隔s" width="80">
                    <template slot-scope="scope">
                        <span>{{scope.row.restInterval}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="节奏">
                    <template slot-scope="scope">
                        <span>{{scope.row.rhythm}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    import {getWeek} from '@/utils/index'
    export default {
        mixins: [mixins],
        data() {
            return {
                listSpecial: [],       // 专项训练列表(初始化增加时候使用)
                listBody: [],          // 体能训练列表(初始化增加时候使用)
            }
        }
    }
</script>

<style lang="scss">
    .week-summary-train-wrapper {
        .item-title {
            font-size: 14px;
            color: #000;
            margin: 10px 0;
            padding-left: 5px;
            border-left: 2px solid #000;
        }
        .el-table .cell {
            white-space: pre-line;
        }
    }
</style>
