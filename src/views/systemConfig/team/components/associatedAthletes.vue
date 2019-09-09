<!--关联运动员-->
<template>
    <div class="associated-athletes-wrapper">

        <template>
            <div class="tab-title">关联运动员</div>
            <person-list :list="personList" types="1" @removeRelation="removeRelation" @toDetail="toDetail"></person-list>
            <el-row class="table-add-btn">
                <span @click="createItem(1)">新增>></span>
            </el-row>
        </template>
        <template>
            <div class="tab-title">关联教练</div>
            <person-list :list="coachList" types="2" @removeRelation="removeRelation" @toDetail="toDetail"></person-list>
            <el-row class="table-add-btn">
                <span @click="createItem(2)">新增>></span>
            </el-row>
        </template>
        <template>
            <div class="tab-title">关联保障团队</div>
            <person-list :list="guaranteeList" types="3" @removeRelation="removeRelation" @toDetail="toDetail"></person-list>
            <el-row class="table-add-btn">
                <span @click="createItem(3)">新增>></span>
            </el-row>
        </template>



        <!--新增人员-->
        <el-dialog :title="'新增'+dialogTitle" :visible.sync="outerVisible" :show-close="false" center>
            <el-dialog
                    :show-close="false"
                    width="30%"
                    title="该运动员已经存在，是否关联"
                    :visible.sync="innerVisible"
                    append-to-body center>
                <div slot="footer" class="dialog-footer">
                    <el-button v-waves @click="innerVisible=false;btnLoading=false">取 消</el-button>
                    <el-button v-waves type="primary" @click="toRelation" :loading="relationLoading">关 联</el-button>
                </div>
            </el-dialog>
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="姓名：" prop="name">
                            <el-input placeholder="请输入运动员名称" v-model="addForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职位：" prop="position">
                            <el-select v-model="addForm.position" placeholder="请选择职位" @change="getLevel">
                                <el-option v-for="(item,idx) in jobInfoList"
                                           :label="item"
                                           :value="item"
                                           :key="idx">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="职位级别：" prop="positionLevel">
                            <el-select v-model="addForm.positionLevel" placeholder="请选择职位级别">
                                <el-option
                                        v-for="(item, idx) in levelList"
                                        :key="idx"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="出生日期：" prop="birthday">
                            <el-date-picker
                                    v-model="addForm.birthday"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="请选择出生日期" style="width:100%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button v-waves @click="outerVisible=false">取 消</el-button>
                <el-button v-waves type="primary" :loading="btnLoading" @click="toSubmit('addForm')">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    import {findStaff, cancelPerson} from '@/api/systemConfig'
    import {getStaffDetail} from '@/api/accountAndPermission'
    import personList from './personList'
    export default {
        components: {personList},
        mixins: [mixins],
        data() {
            return {
                dialogTitle: '',      // dailog的头部信息
                outerVisible: false,  // 新增的dialog
                innerVisible: false,  // 确认关联的dialog
                btnLoading: false,    // 保存按钮loading
                relationLoading: false,   // 确认关联按钮的loading
                addForm: {
                    name: null,
                    position: null,
                    positionLevel: null,
                    birthday: null
                },
                rules: {
                    name: [
                        { required: true, message: '请输入运动员名称', trigger: 'blur' }
                    ],
                    position: [
                        { required: true, message: '请选择职位', trigger: 'change' }
                    ],
                    positionLevel: [
                        { required: true, message: '请选择职位级别', trigger: 'change' }
                    ],
                    birthday: [
                        { required: true, message: '请选择出生日期', trigger: 'change' }
                    ],
                },
                confirmRelationParams: {}
            }
        },
        props: {
            personList: { // 关联的运动员列表
                type: Array,
                default: () => {
                    return [];
                }
            },
            coachList: { // 关联的教练列表
                type: Array,
                default: () => {
                    return [];
                }
            },
            guaranteeList: { // 关联的保障队列表
                type: Array,
                default: () => {
                    return [];
                }
            },
            id: {  // 队伍id
                type: String
            }
        },
        created() {
            this.getAllList();
        },
        methods: {
            // 点击增加人员
            createItem(types) {
                this.dialogTitle = this.getTypeName(types);
                this.$emit('validateTeam');  // 校验队伍信息是否填写
            },

            // 点击人员详情
            toDetail(row, types) {
                this.$router.push({path: '/personManage/edit', query: {id: row.staffId}})
            },

            // 点击解除关联
            removeRelation(row, type) {
                this.$confirm('确定解除关联吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    cancelPerson({
                        teamId: this.id,
                        staffId: row.staffId
                    }).then(res => {
                        if(res.data.code == 200) {
                            this.$emit('getDetail')
                        } else {
                            this.$message({
                                message: res.data.msg,
                                type: 'warning'
                            });
                        }
                    })
                }).catch(() => {});
            },

            // 校验人员是否已存在
            toSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let type = this.dialogTitle === '运动员' ? 1 : (this.dialogTitle === '教练' ? 2 : 3);
                        this.btnLoading = true;
                        let params = {
                            staffName: this.addForm.name,
                            jobName: this.addForm.position,
                            jobLevel: this.addForm.positionLevel,
                            birthday: this.addForm.birthday,
                            type: type
                        };
                        findStaff(params).then(res => {
                            if(res.data.code == 200) {
                                if(res.data.data.staffId) {
                                    params.staffId = res.data.data.staffId;
                                    this.innerVisible = true;
                                    this.confirmRelationParams = params;
                                } else {
                                    this.$emit('toSubmit', params);
                                }
                            } else {
                                this.btnLoading = false;
                                this.$message({
                                    message: res.data.msg,
                                    type: 'warning'
                                });
                            }
                        }).catch(() => {
                            this.btnLoading = false;
                        })
                    } else {
                        return false;
                    }
                });
            },

            // 确认关联
            toRelation() {
                this.relationLoading = true;
                this.$emit('toSubmit', this.confirmRelationParams);
            },

            // type对应的类型
            getTypeName(types) {
                if(types == 1) {
                    return '运动员';
                } else if(types == 2) {
                    return '教练';
                } else if(types == 3) {
                    return '保障团队';
                }
            },

            // 清空表单
            restMyForm() {
                this.addForm.name = null;
                this.addForm.position = null;
                this.addForm.positionLevel = null;
                this.addForm.birthday = null;
            }
        }
    }
</script>

<style lang="scss">
    .associated-athletes-wrapper {
        .table-add-btn {
            text-align: center;
            margin: 15px auto;
            color: #409EFF;
            span {
                cursor: pointer;
            }
        }
    }
</style>
