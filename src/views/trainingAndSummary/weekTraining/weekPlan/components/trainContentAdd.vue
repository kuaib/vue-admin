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
                                    :picker-options="pickerOptions"
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
                <!--<el-row :gutter="20">-->
                    <!--<el-col :span="12">-->
                        <!--<el-form-item label="训练类型" prop="trainType">-->
                            <!--<el-select v-model="addForm.trainType" placeholder="请选择训练类型">-->
                                <!--<el-option-->
                                        <!--v-for="item in trainType"-->
                                        <!--:label="item.dicValue"-->
                                        <!--:value="item.dicKey"-->
                                        <!--:key="item.dicKey">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col :span="12">-->
                        <!--<el-form-item label="训练内容" prop="trainContent">-->
                            <!--<el-select v-model="addForm.trainContent" placeholder="请选择训练内容">-->
                                <!--<el-option-->
                                        <!--v-for="item in trainContent"-->
                                        <!--:label="item.dicValue"-->
                                        <!--:value="item.dicKey"-->
                                        <!--:key="item.dicKey">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                <!--</el-row>-->
                <!--<el-row :gutter="20">-->
                    <!--<el-col :span="12">-->
                        <!--<el-form-item label="内容细节" prop="trainDetail">-->
                            <!--<el-select v-model="addForm.trainDetail" placeholder="请选择内容细节">-->
                                <!--<el-option-->
                                        <!--v-for="item in trainDetail"-->
                                        <!--:label="item.dicValue"-->
                                        <!--:value="item.dicKey"-->
                                        <!--:key="item.dicKey">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col :span="12">-->
                        <!--<el-form-item label="重复次数" prop="repeatTimes">-->
                            <!--<el-input v-model="addForm.repeatTimes" placeholder="请输入重复次数"></el-input>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                <!--</el-row>-->
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
                            <el-select v-model="addForm.trainType" placeholder="请选择训练类型">
                                <el-option
                                        v-for="item in trainType"
                                        :label="item.dicValue"
                                        :value="item.dicKey"
                                        :key="item.dicKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="训练内容" prop="trainContent">
                            <el-select v-model="addForm.trainContent" placeholder="请选择训练内容">
                                <el-option
                                        v-for="item in trainContent"
                                        :label="item.dicValue"
                                        :value="item.dicKey"
                                        :key="item.dicKey">
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
    export default {
        data() {
            return {
                titleType: '',  // 体能/专项
                dialogVisible: false,
                addForm: {
                    trainTime: null,     // 训练时段
                    trainDuration: null, // 训练时长
                    trainType: null,     // 训练类型
                    trainContent: null,  // 训练内容
                    trainDetail: null,   // 内容细节
                    repeatTimes: null,   // 重复次数
                    actionTimes: null,   // 动作组数
                    restInterval: null,  // 组间休息间隔
                    rhythm: null,  // 组间休息间隔
                },
                rules1: {
                    trainTime: [
                        {required: true, message: '请选择训练时段', trigger: 'blur'}
                    ],
                    trainDuration: [{required: true}],
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
                    trainDuration: [{required: true}],
                    trainType: [
                        {required: true, message: '请选择训练类型', trigger: 'blur'}
                    ]
                },
                // pickerOptions: {
                //     disabledDate: (time) => {
                //         // let aa = parseInt('09:00'.split(':')[0]) * 1000 * 60 * 60 * 24
                //         // let bb = parseInt('09:00'.split(':')[1]) * 1000 * 60 * 60;
                //         // let start = aa + bb;
                //         //
                //         // let cc = parseInt('10:00'.split(':')[0]) * 1000 * 60 * 60 * 24
                //         // let dd = parseInt('10:00'.split(':')[1]) * 1000 * 60 * 60;
                //         // let end = cc + dd;
                //         //
                //         // return time >= start && time.getTime() <= end;
                //         // return (this.defaultVal && new Date(this.defaultVal).getMonth() !== time.getMonth())
                //         // return time.getMonth()
                //
                //         if(new Date(time).getTime()>new Date().getTime()){
                //             return time.getTime() >= (new Date(this.SameDayPlus()).getTime()) ;
                //         }else{
                //             return time.getTime() < Date.now() - 2*8.64e7;//两天之内 根据自己需求来定
                //         }
                //     }
                // }
                pickerOptions: {
                    selectableRange: '09:30 - 12:00'
                },
            }
        },
        created() {
            // let a = new Date('09:00').getTime()
            // let b = new Date('10:00').getTime()
            // console.log(a)
            // console.log(b)

            let aa = parseInt('09:00'.split(':')[0]) * 1000 * 60 * 60 * 24
            let bb = parseInt('09:00'.split(':')[1]) * 1000 * 60 * 60
        },
        methods: {
            // 添加数据行
            addRow(typeName) {
                this.titleType = typeName;
                this.dialogVisible = true;
            },

            // 保存
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

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

            }
        },

        watch: {
            dialogVisible: function(val) {
                if(!val) {
                    this.$refs.addForm.resetFields();
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