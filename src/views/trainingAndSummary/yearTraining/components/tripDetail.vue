<!--创建年计划---行程详情-->
<template>
    <div class="trip-detail-wrapper">
        <el-table :data="list" v-loading="listLoading" border fit highlight-current-row empty-text="暂无训练行程"
                  style="width: 100%;">
            <el-table-column
                    width="60px"
                    align="center" label="行程序号"
                    type="index"
                    :index="indexMethod">
            </el-table-column>
            <el-table-column align="center" label="训练类型">
                <template slot-scope="scope">
                    <span>{{scope.row.trainType=='1'?'国内训练':'国外训练'}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="开始时间">
                <template slot-scope="scope">
                    <span>{{scope.row.startDate}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="结束时间">
                <template slot-scope="scope">
                    <span>{{scope.row.endDate}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="国家">
                <template slot-scope="scope">
                    <span>{{scope.row.country}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="训练城市">
                <template slot-scope="scope">
                    <span>{{scope.row.city}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="主要执行教练">
                <template slot-scope="scope">
                    <span>{{scope.row.coachName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="训练目标" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span>{{scope.row.trainTarget}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="训练内容" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span>{{scope.row.trainContent}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" v-if="id&&status=='0' || !id&&!status">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="validateBaseForm(scope.$index)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="add-btn" v-if="status!='1'"><span @click="validateBaseForm">增加行程>></span></div>

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
                        <el-form-item label="训练类型" prop="trainType">
                            <el-select v-model="addForm.trainType" placeholder="请选择训练类型">
                                <el-option label="国内训练" value="1"></el-option>
                                <el-option label="国外训练" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="主要执行教练" prop="coach">
                            <el-select v-model="addForm.coach" placeholder="请选择主要执行教练">
                                <el-option v-for="(item,idx) in coachInfoList"
                                           :label="item.dicValue"
                                           :value="item.dicKey"
                                           :key="idx">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="开始时间" prop="startDate">
                            <el-date-picker
                                    style="width:100%"
                                    v-model="addForm.startDate"
                                    type="month"
                                    value-format="yyyy-MM"
                                    placeholder="开始时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="结束时间" prop="endDate">
                            <el-date-picker
                                    style="width:100%"
                                    v-model="addForm.endDate"
                                    type="month"
                                    value-format="yyyy-MM"
                                    placeholder="结束时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="训练国家" prop="country">
                            <!--<el-select v-model="addForm.country" placeholder="请选择训练国家">-->
                                <!--<el-option v-for="(item,idx) in countryList"-->
                                           <!--:label="item.dicValue"-->
                                           <!--:value="item.dicKey"-->
                                           <!--:key="idx">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                            <el-input v-model="addForm.country" placeholder="请输入训练国家"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="训练城市" prop="city">
                            <!--<el-select v-model="addForm.city" placeholder="请选择训练城市">-->
                                <!--<el-option v-for="(item,idx) in provinceList"-->
                                           <!--:label="item.dicValue"-->
                                           <!--:value="item.dicKey"-->
                                           <!--:key="idx">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                            <el-input v-model="addForm.city" placeholder="请输入训练城市"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="训练目标" prop="trainTarget">
                        <el-input type="textarea" v-model="addForm.trainTarget" placeholder="请输入训练目标"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="训练内容" prop="trainContent">
                        <el-input type="textarea" v-model="addForm.trainContent" placeholder="请输入训练内容"></el-input>
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
                tripIdx: null,       // 编辑行程时候，当前点击的行索引
                isEditTrip: false,   // 判断当前当前打开dialog是否是编辑行程
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

            // 表格序号
            indexMethod(index) {
                return '行程' + (index + 1);
            },

            // 点击添加行程/编辑行程
            validateBaseForm(rowIdx) {
                if(typeof rowIdx === 'number') {
                    this.tripIdx = rowIdx;
                    this.$emit('validateBaseForm', rowIdx)
                } else {
                    this.$emit('validateBaseForm')
                }
            },

            // 编辑时渲染行程信息
            getTripDetail(rowIdx) {
                this.isEditTrip = true;
                let rowData = this.list[rowIdx];
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
            // 看后期是否需要下拉
            // 'addForm.city': function(val) {
            //     if(val) {
            //         this.cityList.forEach(item => {
            //             if(item.dicKey == val) {
            //                 this.addForm.cityName = item.dicValue;
            //             }
            //         })
            //     }
            // },
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
                    this.$refs.addForm.resetFields();
                }
            }
        }
    }
</script>

<style lang="scss">
    .trip-detail-wrapper {
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