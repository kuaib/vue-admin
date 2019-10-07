<!--编辑日考勤-->
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
                    <el-col :span="8">
                        <el-form-item label="考勤id：">
                            <span>{{baseForm.id}}</span>
                        </el-form-item>
                    </el-col>
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
            <el-row class="train-section" v-if="hasRenderData">
                <el-table :data="list" border highlight-current-row style="width: 100%" max-height="250">
                    <el-table-column label="编号" type="index" width="50"></el-table-column>
                    <el-table-column prop="name" label="姓名" align="center" header-align="center">
                        <template slot-scope="scope">
                            <div class="table-item-div">{{scope.row.name.label}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="attendance" label="出勤" align="center" :render-header="renderHeader" header-align="center">
                        <template slot-scope="scope">
                            <div class="table-item-div" v-if="scope.row.attendance.editFlag" @click="toggleStatus(scope,'del')">✓</div>
                            <div class="table-item-div" v-else @click="toggleStatus(scope,'add')"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="late" label="迟到" align="center" :render-header="renderHeader" header-align="center">
                        <template slot-scope="scope">
                            <div class="table-item-div" v-if="scope.row.late.editFlag" @click="toggleStatus(scope,'del')">✓</div>
                            <div class="table-item-div" v-else @click="toggleStatus(scope,'add')"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="leaveEarly" label="早退" align="center" :render-header="renderHeader" header-align="center">
                        <template slot-scope="scope">
                            <div class="table-item-div" v-if="scope.row.leaveEarly.editFlag" @click="toggleStatus(scope,'del')">✓</div>
                            <div class="table-item-div" v-else @click="toggleStatus(scope,'add')"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="singLeave" label="事假" align="center" :render-header="renderHeader" header-align="center">
                        <template slot-scope="scope">
                            <div class="table-item-div" v-if="scope.row.singLeave.editFlag" @click="toggleStatus(scope,'del')">✓</div>
                            <div class="table-item-div" v-else @click="toggleStatus(scope,'add')"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="absenteeism" label="旷工" align="center" :render-header="renderHeader" header-align="center">
                        <template slot-scope="scope">
                            <div class="table-item-div" v-if="scope.row.absenteeism.editFlag" @click="toggleStatus(scope,'del')">✓</div>
                            <div class="table-item-div" v-else @click="toggleStatus(scope,'add')"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="weakLeave" label="病假" align="center" :render-header="renderHeader" header-align="center">
                        <template slot-scope="scope">
                            <div class="table-item-div" v-if="scope.row.weakLeave.editFlag" @click="toggleStatus(scope,'del')">✓</div>
                            <div class="table-item-div" v-else @click="toggleStatus(scope,'add')"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="injury" label="工伤" align="center" :render-header="renderHeader" header-align="center">
                        <template slot-scope="scope">
                            <div class="table-item-div" v-if="scope.row.injury.editFlag" @click="toggleStatus(scope,'del')">✓</div>
                            <div class="table-item-div" v-else @click="toggleStatus(scope,'add')"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="other" label="其他" align="center" :render-header="renderHeader" header-align="center">
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
            <el-button type="primary" round @click="cancelAct('save')" style="padding: 12px 35px;">取 消</el-button>
            <el-button type="primary" round @click="onSubmit" :loading="btnLoading" style="padding: 12px 35px;" v-if="canOperate">保 存</el-button>
        </el-row>
    </div>
</template>

<script>
    import changeTabBar from '../components/changeTabBar'
    import {saveDayAttendance, getDayAttendanceDetail} from '@/api/attendance.js'
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
                canOperate: JSON.parse(localStorage.getItem('attendanceDay')).canOperate,
                btnLoading: false,
                baseForm: {
                    team: null,
                    id: this.$route.query.id,
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
                list: [],
                checkAll: {attendance: true,late: true,leaveEarly: true, singLeave: true, absenteeism: true, weakLeave: true, injury: true, other: true},
                hasRenderData: false  // 是否重新给checkAll赋值
            }
        },

        created() {
            this.getDetail();
        },

        methods: {
            // 获取详情
            getDetail() {
                getDayAttendanceDetail({attendanceId: this.baseForm.id}).then(res => {
                    if(res.data.code == 200) {
                        let resData = res.data.data;
                        this.baseForm.project = resData.projectName;
                        this.baseForm.projectId = resData.projectId;
                        this.baseForm.team = resData.teamName;
                        this.baseForm.teamId = resData.teamId;
                        this.baseForm.coach = resData.coachName;
                        this.baseForm.coachId = resData.coachId;
                        this.baseForm.date = resData.attDate;
                        this.getAthleteList(() => {
                            this.list = this.reserveFormatList(resData.attendanceDetails)
                        }, {teamId: resData.teamId, projectId: resData.projectId});
                    }
                })
            },

            // 提交
            onSubmit() {
                this.$refs.baseForm.validate((valid) => {
                    if (valid) {
                        this.btnLoading = true;
                        let attendanceDetails = this.formatList(this.list);
                        saveDayAttendance({
                            attendanceId: this.baseForm.id,
                            projectName: this.baseForm.projectName,
                            projectId: this.baseForm.projectId,
                            coachName: this.baseForm.staffName,
                            coachId: this.baseForm.staffId,
                            teamId: this.baseForm.teamId,
                            teamName: this.baseForm.teamName,
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
                                this.btnLoading = false;
                                this.$message({
                                    message: res.data.msg,
                                    type: 'warning'
                                });
                            }
                        }).catch(() => {
                            this.btnLoading = true;
                        })
                    }
                })
            },

            // 格式化列表（传递给后台需要）
            formatList(list) {
                let arr = [];
                list.forEach((item) => {
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

            // 格式化列表（前端反显需要）
            reserveFormatList(list) {
                let arr = [];
                list.forEach((item, idx) => {
                    let obj = {
                        name: { label: null, value: null, editFlag: false },
                        attendance: { value: null, editFlag: false }, // 出勤
                        late: { value: null, editFlag: false}, // 迟到
                        leaveEarly: { value: null, editFlag: false },  // 早退
                        singLeave: { value: null, editFlag: false },   // 事假
                        absenteeism: { value: null, editFlag: false }, // 旷工
                        weakLeave: { value: null, editFlag: false },   // 病假
                        injury: { value: null, editFlag: false },      // 工伤
                        other: { value: null, editFlag: false },       // 其他
                    };
                    obj.name.label = item.athleteName;
                    obj.name.value = item.athleteId;
                    obj.attendance.editFlag = item.attendance == 1 ? true : false;
                    obj.late.editFlag = item.late == 1 ? true : false;
                    this.baseForm.stage = item.stage.toString();
                    arr.push(obj);

                    // 渲染是否有全部选中的
                    if(!obj.attendance.editFlag) {
                        this.checkAll.attendance = false;
                    }
                    if(!obj.late.editFlag) {
                        this.checkAll.late = false;
                    }
                    if(!obj.leaveEarly.editFlag) {
                        this.checkAll.leaveEarly = false;
                    }
                    if(!obj.singLeave.editFlag) {
                        this.checkAll.singLeave = false;
                    }
                    if(!obj.absenteeism.editFlag) {
                        this.checkAll.absenteeism = false;
                    }
                    if(!obj.weakLeave.editFlag) {
                        this.checkAll.weakLeave = false;
                    }
                    if(!obj.injury.editFlag) {
                        this.checkAll.injury = false;
                    }
                    if(!obj.other.editFlag) {
                        this.checkAll.other = false;
                    }
                });
                this.hasRenderData = true;

                return arr;
            },

            // 打勾/去掉勾
            toggleStatus(scope, eventType) {
                let columnName = scope.column.property;
                document.getElementsByClassName(columnName)[0].children[0].children[1].checked = true;
                let ele = document.getElementsByClassName(columnName)[0];
                let childSpan = ele.children[0];
                let childIpt = childSpan.children[1];

                if(eventType === 'add') {
                    let flag = true;
                    this.list[scope.$index][columnName].editFlag = true;



                    this.list.forEach((item,index) => {
                        if(!this.list[index][columnName].editFlag) {
                            flag = false;
                        }
                    });
                    // 通过改变el-checkbox的类去改变是否选中的样式
                    if(flag) {
                        this.checkAll[columnName] = true;
                        ele.className = 'el-checkbox is-checked ' + columnName;
                        childSpan.className = 'el-checkbox__input is-checked';
                        childIpt.checked = true;
                    } else {
                        this.checkAll[columnName] = false;
                        ele.className = 'el-checkbox ' + columnName;
                        childSpan.className = 'el-checkbox__input';
                        childIpt.checked = false;
                    }
                } else if(eventType === 'del') {
                    this.list[scope.$index][columnName].editFlag = false;
                    this.checkAll[columnName] = false;
                    ele.className = 'el-checkbox ' + columnName;
                    childSpan.className = 'el-checkbox__input';
                    childIpt.checked = false;
                }
            },

            // 渲染表格头部
            renderHeader(h,{column, $index}) {
                return h(
                    'div',[
                        h('span', column.label),
                        h('el-checkbox', {
                            class: column.property,
                            style: 'margin-left: 5px;',
                            props: {
                                checked: this.checkAll[column.property]
                            },
                            on:{
                                change: (checkType, $event) => this.select(checkType, $event, $index, column), // 选中事件 $event, column，这里$event=true,column是input的dom当在select里打印的时候
                            }
                        })
                    ],
                );
            },

            // 全选的事件
            select(checkType, e, idx, column) {
                if(checkType) {
                    this.list.forEach((item,index) => {
                        this.list[index][column.property].editFlag = true;
                    })
                } else {
                    this.list.forEach((item,index) => {
                        this.list[index][column.property].editFlag = false;
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
            cursor: pointer;
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
