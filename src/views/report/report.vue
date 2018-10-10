<template>
    <div class="report">
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <el-row class="item-row">
                    <h3>报告输出 Report Export</h3>
                </el-row>
                <el-row :gutter="20" class="item-row">
                    <el-col :span="12">
                        <el-select v-model="teamId" placeholder="请选择队伍 Choose Team" @change="getAthleteList">
                            <el-option v-for="item in teamList" :label="item.teamName" :value="item.teamId"
                                       :key="item.teamId"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="12">
                        <el-select v-model="athleteId" placeholder="请选择运动员 Choose Athlete">
                            <el-option v-for="item in athleteList" :label="item.athleteName" :value="item.id"
                                       :key="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="item-row">
                    <el-col :span="8" class="wordTip">最近报告 Recent Report：</el-col>
                    <el-col :span="16">
                        Before
                        <el-date-picker type="date" placeholder="选择日期 Select date" v-model="time"
                                        style="width: 100%;" value-format="yyyy-MM-dd" class="time"></el-date-picker>
                        之前
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="item-row btn">
                    <el-col :span="12">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="运动员基本信息 Athlete Basice Info"></el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="损伤测试 Injury Testing"></el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="item-row btn">
                    <el-button type="primary" @click="exportPdf">导出 Export</el-button>
                </el-row>
                <el-row :gutter="20" class="item-row">
                    <el-col :span="18">损伤测试历史报告 Injury testing history report</el-col>
                </el-row>
                <el-row :gutter="20" class="item-row">
                    <el-col :span="4">
                        <p>选择时间段</p>
                        <p>Select Period</p>
                    </el-col>
                    <el-col :span="20">
                        <el-date-picker
                                style="width: 100%;"
                                v-model="timeRange"
                                type="daterange"
                                value-format="yyyy-MM-dd"
                                range-separator="至 To"
                                start-placeholder="开始日期 Begin Time"
                                end-placeholder="结束日期 End Time">
                        </el-date-picker>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="item-row btn">
                    <el-button type="primary" @click="exportExcel">导出 Export</el-button>
                </el-row>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import { getTeamListAll } from '@/api/team'
    import { getAthleteList } from '@/api/athlete'
    export default ({
        data() {
            return {
                teamList: [],       // 队伍
                athleteList: [],    // 运动员
                teamId: null,
                athleteId: null,
                time: null,      // 最近报告时间
                checkList: [],   // 最近报告项目
                timeRange: null, // 时间段
            }
        },
        mounted() {
            this.getAllTeam();
        },
        methods: {
            // 获取所有队伍信息（不分页）
            getAllTeam() {
                getTeamListAll().then(res => {
                    if(res.data.code === 200) {
                        this.teamList = res.data.data;
                        this.teamId = this.teamList[0].teamId;
                        this.getAthleteList();
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    console.log('获取队伍列表失败')
                })
            },

            // 获取运动员列表
            getAthleteList() {
                getAthleteList({teamId: this.teamId}).then(res => {
                    if(res.data.code === 200) {
                        const data = res.data.data;
                        if(data.list && data.list.length > 0) {
                            this.athleteList = data.list;
                            this.athleteId = data.list[0].id;
                        }
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    console.log('获取运动员列表失败');
                })
            },

            // 导出运动员基本信息/损伤测试报告
            exportPdf() {

            },

            // 损伤测试的历史报告
            exportExcel() {

            }
        }
    })
</script>

<style lang="scss">
    .report {
        .item-row {
            margin-bottom: 35px;
            h3 {
                text-align: center;
            }
        }
        .wordTip {
            line-height: 36px;
        }
        .time {
            width: 60% !important;
            margin: 0 15px;
        }
        .btn {
            text-align: center;
        }
        .el-range-separator {
            width: 50px !important;
        }
    }
</style>