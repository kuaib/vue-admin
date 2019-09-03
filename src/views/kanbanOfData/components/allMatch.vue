<!--全部比赛情况-->
<template>
    <el-table :data="list" border fit highlight-current-row empty-text="暂无比赛计划"
              style="width: 100%;">
        <el-table-column
                align="center"
                label="序号"
                type="index"
                width="50">
        </el-table-column>
        <el-table-column align="center" label="比赛日期">
            <template slot-scope="scope">
                <span>{{scope.row.compDate}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="比赛名称">
            <template slot-scope="scope">
                <span>{{scope.row.compName}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="比赛国家">
            <template slot-scope="scope">
                <span>{{scope.row.country}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="比赛城市">
            <template slot-scope="scope">
                <span>{{scope.row.city}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="比赛大项" :show-overflow-tooltip="true">
            <template slot-scope="scope">
                <span>{{scope.row.bigProName}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="比赛小项" :show-overflow-tooltip="true">
            <template slot-scope="scope">
                <span>{{scope.row.smallPro.join()}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="参赛运动员" :show-overflow-tooltip="true">
            <template slot-scope="scope">
                <span>{{scope.row.athleteSelectedName}}</span>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        data() {
            return {
                list: []
            }
        }
    }
</script>
