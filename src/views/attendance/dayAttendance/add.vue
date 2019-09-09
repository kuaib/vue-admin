<!--创建日考勤-->
<template>
    <div class="attendance-day-add-wrapper">
        <!--tab切换-->
        <change-tab-bar typeName="day"></change-tab-bar>

        <!--基础信息-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">基础信息</span>
            </div>
            <el-form :model="baseForm" ref="baseForm" :rules="rules" label-width="150px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="队伍：">
                            <span>{{baseForm.team}}</span>
                        </el-form-item>
                    </el-col>
                    <!--<el-col :span="8">-->
                        <!--<el-form-item label="考勤id：">-->
                            <!--<span>{{baseForm.id}}</span>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <el-col :span="8">
                        <el-form-item label="考勤时间" prop="date">
                            <el-date-picker
                                    v-model="baseForm.date"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="请选择考勤时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="考勤时段" prop="stage">
                            <el-select v-model="baseForm.stage" placeholder="请选择考勤时段">
                                <el-option
                                        v-for="item in stageList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="项目：">
                            <span>{{baseForm.project}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="教练员：">
                            <span>{{baseForm.coach}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>

        <!--考勤详情-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">考勤详情</span>
            </div>
            <el-row class="train-section">
                <el-table :data="list" border highlight-current-row style="width: 100%" max-height="250">
                    <el-table-column label="编号" type="index" width="50"></el-table-column>
                    <el-table-column prop="name" label="姓名" align="center" header-align="center">
                        <template slot-scope="scope">
                            <!--<el-input v-if="scope.row.name.editFlag" v-model="scope.row.name.value" v-focus @blur="changeStatus(scope,'blur','list'+scope.$index)" :ref="'list'+scope.$index"></el-input>-->
                            <!--<el-select v-if="scope.row.name.editFlag" v-model="scope.row.name.value" placeholder="请选择运动员" v-focus @change="changeStatus(scope,'blur','list'+scope.$index)" :ref="'list'+scope.$index">-->
                                <!--<el-option-->
                                        <!--v-for="item in athleteList"-->
                                        <!--:key="item.dicKey"-->
                                        <!--:label="item.dicValue"-->
                                        <!--:value="item.dicKey">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                            <!--<div v-else class="table-item-div" @click="changeStatus(scope,'focus','list'+scope.$index)">{{scope.row.name.label}}</div>-->
                            <div class="table-item-div">{{scope.row.name.label}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="attendance" label="出勤" align="center" header-align="center">
                        <template slot-scope="scope">
                            <div class="table-item-div" v-if="scope.row.attendance.editFlag" @click="toggleStatus(scope,'del')">✓</div>
                            <div class="table-item-div" v-else @click="toggleStatus(scope,'add')"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="late" label="迟到" align="center" header-align="center">
                        <template slot-scope="scope">
                            <div class="table-item-div" v-if="scope.row.late.editFlag" @click="toggleStatus(scope,'del')">✓</div>
                            <div class="table-item-div" v-else @click="toggleStatus(scope,'add')"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="leaveEarly" label="早退" align="center" header-align="center">
                        <template slot-scope="scope">
                            <div class="table-item-div" v-if="scope.row.leaveEarly.editFlag" @click="toggleStatus(scope,'del')">✓</div>
                            <div class="table-item-div" v-else @click="toggleStatus(scope,'add')"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="singLeave" label="事假" align="center" header-align="center">
                        <template slot-scope="scope">
                            <div class="table-item-div" v-if="scope.row.singLeave.editFlag" @click="toggleStatus(scope,'del')">✓</div>
                            <div class="table-item-div" v-else @click="toggleStatus(scope,'add')"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="absenteeism" label="旷工" align="center" header-align="center">
                        <template slot-scope="scope">
                            <div class="table-item-div" v-if="scope.row.absenteeism.editFlag" @click="toggleStatus(scope,'del')">✓</div>
                            <div class="table-item-div" v-else @click="toggleStatus(scope,'add')"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="weakLeave" label="病假" align="center" header-align="center">
                        <template slot-scope="scope">
                            <div class="table-item-div" v-if="scope.row.weakLeave.editFlag" @click="toggleStatus(scope,'del')">✓</div>
                            <div class="table-item-div" v-else @click="toggleStatus(scope,'add')"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="injury" label="工伤" align="center" header-align="center">
                        <template slot-scope="scope">
                            <div class="table-item-div" v-if="scope.row.injury.editFlag" @click="toggleStatus(scope,'del')">✓</div>
                            <div class="table-item-div" v-else @click="toggleStatus(scope,'add')"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="other" label="其他" align="center" header-align="center">
                        <template slot-scope="scope">
                            <div class="table-item-div" v-if="scope.row.other.editFlag" @click="toggleStatus(scope,'del')">✓</div>
                            <div class="table-item-div" v-else @click="toggleStatus(scope,'add')"></div>
                        </template>
                    </el-table-column>
                    <!--<el-table-column fixed label="操作" width="80" align="center" header-align="center">-->
                        <!--<template slot-scope="scope">-->
                            <!--<span @click="handleDel(scope.$index)" class="row-act-btns">删除</span>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                </el-table>
                <!--<div style="text-align:center;margin-top:15px;"><span @click="addRow" class="addBtn">添加</span></div>-->
            </el-row>
        </el-card>

        <!--保存-->
        <el-row style="text-align: center;">
            <el-button type="primary" round @click="cancelAct" style="padding: 12px 35px;">取 消</el-button>
            <el-button type="primary" round @click="onSubmit" :loading="btnLoading" style="padding: 12px 35px;">保 存</el-button>
        </el-row>
    </div>
</template>

<script>
    import changeTabBar from '../components/changeTabBar'
    import {saveDayAttendance} from '@/api/attendance.js'
    import mixins from '@/utils/mixins'
    export default {
        mixins: [mixins],
        components: {changeTabBar},
        data() {
            return {
                stageList: [ // 考勤时段
                    {label: '上午', value: '1'},
                    {label: '下午', value: '2'},
                    {label: '晚上', value: '3'},
                ],
                userInfo: JSON.parse(localStorage.getItem('attendanceDay')),
                btnLoading: false,
                baseForm: {
                    team: null,
                    id: null,
                    date: null,
                    stage: null,
                    project: null,
                    coach: null
                },
                rules: {
                    date: [
                        { required: true, message: '请选择考勤时间', trigger: 'change' }
                    ],
                    stage: [
                        { required: true, message: '请选择考勤时段', trigger: 'change' }
                    ],
                },
                list: []
            }
        },

        created() {
            this.baseForm.project = this.userInfo.projectName;
            this.baseForm.team = this.userInfo.teamName;
            this.baseForm.coach = this.userInfo.staffName;
            this.getAthleteList(this.formatTableList, {teamId: this.userInfo.teamId});
        },

        methods: {
            // 提交
            onSubmit() {
                this.btnLoading = true;
                let attendanceDetails = this.formatList(this.list);
                saveDayAttendance({
                    projectName: this.userInfo.projectName,
                    projectId: this.userInfo.projectId,
                    coachName: this.userInfo.staffName,
                    coachId: this.userInfo.staffId,
                    teamId: this.userInfo.teamId,
                    teamName: this.userInfo.teamName,
                    attDate: this.baseForm.date,
                    stage: this.baseForm.stage,
                    attendanceDetails: attendanceDetails
                }).then(res => {
                    if(res.data.code == 200) {
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                        this.cancelAct('save');
                    } else {
                        this.btnLoading = true;
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                }).catch(() => {
                    this.btnLoading = true;
                })
            },

            // 格式化列表（传递给后台需要）
            formatList(list) {
                let arr = [];
                list.forEach((item, idx) => {
                    let obj = {};
                    obj.athleteId = item.name.value;
                    obj.athleteName = item.name.label;
                    obj.attendance = item.attendance.editFlag ? 1 : null;
                    obj.late = item.late.editFlag ? 1 : null;
                    obj.stage = parseInt(this.baseForm.stage);
                    arr.push(obj);
                });
                return arr;
            },

            // 打勾/去掉勾
            toggleStatus(scope, eventType) {
                let columnName = scope.column.property;
                if(eventType === 'add') {
                    this.list[scope.$index][columnName].editFlag = true;
                } else if(eventType === 'del') {
                    this.list[scope.$index][columnName].editFlag = false;
                }
            },

            // 行成考勤表格
            formatTableList(athleteList) {
                if(athleteList && athleteList.length > 0) {
                    athleteList.forEach(item => {
                        this.list.push({
                            name: { label: item.dicValue, value: item.dicKey, editFlag: false },
                            attendance: { value: null, editFlag: false },
                            late: { value: null, editFlag: false}, // 迟到
                            leaveEarly: { value: null, editFlag: false },  // 早退
                            singLeave: { value: null, editFlag: false },   // 事假
                            absenteeism: { value: null, editFlag: false }, // 旷工
                            weakLeave: { value: null, editFlag: false },   // 病假
                            injury: { value: null, editFlag: false },      // 工伤
                            other: { value: null, editFlag: false },       // 其他
                        })
                    })
                }
            },








            /*******************暂不需要*********************/

            // 增加一条表格行
            addRow() {
                this.list.push({
                    name: { label: null, value: null, editFlag: false },
                    attendance: { value: null, editFlag: false },
                    late: { value: null, editFlag: false}, // 迟到
                    leaveEarly: { value: null, editFlag: false },  // 早退
                    singLeave: { value: null, editFlag: false },   // 事假
                    absenteeism: { value: null, editFlag: false }, // 旷工
                    weakLeave: { value: null, editFlag: false },   // 病假
                    injury: { value: null, editFlag: false },      // 工伤
                    other: { value: null, editFlag: false },       // 其他
                });
            },
            // 聚焦/失焦
            changeStatus(scope, eventType, refName, isIpt) {
                let val = scope.row.name.value;
                let columnName = scope.column.property;
                if(eventType === 'blur') {
                    this.list[scope.$index][columnName].editFlag = false;
                    this.athleteList.forEach(item => {
                        if(item.dicKey == val) {
                            this.list[scope.$index][columnName].label = item.dicValue;
                        }
                    })
                } else if(eventType === 'focus') {
                    this.list[scope.$index][columnName].editFlag = true;
                    if(isIpt) {
                        this.$nextTick(() => { // v-if需要渲染时间
                            this.$refs[refName] && this.$refs[refName].focus();
                        })
                    }
                }
            },

            // 删除一条表格行
            handleDel: function(index) {
                this.list.splice(index, 1)
            },
        }
    }
</script>

<style lang="scss">
    .attendance-day-add-wrapper {
        .card-box {
            margin-bottom: 25px;
        }

        .el-date-editor--monthrange.el-input, .el-date-editor--monthrange.el-input__inner {
            width: 320px;
        }
        .el-date-editor .el-range-separator {
            padding: 0;
        }
        .table-item-div {
            width:100%;
            height:36px;
            line-height: 36px;
        }
        .row-act-btns {
            color: #409EFF;
            cursor: pointer;
            text-align: center;
        }
        .addBtn {
            color: #409EFF;
            cursor: pointer;
            font-size: 16px;
        }
    }
</style>
