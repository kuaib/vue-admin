<template>
    <div class="report">
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <el-row class="item-row">
                    <h3>报告输出 Report Export</h3>
                </el-row>
                <el-row class="item-row" :gutter="20">
                    <el-col :span="12">
                        <el-select clearable v-model="teamId" placeholder="请选择队伍 Select Team">
                            <el-option v-for="item in teamList" :label="item.teamName" :value="item.teamId"
                                       :key="item.teamId"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="12">
                        <el-select clearable v-model="athleteId" placeholder="请选择运动员 Select Athlete">
                            <el-option v-for="item in athleteList" :label="item.athleteName" :value="item.athleteId"
                                       :key="item.athleteId"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" class="wordTip">最近报告 Recent Report：</el-col>
                    <el-col :span="12">
                        Before
                        <el-date-picker type="date" placeholder="选择日期 Select date" v-model="time"
                                        style="width: 100%;" value-format="yyyy-MM-dd" class="time"></el-date-picker>
                        之前
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default ({
        data() {
            return {
                teamList: [],       // 队伍
                athleteList: [],    // 运动员
                teamId: null,
                athleteId: null,
                time: null,
            }
        },
        methods: {

        }
    })
</script>

<style lang="scss" scoped>
    .report {
        .item-row {
            margin-bottom: 20px;
            h3 {
                text-align: center;
            }
        }
        .wordTip {
            text-align: center;
            line-height: 36px;
        }
        .time {
            width: 60% !important;
            margin: 0 15px;
        }
    }
</style>