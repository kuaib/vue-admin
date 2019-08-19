<!--专项训练 / 体能训练新增编辑弹窗-->
<template>
    <!--新增类表中的项-->
    <el-dialog
                class="train-content-add-wrapper"
                :show-close="false"
                :title="'新增'+titleType+'训练'"
                :visible.sync="dialogVisible"
                width="60%"
                :close-on-click-modal="false"
                append-to-body
                center>
            <!--专项-->
            <el-form :model="addForm" :rules="rules1" ref="addForm" label-width="120px" v-if="titleType==='专项'">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="训练时段" prop="trainTime">
                            <el-time-picker
                                    :clearable="false"
                                    @change="changeTimeDuration"
                                    is-range
                                    v-model="addForm.trainTime"
                                    format="HH:mm"
                                    value-format="HH:mm"
                                    range-separator="~"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间">
                            </el-time-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="训练时长" prop="trainDuration">
                            <span v-if="addForm.trainTime">{{addForm.trainDuration}} 分钟</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="训练类型" prop="trainType">
                            <el-select v-model="addForm.trainType" placeholder="请选择训练类型" @change="getCommonList('2')">
                                <el-option
                                        v-for="item in trainTypeList"
                                        :label="item.trainContent"
                                        :value="item.id"
                                        :key="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="训练内容" prop="trainContent">
                            <el-select v-model="addForm.trainContent" placeholder="请选择训练内容" @change="getCommonList('3')">
                                <el-option
                                        v-for="item in trainContentList"
                                        :label="item.trainContent"
                                        :value="item.id"
                                        :key="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="内容细节" prop="trainDetail">
                            <el-select v-model="addForm.trainDetail" placeholder="请选择内容细节">
                                <el-option
                                        v-for="item in trainDetailList"
                                        :label="item.trainContent"
                                        :value="item.id"
                                        :key="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="重复次数" prop="repeatTimes">
                            <el-input v-model="addForm.repeatTimes" placeholder="请输入重复次数"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <!--体能-->
            <el-form :model="addForm" :rules="rules2" ref="addForm" label-width="120px" v-if="titleType==='体能'">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="训练时段" prop="trainTime">
                            <el-time-picker
                                    :clearable="false"
                                    is-range
                                    @change="changeTimeDuration"
                                    v-model="addForm.trainTime"
                                    format="HH:mm"
                                    value-format="HH:mm"
                                    range-separator="~"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间">
                            </el-time-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="训练时长" prop="trainDuration">
                            <span>{{addForm.trainDuration}} 分钟</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="训练类型" prop="trainType">
                            <el-select v-model="addForm.trainType" placeholder="请选择训练类型" @change="getCommonList('2')">
                                <el-option
                                        v-for="item in trainTypeList"
                                        :label="item.trainContent"
                                        :value="item.id"
                                        :key="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="训练内容" prop="trainContent">
                            <el-select v-model="addForm.trainContent" placeholder="请选择训练内容">
                                <el-option
                                        v-for="item in trainContentList"
                                        :label="item.trainContent"
                                        :value="item.id"
                                        :key="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="每组重复次数" prop="repeatTimes">
                            <el-input v-model="addForm.repeatTimes" placeholder="请输入每组重复次数"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="动作组数" prop="actionTimes">
                            <el-input v-model="addForm.actionTimes" placeholder="请输入动作组数"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="组间休息间隔s" prop="restInterval">
                            <el-input v-model="addForm.restInterval" placeholder="请输入组间休息间隔"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="节奏" prop="rhythm">
                            <el-input v-model="addForm.rhythm" placeholder="请输入节奏"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit('addForm')">保 存</el-button>
            </span>
        </el-dialog>
</template>

<script>
    import {changeStrToMinutes} from '@/utils/index'
    import mixins from '@/utils/mixins'
    export default {
        mixins: [mixins],
        data() {
            return {
                titleType: null,  // 体能/专项
                rowIdx: null,     // 编辑时候行索引
                dialogVisible: false,

                trainTypeList: [],     // 训练类型列表
                trainContentList: [],  // 训练内容列表
                trainDetailList: [],   // 训练细节列表

                addForm: {
                    typeCode: null,      // 专项 / 体能 的标志
                    trainTime: null,     // 训练时段
                    trainDuration: null, // 训练时长
                    trainType: null,     // 训练类型
                    trainTypeName: null,     // 训练类型(名称)
                    trainContent: null,  // 训练内容
                    trainContentName: null,  // 训练内容(名称)
                    trainDetail: null,   // 内容细节
                    trainDetailName: null,   // 内容细节(名称)
                    repeatTimes: null,   // 重复次数
                    actionTimes: null,   // 动作组数
                    restInterval: null,  // 组间休息间隔
                    rhythm: null,  // 组间休息间隔
                },
                rules1: {
                    trainTime: [
                        {required: true, message: '请选择训练时段', trigger: 'blur'}
                    ],
                    trainType: [
                        {required: true, message: '请选择训练类型', trigger: 'blur'}
                    ],
                    trainContent: [
                        {required: true, message: '请选择训练内容', trigger: 'blur'}
                    ],
                },
                rules2: {
                    trainTime: [
                        {required: true, message: '请选择训练时段', trigger: 'blur'}
                    ],
                    trainType: [
                        {required: true, message: '请选择训练类型', trigger: 'blur'}
                    ]
                }
            }
        },

        methods: {
            // 添加数据行
            addRow(typeName, item, idx) {
                if(item !== undefined && typeof idx === 'number') {
                    this.addForm = item;
                    this.rowIdx = idx;
                }
                this.titleType = typeName;
                this.dialogVisible = true;
            },

            // 保存
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let obj = JSON.parse(JSON.stringify(this.addForm));
                        this.$emit('showItem', obj, this.titleType, this.rowIdx);
                        this.dialogVisible = false;
                    }
                })
            },

            // 更改训练时段(获取时长分钟数)
            changeTimeDuration(val) {
                if(val) {
                    let start = changeStrToMinutes(val[0]);
                    let end = changeStrToMinutes(val[1]);
                    this.addForm.trainDuration = end - start;
                } else {
                    this.addForm.trainDuration = null;
                }

            },

            // 获取训练类型、训练内容、训练细节下拉
            getCommonList(level) {
                let params = {
                    level: level,
                    trainType: this.addForm.typeCode.toString()
                };
                if(level === '1') {         // 训练类型
                    params.queryId = '0';
                    this.getTrainSelectAll(params, (res) => {
                        if(this.trainTypeList.length === 0 && this.addForm.trainType) {

                        } else {
                            this.trainContentList = [];
                            this.trainDetailList = [];
                            this.addForm.trainContent = null;
                            this.addForm.trainDetail = null;
                        }
                        this.trainTypeList = res;
                    });
                } else if(level === '2') {  // 训练内容
                    params.queryId = this.addForm.trainType;
                    this.getTrainSelectAll(params, (res) => {
                        if(this.trainContentList.length === 0 && this.addForm.trainContent) {

                        } else {
                            this.trainDetailList = [];
                            this.addForm.trainContent = null;
                            this.addForm.trainDetail = null;
                        }
                        this.trainContentList = res;
                    });
                } else if(level === '3') {  // 训练细节
                    params.queryId = this.addForm.trainContent;
                    this.getTrainSelectAll(params, (res) => {
                        if(this.trainDetailList.length === 0 && this.addForm.trainDetail) {

                        } else {
                            this.addForm.trainDetail = null;
                        }
                        this.trainDetailList = res;
                    });
                }
            }
        },

        watch: {
            dialogVisible: function(val) {
                if(!val) {
                    this.addForm.trainTime = null;     // 训练时段
                    this.addForm.trainDuration = null; // 训练时长
                    this.addForm.trainType = null;    // 训练类型
                    this.addForm.trainTypeName = null;    // 训练类型(名称)
                    this.addForm.trainContent = null; // 训练内容
                    this.addForm.trainContentName = null;  // 训练内容(名称)
                    this.addForm.trainDetail = null;   // 内容细节
                    this.addForm.trainDetailName = null;   // 内容细节(名称)
                    this.addForm.repeatTimes = null;  // 重复次数
                    this.addForm.actionTimes = null;  // 动作组数
                    this.addForm.restInterval = null;  // 组间休息间隔
                    this.addForm.rhythm = null;  // 组间休息间隔

                    this.titleType = null;
                    this.rowIdx = null;
                    this.trainTypeList = [];
                    this.trainContentList = [];
                    this.trainDetailList = [];
                }
            },
            titleType: function(val) { // 检测增加窗口标题显示完整再请求下拉列表
                if(val) {
                    this.addForm.typeCode = val === '专项' ? 1 : 2;
                    this.getCommonList('1');
                }
            },
            'addForm.trainType': function(val) {
                if(val) {
                    this.trainTypeList.forEach(item => {
                        if(item.id == val) {
                            this.addForm.trainTypeName = item.trainContent;
                        }
                    })
                }
            },
            'addForm.trainContent': function(val) {
                if(val) {
                    if(this.trainContentList.length === 0) { // 处于编辑状态时渲染需要
                        this.getCommonList('2');
                    } else {
                        this.trainContentList.forEach(item => {
                            if(item.id == val) {
                                this.addForm.trainContentName = item.trainContent;
                            }
                        })
                    }
                }
            },
            'addForm.trainDetail': function(val) {
                if(val) {
                    if(this.trainDetailList.length === 0) {
                        this.getCommonList('3');
                    } else {
                        this.trainDetailList.forEach(item => {
                            if(item.id == val) {
                                this.addForm.trainDetailName = item.trainContent;
                            }
                        })
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    .train-content-add-wrapper {
        .el-range-editor--medium.el-input__inner {
            width: 100%;
        }
        .el-date-editor .el-range-separator {
            width: 8%;
        }
    }
</style>
