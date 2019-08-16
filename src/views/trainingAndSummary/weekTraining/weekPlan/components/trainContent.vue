<!--周训练计划 -- 增加每天的训练内容-->
<template>
    <div class="week-plan-train-wrapper">

        <!--一周的列表-->
        <el-row class="week-item" v-for="(item,idx) in dateArrList" :key="idx">
            <el-col :span="3">
                <div :span="3" class="week-title">{{item.weekDay}}</div>
            </el-col>
            <el-col :span="18">
                <el-row :gutter="20" v-if="item.trainList&&item.trainList.length>0">
                    <el-col :span="4" v-for="(dayItem,dayIdx) in item.trainList" :key="dayIdx">
                        <p >{{dayItem.trainTime.value[0]}}~{{dayItem.trainTime.value[1]}}</p>
                        <p >{{dayItem.trainType.value}}</p>
                    </el-col>
                </el-row>
                <el-row v-else>
                    <el-col :span="4">&nbsp;</el-col>
                </el-row>
            </el-col>
            <el-col :span="3" class="week-btn">
                <span @click="editRow(item,idx)">详情</span>
            </el-col>
        </el-row>
        <el-row class="add-btn">
            <span @click="editRow">增加日训练计划</span>
        </el-row>


        <!--显示训练计划表格-->
        <el-dialog
                :show-close="false"
                title="训练内容"
                :visible.sync="dialogVisible"
                width="60%"
                :close-on-click-modal="false"
                center>
            <el-row style="margin-bottom: 15px;">
                <el-col :span="8">
                    <el-date-picker
                            v-model="trainDate"
                            type="date"
                            format="MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="请选择训练日期">
                    </el-date-picker>
                </el-col>
                <el-col :span="3" v-if="trainDate" style="line-height:36px;"><span>周{{weekDay}}</span></el-col>
            </el-row>

            <!--专项训练/体能训练编辑框-->
            <train-content-add ref="trainContentAdd"></train-content-add>

            <!--专项训练-->
            <el-row>
                <el-table :data="listSpecial" border fit highlight-current-row
                          style="width: 100%;">
                    <el-table-column align="center" label="训练时段">
                        <template slot-scope="scope">
                            <span>{{scope.row.trainTime}} | </span>
                            <span>{{scope.row.trainDuration}}分钟</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="训练类型">
                        <template slot-scope="scope">
                            <span>{{scope.row.trainType}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="训练内容">
                        <template slot-scope="scope">
                            <span>{{scope.row.trainContent}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="内容细节">
                        <template slot-scope="scope">
                            <span>{{scope.row.trainDetail}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="重复次数">
                        <template slot-scope="scope">
                            <span>{{scope.row.repeatTimes}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <span>删除</span>
                            <span> | </span>
                            <span>编辑</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row class="add-btn"><span @click="addRow('专项')">添加</span></el-row>
            </el-row>

            <!--体能训练-->
            <el-row>
                <el-table :data="listBody" border fit highlight-current-row
                          style="width: 100%;">
                    <el-table-column align="center" label="训练时段">
                        <template slot-scope="scope">
                            <span>{{scope.row.trainTime}} | </span>
                            <span>{{scope.row.trainDuration}}分钟</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="训练类型">
                        <template slot-scope="scope">
                            <span>{{scope.row.trainType}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="训练内容">
                        <template slot-scope="scope">
                            <span>{{scope.row.trainContent}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="每组重复次数">
                        <template slot-scope="scope">
                            <span>{{scope.row.repeatTimes}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="动作组数">
                        <template slot-scope="scope">
                            <span>{{scope.row.actionTimes}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="组件休息间隔s">
                        <template slot-scope="scope">
                            <span>{{scope.row.restInterval}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="节奏">
                        <template slot-scope="scope">
                            <span>{{scope.row.rhythm}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <span>删除</span>
                            <span> | </span>
                            <span>编辑</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row class="add-btn"><span @click="addRow('体能')">添加</span></el-row>
            </el-row>


            <!--<el-row class="train-section">-->
                <!--<el-row class="edit-table-title">专项训练</el-row>-->
                <!--<el-table :data="listSpecial" border highlight-current-row style="width: 100%" max-height="250">-->

                    <!--<el-table-column prop="trainTime" label="*训练时段" align="center" width="150" header-align="center">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-time-picker v-if="scope.row.trainTime.editFlag"-->
                                    <!--:clearable="false"-->
                                    <!--:ref="'specialTrainTime'+scope.$index"-->
                                    <!--@blur="changeStatus(scope,'listSpecial','blur','specialTrainTime'+scope.$index)"-->
                                    <!--is-range-->
                                    <!--v-model="scope.row.trainTime.value"-->
                                    <!--format="HH:mm"-->
                                    <!--value-format="HH:mm"-->
                                    <!--range-separator="~"-->
                                    <!--start-placeholder="开始时间"-->
                                    <!--end-placeholder="结束时间">-->
                            <!--</el-time-picker>-->
                            <!--<div v-else class="table-item-div" @click="changeStatus(scope,'listSpecial','focus','specialTrainTime'+scope.$index)">-->
                                <!--<span v-if="scope.row.trainTime.value">{{scope.row.trainTime.value[0]}}~{{scope.row.trainTime.value[1]}}</span>-->
                                <!--<span v-if="scope.row.trainTime.value">| {{getMinutes(scope.row.trainTime.value,scope.$index,'listSpecial')}}分钟</span>-->
                            <!--</div>-->
                        <!--</template>-->
                    <!--</el-table-column>-->

                    <!--<el-table-column prop="trainType" label="*训练类型" align="center" header-align="center">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-input v-if="scope.row.trainType.editFlag" v-model="scope.row.trainType.value" v-focus @blur="changeStatus(scope,'listSpecial','blur')"></el-input>-->
                            <!--<div v-else class="table-item-div" @click="changeStatus(scope,'listSpecial','focus')">{{scope.row.trainType.value}}</div>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column prop="trainContent" label="*训练内容" align="center" header-align="center">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-input v-if="scope.row.trainContent.editFlag" v-model="scope.row.trainContent.value" v-focus @blur="changeStatus(scope,'listSpecial','blur')"></el-input>-->
                            <!--<div v-else class="table-item-div" @click="changeStatus(scope,'listSpecial','focus')">{{scope.row.trainContent.value}}</div>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column prop="trainDetail" label="内容细节" align="center" header-align="center">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-input v-if="scope.row.trainDetail.editFlag" v-model="scope.row.trainDetail.value" v-focus @blur="changeStatus(scope,'listSpecial','blur')"></el-input>-->
                            <!--<div v-else class="table-item-div" @click="changeStatus(scope,'listSpecial','focus')">{{scope.row.trainDetail.value}}</div>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column prop="repeatTimes" label="重复次数" width="80" align="center" header-align="center">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-input v-if="scope.row.repeatTimes.editFlag" v-model="scope.row.repeatTimes.value" v-focus @blur="changeStatus(scope,'listSpecial','blur')"></el-input>-->
                            <!--<div v-else class="table-item-div" @click="changeStatus(scope,'listSpecial','focus')">{{scope.row.repeatTimes.value}}</div>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column fixed label="操作" width="80" align="center" header-align="center">-->
                        <!--<template slot-scope="scope">-->
                            <!--<span @click="handleDel(scope.$index, scope.row, 'listSpecial')" class="row-act-btns">删除</span>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                <!--</el-table>-->
                <!--<div style="text-align:center;margin-top:15px;"><span @click="addRow('listSpecial')" class="addBtn">添加</span></div>-->
            <!--</el-row>-->
            <!--<el-row class="train-section">-->
                <!--<el-row class="edit-table-title">体能训练</el-row>-->
                <!--<el-table :data="listBody" border highlight-current-row style="width: 100%" max-height="250">-->
                    <!--<el-table-column prop="trainTime" label="*训练时段" width="150" align="center" header-align="center">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-time-picker v-if="scope.row.trainTime.editFlag"-->
                                            <!--:clearable="false"-->
                                            <!--:ref="'bodyTrainTime'+scope.$index"-->
                                            <!--@blur="changeStatus(scope,'listBody','blur','bodyTrainTime'+scope.$index)"-->
                                            <!--is-range-->
                                            <!--v-model="scope.row.trainTime.value"-->
                                            <!--format="HH:mm"-->
                                            <!--value-format="HH:mm"-->
                                            <!--range-separator="~"-->
                                            <!--start-placeholder="开始时间"-->
                                            <!--end-placeholder="结束时间">-->
                            <!--</el-time-picker>-->
                            <!--<div v-else class="table-item-div" @click="changeStatus(scope,'listBody','focus','bodyTrainTime'+scope.$index)">-->
                                <!--<span v-if="scope.row.trainTime.value">{{scope.row.trainTime.value[0]}}~{{scope.row.trainTime.value[1]}}</span>-->
                                <!--<span v-if="scope.row.trainTime.value">| {{getMinutes(scope.row.trainTime.value,scope.$index,'listBody')}}分钟</span>-->
                            <!--</div>-->
                        <!--</template>-->
                    <!--</el-table-column>-->

                    <!--<el-table-column prop="trainType" label="*训练类型" align="center" header-align="center">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-input v-if="scope.row.trainType.editFlag" v-model="scope.row.trainType.value" v-focus @blur="changeStatus(scope,'listBody','blur')"></el-input>-->
                            <!--<div v-else class="table-item-div" @click="changeStatus(scope,'listBody','focus')">{{scope.row.trainType.value}}</div>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column prop="trainContent" label="训练内容" align="center" header-align="center">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-input v-if="scope.row.trainContent.editFlag" v-model="scope.row.trainContent.value" v-focus @blur="changeStatus(scope,'listBody','blur')"></el-input>-->
                            <!--<div v-else class="table-item-div" @click="changeStatus(scope,'listBody','focus')">{{scope.row.trainContent.value}}</div>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column prop="trainDetail" label="内容细节" align="center" header-align="center">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-input v-if="scope.row.trainDetail.editFlag" v-model="scope.row.trainDetail.value" v-focus @blur="changeStatus(scope,'listBody','blur')"></el-input>-->
                            <!--<div v-else class="table-item-div" @click="changeStatus(scope,'listBody','focus')">{{scope.row.trainDetail.value}}</div>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column prop="repeatTimes" label="每组重复次数" align="center" header-align="center">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-input v-if="scope.row.repeatTimes.editFlag" v-model="scope.row.repeatTimes.value" v-focus @blur="changeStatus(scope,'listBody','blur')"></el-input>-->
                            <!--<div v-else class="table-item-div" @click="changeStatus(scope,'listBody','focus')">{{scope.row.repeatTimes.value}}</div>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column prop="actionTimes" label="动作组数" width="80" align="center" header-align="center">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-input v-if="scope.row.actionTimes.editFlag" v-model="scope.row.actionTimes.value" v-focus @blur="changeStatus(scope,'listBody','blur')"></el-input>-->
                            <!--<div v-else class="table-item-div" @click="changeStatus(scope,'listBody','focus')">{{scope.row.actionTimes.value}}</div>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column prop="restInterval" label="组间休息间隔s" width="80" align="center" header-align="center">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-input v-if="scope.row.restInterval.editFlag" v-model="scope.row.restInterval.value" v-focus @blur="changeStatus(scope,'listBody','blur')"></el-input>-->
                            <!--<div v-else class="table-item-div" @click="changeStatus(scope,'listBody','focus')">{{scope.row.restInterval.value}}</div>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column prop="rhythm" label="节奏" align="center" header-align="center">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-input v-if="scope.row.rhythm.editFlag" v-model="scope.row.rhythm.value" v-focus @blur="changeStatus(scope,'listBody','blur')"></el-input>-->
                            <!--<div v-else class="table-item-div" @click="changeStatus(scope,'listBody','focus')">{{scope.row.rhythm.value}}</div>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column fixed label="操作" width="80" align="center" header-align="center">-->
                        <!--<template slot-scope="scope">-->
                            <!--<span @click="handleDel(scope.$index, scope.row, 'listSpecial')" class="row-act-btns">删除</span>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                <!--</el-table>-->
                <!--<div style="text-align:center;margin-top:15px;"><span @click="addRow('listBody')" class="addBtn">添加</span></div>-->
            <!--</el-row>-->

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit('addForm')">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    import {getWeek} from '@/utils/index'
    import trainContentAdd from './trainContentAdd'
    export default {
        mixins: [mixins],
        components: {trainContentAdd},
        data() {
            return {
                trainDate: null,       // 日期选择(初始化增加时候使用)
                weekDay: null,         // 周几(初始化增加时候使用)



                rowIdx: null,          // 编辑行时候，当前点击的行索引
                isEditDialog: false,   // 判断当前当前打开dialog是否是编辑
                currentWeekDay: null,  // 当前点击的行的日期
                dialogVisible: false,   // 是否显示行数据编辑dialog对话框

                // dateArrList: [{weekDay:"0205（周二）"},{weekDay:"0206（周三）"},{weekDay:"0207（周四）"},{weekDay:"0208（周五）"}],       // 周区间
                dateArrList: [],       // 周区间

                listSpecial: [],       // 专项训练列表(初始化增加时候使用)
                listBody: [],          // 体能训练列表(初始化增加时候使用)
                listSpecialData: [],   // 专项训练列表(真实存储数据的)
                listBodyData: [],      // 体能训练列表(真实存储数据的)




                //
                // id: this.$route.query.id,
                // status: this.$route.query.status,
                //
                // addForm: {
                //     trainContent: null,
                //     trainType: null,
                //     trainTypeName: null,
                //     shortBoard: null,
                // },
                // rules: {
                //     trainType: [
                //         { required: true, message: '请选择训练类型', trigger: 'change' }
                //     ],
                //     trainContent: [
                //         { required: true, message: '请输入训练内容', trigger: 'blur' }
                //     ]
                //
                // }
            }
        },
        created() {
            this.getAllList();
        },

        methods: {
            // 增加一条表格行(专项/体能)
            addRow(typeName) {
                this.$refs.trainContentAdd.addRow(typeName);
            },

            // 点击每一天的新增/编辑
            editRow(item, idx) {
                this.dialogVisible = true;
                if(idx) {
                    this.rowIdx = idx;
                    this.dateArrList[idx].trainList.forEach(item => {
                        if(item.typeCode === 1) {
                            this.listSpecial.push(item);
                        } else {
                            this.listBody.push(item);
                        }
                    });
                }
            },

            // 保存
            onSubmit(formName) {
                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
                        this.dialogVisible = false;
                        this.listSpecialData = this.listSpecial.concat();
                        this.listBodyData = this.listBody.concat();
                        if(this.isEditDialog) { // 编辑
                            this.dateArrList[this.rowIdx].weekDay = this.trainDate;
                            this.dateArrList[this.rowIdx].trainList = this.listSpecialData.concat(this.listBodyData);
                        } else {    // 新增
                            this.dateArrList.push({
                                weekDay: this.trainDate,
                                trainList: this.listSpecialData.concat(this.listBodyData)
                            })
                        }

                //     }
                // })
            },


            //============= 通用方法 ===================//

            // 获取所选时间的区间数组
            getDateComplete(year, dateRange) {
                year = year.slice(0, 5);
                let startDate = new Date(year + dateRange[0]);
                let endDate = new Date(year + dateRange[1]);
                let dataArr = [];
                let weeks = ['日', '一', '二', '三', '四', '五', '六'];
                while((endDate.getTime() - startDate.getTime()) >= 0) {
                    var month = (startDate.getMonth() + 1).toString().length == 1 ? "0" + (startDate.getMonth() + 1).toString() : (startDate.getMonth() + 1);
                    var day = startDate.getDate().toString().length == 1 ? "0" + startDate.getDate() : startDate.getDate();
                    var week = weeks[startDate.getDay()];
                    dataArr.push({weekDay: month + day + '（周' + week + '）'});
                    startDate.setDate(startDate.getDate() + 1);
                }
            },
            // // 获取两个时间之间的时间差（分钟）
            // getMinutes: function(timeRange, idx, listName) {
            //     let start = changeStrToMinutes(timeRange[0]);
            //     let end = changeStrToMinutes(timeRange[1]);
            //     this[listName][idx].trainDuration.value = end - start; // 设置时长字段
            //     return end - start;
            // },
            // 聚焦/失焦
            changeStatus(scope, tableName, eventType, refName) {
                let columnName = scope.column.property;
                if(eventType === 'blur') {
                    this[tableName][scope.$index][columnName].editFlag = false;
                } else if(eventType === 'focus') {
                    this[tableName][scope.$index][columnName].editFlag = true;
                    this.$nextTick(() => { // v-if需要渲染时间
                        this.$refs[refName] && this.$refs[refName].focus();
                    })
                }
            },
            // 删除一条表格行
            handleDel: function(index, row, tableName) {
                this[tableName].splice(index, 1)
            },
        },

        watch: {
            dialogVisible: function(val) {
                if(!val) { // dialog关闭的时候重置列表
                    this.isEditDialog = false;
                    this.trainDate = null;
                    this.weekDay = null;
                    this.listSpecial = [];
                    this.listBody = [];
                }
            },
            trainDate: function(val) {
                if(val) {
                    this.weekDay = getWeek(val);
                }
            }
        }
    }
</script>

<style lang="scss">
    .week-plan-train-wrapper {
        .add-btn {
            margin: 15px auto;
            color: #409EFF;
            text-align: center;
            span {
                cursor: pointer;
            }
        }
        .week-item {
            font-size: 13px;
            text-align: center;
            border-bottom: 1px solid #EBEEF5;
            padding: 15px 0;
            .week-title {
                font-weight: 700;
            }
            .week-btn {
                color: #409EFF;
                cursor: pointer;
            }
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
        .table-item-div {
            width:100%;
            height:36px;
            line-height: 36px;
        }
        .train-section {
            .edit-table-title {
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 10px;
                padding-left: 10px;
                border-left: 3px solid #409EFF;
            }
            &:first-child {
                margin-bottom: 15px;
            }
        }
        .el-table__empty-block {
            display: none;
        }
        .el-date-editor--timerange.el-input__inner {
            width: 190px;
        }
    }
</style>
