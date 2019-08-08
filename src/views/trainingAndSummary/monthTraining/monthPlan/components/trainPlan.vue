<!--月训练计划 -- 训练计划列表-->
<template>
    <div class="month-plan-train-wrapper">
        <el-table :data="list" v-loading="listLoading" border fit highlight-current-row empty-text="暂无训练计划"
                  style="width: 100%;">
            <el-table-column
                    label="序号"
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column align="center" label="训练类型">
                <template slot-scope="scope">
                    <span>{{scope.row.trainType=='1'?'国内训练':'国外训练'}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="训练内容">
                <template slot-scope="scope">
                    <span>{{scope.row.country}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="训练目的">
                <template slot-scope="scope">
                    <span>{{scope.row.city}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="短板">
                <template slot-scope="scope">
                    <span>{{scope.row.coachName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="期望目标" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span>{{scope.row.trainTarget}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" v-if="id&&status=='0' || !id&&!status">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="validateBaseForm(scope.$index)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="add-btn" v-if="status!='1'"><span @click="validateBaseForm">增加训练计划>></span></div>

        <!--创建行程dialog-->
        <el-dialog
                :show-close="false"
                title="训练行程"
                :visible.sync="dialogVisible"
                width="60%"
                center>
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="训练内容" prop="tripName">
                            <el-input v-model="addForm.trainContent" placeholder="请输入训练内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="训练类型" prop="trainType">
                            <el-select v-model="addForm.trainType" placeholder="请选择训练类型">
                                <el-option label="国内训练" value="1"></el-option>
                                <el-option label="国外训练" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="短板" prop="shortBoard">
                            <el-input v-model="addForm.shortBoard" placeholder="请输入短板"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-form-item label="训练目的" prop="trainPurpose">
                        <div>

                        </div>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="期望目标" prop="trainTarget">
                        <el-input type="textarea" v-model="addForm.trainPurpose" placeholder="请输入期望目标"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit('addForm')">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    export default {
        mixins: [mixins],
        data() {
            return {
                tripIdx: null,       // 编辑计划时候，当前点击的行索引
                isEditTrip: false,   // 判断当前当前打开dialog是否是编辑计划
                list: [],
                listLoading: false,
                dialogVisible: false,
                id: this.$route.query.id,
                status: this.$route.query.status,

                addForm: {
                    tripName: null,
                    startDate: null,
                    endDate: null,
                    trainType: null,
                    trainTypeName: null,
                    country: null,
                    city: null,
                    coach: null,
                    coachName: null,
                    trainTarget: null,
                    trainContent: null,
                },
                rules: {
                    tripName: [
                        { required: true, message: '请输入行程名称', trigger: 'blur' }
                    ],
                    startDate: [
                        { required: true, message: '请选择开始时间', trigger: 'change' }
                    ],
                    endDate: [
                        { required: true, message: '请选择结束时间', trigger: 'change' }
                    ],
                    trainType: [
                        { required: true, message: '请选择训练类型', trigger: 'change' }
                    ],
                    country: [
                        { required: true, message: '请选择国家', trigger: 'change' }
                    ],
                    city: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    coach: [
                        { required: true, message: '请选择主要执行教练', trigger: 'change' }
                    ],
                    trainTarget: [
                        { required: true, message: '请输入训练目标', trigger: 'blur' }
                    ],
                    trainContent: [
                        { required: true, message: '请输入训练内容', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            this.getAllList();
        },
        methods: {
            // 提交
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogVisible = false;
                        if(this.isEditTrip) { // 编辑行程
                            this.list.splice(this.tripIdx, 1, JSON.parse(JSON.stringify(this.addForm)))
                        } else {    // 新增行程
                            this.list.push(JSON.parse(JSON.stringify(this.addForm)));
                        }
                        this.resetForm(formName);
                    }
                })
            },

            // 点击添加计划/编辑计划
            validateBaseForm(rowIdx) {
                if(typeof rowIdx === 'number') {
                    this.tripIdx = rowIdx;
                    this.$emit('validateBaseForm', rowIdx)
                } else {
                    this.$emit('validateBaseForm')
                }
            },

            // 编辑时渲染计划信息
            getTripDetail(rowIdx) {
                this.isEditTrip = true;
                let rowData = this.list[rowIdx];
                this.addForm.tripName = rowData.tripName;
                this.addForm.startDate = rowData.startDate;
                this.addForm.endDate = rowData.endDate;
                this.addForm.trainType = rowData.trainType;
                this.addForm.trainTypeName = rowData.trainTypeName;
                this.addForm.country = rowData.country;
                this.addForm.city = rowData.city;
                this.addForm.coach = rowData.coach;
                this.addForm.coachName = rowData.coachName;
                this.addForm.trainTarget = rowData.trainTarget;
                this.addForm.trainContent = rowData.trainContent;
            }
        },

        watch: {
            'addForm.trainType': function(val) {
                if(val) {
                    this.addForm.trainTypeName = val === '1' ? '国内训练' : '国外训练';
                }
            },
            'addForm.coach': function(val) {
                if(val) {
                    this.coachInfoList.forEach(item => {
                        if(item.dicKey == val) {
                            this.addForm.coachName = item.dicValue;
                        }
                    })
                }
            },
            dialogVisible: function(val) {
                if(!val) { // dialog关闭的时候
                    this.isEditTrip = false;
                }
            }
        }
    }
</script>

<style lang="scss">
    .month-plan-train-wrapper {
        .add-btn {
            margin: 15px auto;
            color: #409EFF;
            text-align: center;
            span {
                cursor: pointer;
            }
        }
    }
</style>