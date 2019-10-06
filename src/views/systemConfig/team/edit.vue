<!--队伍管理---编辑队伍-->
<template>
    <div class="team-manage-edit-wrapper">
        <!--队伍信息-->
        <el-form :model="addForm" :rules="rules" ref="addForm" label-width="120px">
            <div class="tab-title">队伍信息</div>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="队伍名称：" prop="name">
                        <el-input placeholder="请输入队伍名称" v-model="addForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="队伍状态：" prop="status">
                        <el-select v-model="addForm.status" placeholder="请选择队伍状态">
                            <el-option label="已激活" value="1"></el-option>
                            <el-option label="未激活" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="隶属大项：" prop="parentPro">
                        <el-select v-model="addForm.parentPro" placeholder="请选择隶属大项">
                            <el-option
                                    v-for="(item,idx) in bigProList"
                                    :label="item.dicValue"
                                    :value="item.dicKey"
                                    :key="idx">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="项目负责人：" prop="proManager">
                        <el-select v-model="addForm.proManager" placeholder="请选择项目负责人">
                            <el-option
                                    v-for="(item,idx) in leaderInfoList"
                                    :label="item.dicValue"
                                    :value="item.dicKey"
                                    :key="idx">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <!--关联运动员-->
        <associated-athletes ref="associatedAthletes"
                             @toSubmit="toSubmit"
                             @validateTeam="validateTeam"
                             @getDetail="getDetail"
                             :id="addForm.id"
                             :personList="personList"
                             :coachList="coachList"
                             :guaranteeList="guaranteeList"
        >
        </associated-athletes>

        <!--操作按钮-->
        <el-row style="text-align: center;margin-top:40px;">
            <el-button v-waves @click="cancelAct">取 消</el-button>
            <el-button v-waves type="primary" :loading="btnLoading" @click="toSubmit('save')">保 存</el-button>
        </el-row>
    </div>
</template>

<script>
    import {saveTeam, getTeamDetail} from '@/api/systemConfig'
    import mixins from '@/utils/mixins'
    import associatedAthletes from './components/associatedAthletes'
    export default {
        mixins: [mixins],
        components: {associatedAthletes},
        inject: ['reload'],
        data() {
            return {
                btnLoading: false,
                addForm: {
                    id: this.$route.query.id && this.$route.query.id.toString(),
                    name: null,
                    status: null,
                    parentPro: null,
                    proManager: null
                },
                personList: [],
                coachList: [],
                guaranteeList: [],
                rules: {
                    name: [
                        { required: true, message: '请输入队伍名称', trigger: 'blur' }
                    ],
                    status: [
                        { required: true, message: '请选择队伍状态', trigger: 'change' }
                    ],
                    parentPro: [
                        { required: true, message: '请选择隶属大项', trigger: 'change' }
                    ],
                    // proManager: [
                    //     { required: true, message: '请选择项目负责人', trigger: 'change' }
                    // ]
                }
            }
        },

        created() {
            this.getAllList(this.getDetail) // 获取基础下拉
        },

        methods: {
            // 获取队伍详情
            getDetail() {
                getTeamDetail({teamId: this.addForm.id}).then(res => {
                    if(res.data.code == 200) {
                        let sportsTeamVo = res.data.data.sportsTeamVo; // 队伍信息
                        this.personList = res.data.data.athleteList;  // 关联人员信息
                        this.coachList = res.data.data.coachList;      // 关联教练信息
                        this.guaranteeList = res.data.data.guaranteeList;  // 关联保障队信息

                        this.addForm.name = sportsTeamVo.teamName;
                        this.addForm.status = sportsTeamVo.status.toString();
                        this.addForm.parentPro = sportsTeamVo.projectId;
                        this.addForm.proManager = sportsTeamVo.leaderId;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
            },

            // 创建保存
            toSubmit(componentsForm) {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.btnLoading = true;
                        let parames = {
                            teamId: this.addForm.id,
                            teamName: this.addForm.name,
                            projectId: this.addForm.parentPro,
                            status: parseInt(this.addForm.status),
                            leaderId: this.addForm.proManager,
                        };
                        parames = Object.assign(parames, componentsForm); // 队伍信息与关联信息合并传递
                        saveTeam(parames).then(res => {
                            this.$refs.associatedAthletes.relationLoading = false;
                            this.$refs.associatedAthletes.btnLoading = false;
                            this.btnLoading = false;
                            if(res.data.code == 200) {
                                this.$refs.associatedAthletes.restMyForm();
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                                if(componentsForm !== 'save') {
                                    this.getDetail();
                                    this.$refs.associatedAthletes.outerVisible = false;
                                } else {
                                    this.cancelAct('save');
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

            // 校验队伍信息是否填写(关联项需要使用)
            validateTeam() {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$refs.associatedAthletes.outerVisible = true;
                    } else {
                        return false;
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .team-manage-edit-wrapper {
        .tab-title {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 15px;
        }

    }
</style>
