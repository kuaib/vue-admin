<!--月训练计划 -- 比赛计划列表-->
<template>
    <div class="month-plan-competition-wrapper">
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
            <el-table-column align="center" label="是否总结" v-if="isSummary">
                <template slot-scope="scope">
                    <span>{{scope.row.summary==1?'已总结':'未总结'}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" v-if="id&&isSummary">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.summary==1" size="mini" type="primary" @click="toSummary(scope.row)">详情</el-button>
                    <el-button v-if="scope.row.summary==0" size="mini" type="primary" @click="toSummary(scope.row)">总结</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" v-if="(id&&status=='0' || !id&&!status)&&!isSummary">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="validateBaseForm(scope.$index)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="add-btn" v-if="status!='1'&&!isSummary"><span @click="validateBaseForm">增加比赛计划>></span></div>

        <!--创建dialog-->
        <el-dialog
                :show-close="false"
                title="比赛计划"
                :visible.sync="dialogVisible"
                width="60%"
                center>
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="比赛名称" prop="compName">
                            <el-input v-model="addForm.compName" placeholder="请输入比赛名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="比赛日期" prop="compDate">
                            <el-date-picker
                                    style="width: 100%;"
                                    v-model="addForm.compDate"
                                    type="date"
                                    placeholder="请选择比赛日期"
                                    value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="比赛国家" prop="country">
                            <el-input v-model="addForm.country" placeholder="请输入比赛国家"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="比赛城市" prop="city">
                            <el-input v-model="addForm.city" placeholder="比赛城市"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="比赛小项" prop="smallPro">
                            <el-row>
                                <el-col :span="9">
                                    <ul class="big-pro item-box">
                                        <li v-for="item in bigProList" @click="changeBigPro(item.dicKey)" :class="{'active-li':addForm.bigPro===item.dicKey}">{{item.dicValue}}</li>
                                    </ul>
                                </el-col>
                                <el-col :span="9" v-show="addForm.bigPro">
                                    <el-checkbox-group v-model="addForm.smallPro" class="small-pro item-box">
                                        <el-checkbox :label="child" v-for="(child,idx) in smallProList" :key="idx"></el-checkbox>
                                    </el-checkbox-group>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="参赛运动员" prop="athleteSelected">
                            <el-select v-model="addForm.athleteSelected" multiple placeholder="请选择参赛运动员">
                                <el-option
                                        v-for="(item,idx) in athleteList"
                                        :key="idx"
                                        :label="item.dicValue"
                                        :value="item.dicKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit('addForm')">提 交</el-button>
            </span>
        </el-dialog>

        <competition-summary ref="competitionSummary"></competition-summary>
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    import competitionSummary from './competitionSummary'
    export default {
        mixins: [mixins],
        components: {competitionSummary},
        data() {
            return {
                rowIdx: null,          // 编辑行时候，当前点击的行索引
                isEditDialog: false,   // 判断当前当前打开dialog是否是编辑
                list: [],              // 行数据列表
                dialogVisible: false,   // 是否显示行数据编辑dialog对话框
                id: this.$route.query.id,
                status: this.$route.query.status,

                addForm: {
                    compName: null,
                    compDate: null,
                    country: null,
                    city: null,
                    bigPro: null,
                    bigProName: null,
                    smallPro: [],
                    athlete: [],
                    athleteSelected: [],        // 选中的参赛运动员
                    athleteSelectedName: null,  // 选中的参赛运动员名称(,分割，列表中需要这样显示)
                },
                rules: {
                    compName: [
                        { required: true, message: '请选择比赛名称', trigger: 'blur' }
                    ],
                    compDate: [
                        { required: true, message: '请选择比赛日期', trigger: 'change' }
                    ],
                    country: [
                        { required: true, message: '请输入比赛国家', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请输入比赛城市', trigger: 'blur' }
                    ],
                    smallPro: [
                        { required: true, message: '请选择小项', trigger: 'blur' }
                    ],
                    athleteSelected: [
                        { required: true, message: '请选择参赛运动员', trigger: 'blur' }
                    ]
                }
            }
        },

        props: {
            isSummary: {  // 是否是月总结页面
                type: Boolean,
                default: false
            }
        },

        created() {
            this.getAllList();
            this.getAthleteList(); // 获取运动员列表
        },
        methods: {
            // 点击大项目 / 编辑渲染时
            changeBigPro(proId, isEdit) {
                this.getSmallProList(proId, (res) => {
                    if(!isEdit) { // 编辑时不能清空已选择的小项
                        this.addForm.smallPro = [];
                        this.addForm.bigPro = proId;
                    }
                    this.smallProList = res[0].split(',');
                });
            },
            // 提交
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogVisible = false;
                        if(this.isEditDialog) { // 编辑
                            this.list.splice(this.rowIdx, 1, JSON.parse(JSON.stringify(this.addForm)))
                        } else {    // 新增
                            this.list.push(JSON.parse(JSON.stringify(this.addForm)));
                        }
                        this.resetForm(formName);
                    }
                })
            },

            // 点击添加/编辑
            validateBaseForm(rowIdx) {
                if(typeof rowIdx === 'number') {
                    this.rowIdx = rowIdx;
                    this.dialogVisible = true;
                    this.getRowDetail(rowIdx);
                }
                this.dialogVisible = true;
            },

            // 编辑时渲染信息
            getRowDetail(rowIdx) {
                this.isEditDialog = true;
                let rowData = this.list[rowIdx];
                this.addForm.compName = rowData.compName;
                this.addForm.compDate = rowData.compDate;
                this.addForm.country = rowData.country;
                this.addForm.city = rowData.city;
                this.addForm.bigPro = rowData.bigPro;
                this.addForm.smallPro = rowData.smallPro;
                this.addForm.athleteSelected = rowData.athleteSelected;
                this.addForm.athleteSelectedName = rowData.athleteSelectedName;
            },

            // 点击总结/详情
            toSummary(item) {
                this.$refs.competitionSummary.baseForm = item;
                this.$refs.competitionSummary.dialogVisible = true;
            }
        },

        watch: {
            'addForm.bigPro': function(val) {
                if(val) {
                    this.bigProList.forEach(item => {
                        if(item.dicKey == val) {
                            this.addForm.bigProName = item.dicValue;
                        }
                    })
                    this.changeBigPro(val, 'isEdit');
                }
            },
            'addForm.athleteSelected': function(val) {
                if(val) {
                    let str = '';
                    this.athleteList.forEach(item => {
                        this.addForm.athleteSelected.forEach(sel => {
                            if(sel === item.dicKey) {
                                str += ',' + item.dicValue;
                            }
                        });
                    });
                    this.addForm.athleteSelectedName = str.substr(1);
                }
            },
            dialogVisible: function(val) {
                if(!val) { // dialog关闭的时候
                    this.isEditDialog = false;
                    this.addForm.compName = null;
                    this.addForm.compDate = null;
                    this.addForm.country = null;
                    this.addForm.city = null;
                    this.addForm.bigPro = null;
                    this.addForm.bigProName = null;
                    this.addForm.smallPro = [];
                    this.addForm.athlete = [];
                    this.addForm.athleteSelected = [];
                    this.addForm.athleteSelectedName = null;
                }
            }
        }
    }
</script>

<style lang="scss">
    .month-plan-competition-wrapper {
        .el-transfer-panel__item.el-checkbox {
            display: block;
        }
        .add-btn {
            margin: 15px auto;
            color: #409EFF;
            text-align: center;
            span {
                cursor: pointer;
            }
        }
        .item-box {
            border: 1px solid #EBEEF5;
            overflow-y: auto;
            padding: 0 10px;
            height: 200px;
            li {
                cursor: pointer;
                &:hover {
                    color: #409EFF;
                }
            }
            .active-li {
                color: #409EFF;
            }
        }
        .small-pro {
            border-left: 0;
            label {
                display: block;
            }
        }
    }
</style>
