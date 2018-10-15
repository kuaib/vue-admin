<template>
    <div class="report">
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <el-row class="item-row">
                    <h3>报告输出 Report Export</h3>
                </el-row>
                <el-row :gutter="20" class="item-row">
                    <el-col :span="12">
                        <el-radio v-model="chooseType" label="1">选择队伍 Choose Team</el-radio>
                    </el-col>
                    <el-col :span="12">
                        <el-radio v-model="chooseType" label="2">选择运动员 Choose Athlete</el-radio>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="item-row">
                    <el-col :span="12">
                        <el-select v-model="teamId" placeholder="请选择队伍 Choose Team" @change="getAthleteList">
                            <el-option v-for="item in teamList" :label="item.teamName" :value="item.teamId"
                                       :key="item.teamId"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="12" v-show="chooseType=='2'">
                        <el-select v-model="athleteId" placeholder="请选择运动员 Choose Athlete">
                            <el-option v-for="item in athleteList" :label="item.athleteName" :value="item.athleteId"
                                       :key="item.athleteId"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="item-row">
                    <el-col :span="8" class="wordTip">最近报告 Recent Report：</el-col>
                    <el-col :span="16" style="font-size:14px;">
                        Before
                        <el-date-picker type="date" placeholder="选择日期 Select date" v-model="time"
                                        style="width: 100%;" value-format="yyyy-MM-dd" class="time"></el-date-picker>
                        之前
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="item-row btn">
                    <el-col :span="12">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="1">运动员基本信息 Athlete Basice Info</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="2">损伤测试 Injury Testing</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="item-row btn">
                    <el-button type="primary" @click="exportPdf">导出 Export</el-button>
                </el-row>
                <el-row :gutter="20" class="item-row">
                    <el-col :span="18" class="wordTip">损伤测试历史报告 Injury testing history report</el-col>
                </el-row>
                <el-row :gutter="20" class="item-row">
                    <el-col :span="5" class="label-words">
                        <p>选择时间段</p>
                        <p>Select Period</p>
                    </el-col>
                    <el-col :span="19">
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
    import { getAthleteListByTeam } from '@/api/athlete'
    import { dowloadPdf } from '@/api/report'
    export default ({
        data() {
            return {
                chooseType: '1',    // 选择队伍还是运动员
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
                // 当选中运动员的时候才需要显示运动员下拉
                if(this.chooseType == '2') {
                    getAthleteListByTeam(this.teamId).then(res => {
                        if(res.data.code === 200) {
                            const data = res.data.data;
                            if(data && data.length > 0) {
                                this.athleteList = data;
                                this.athleteId = data[0].athleteId;
                            } else {
                                this.athleteList = [];
                                this.athleteId = null;
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
                }
            },

            // 导出运动员基本信息/损伤测试报告(pdf)
            exportPdf() {
                dowloadPdf({athleteId: this.athleteId, beforeDate:this.time}).then(res => {
                    console.log(res)
                    // if(res.status == 200) {
                    //     if(res.data) { // 有对应的pdf再去下载
                    //         window.location.href = '/sports/sys/downloadPdf?athleteId=' + this.athleteId + '&beforeDate=' + this.time
                    //     } else {
                    //         console.log('没有pdf报告')
                    //     }
                    // }
                })
            },

            // 损伤测试的历史报告(excel)
            exportExcel() {

            }
        },
        watch: {
            chooseType(val) {
                if(val == '2') {
                    this.getAthleteList()
                }
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
            font-size: 14px;
            font-weight: 700;
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
        .label-words {
            p {
                font-size: 14px;
                &:first-child {
                    margin-bottom: 5px;
                }
            }
        }
    }
</style>