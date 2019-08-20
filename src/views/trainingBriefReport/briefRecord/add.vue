<template>
    <div class="train-brief-plan-add-wrapper">
        <!--基础信息-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">基础信息</span>
            </div>
            <el-form :model="baseForm" ref="baseForm" :rules="rules" label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="项目：" prop="project">
                            <el-select v-model="baseForm.project" filterable placeholder="请选择项目">
                                <el-option
                                        v-for="(item,idx) in bigProList"
                                        :key="idx"
                                        :label="item.dicValue"
                                        :value="item.dicKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="队伍：" prop="team">
                            <el-select v-model="baseForm.team" filterable placeholder="请选择队伍">
                                <el-option
                                        v-for="(item,idx) in teamInfoList"
                                        :key="idx"
                                        :label="item.dicValue"
                                        :value="item.dicKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="主教练：" prop="coach">
                            <el-select v-model="baseForm.coach" filterable placeholder="请选择主教练">
                                <el-option
                                        v-for="(item,idx) in coachInfoList"
                                        :key="idx"
                                        :label="item.dicValue"
                                        :value="item.dicKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="联系人：" prop="contacts">
                            <el-select v-model="baseForm.contacts" filterable placeholder="请选择联系人">
                                <el-option
                                        v-for="(item,idx) in contactsInfoList"
                                        :key="idx"
                                        :label="item.dicValue"
                                        :value="item.dicKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系人电话：" prop="contactsPhone">
                            <el-input v-model="baseForm.contactsPhone" placeholder="请输入联系人电话"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="辅助人员：" prop="assist">
                            <el-select v-model="baseForm.assist" filterable placeholder="请选择辅助人员">
                                <el-option
                                        v-for="(item,idx) in assistInfoList"
                                        :key="idx"
                                        :label="item.dicValue"
                                        :value="item.dicKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="运动员：" prop="athlete">
                            <el-select v-model="baseForm.athlete" multiple placeholder="请选择运动员">
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
        </el-card>

        <!--集训详情-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">集训详情</span>
            </div>
            <el-form :model="baseForm" ref="baseForm" :rules="rules" label-width="150px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="地点：" prop="address">
                            <el-input v-model="baseForm.address" placeholder="请输入地点"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="时间：" prop="trainYear">
                            <el-date-picker
                                    v-model="baseForm.trainYear"
                                    type="month"
                                    value-format="yyyy-MM"
                                    placeholder="请选择时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="人数：" prop="personNum">
                            <el-input v-model="baseForm.personNum" placeholder="请输入地点"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col >
                        <el-form-item label="集训内容及训练目的：" prop="contentPurpose">
                            <el-input type="textarea" v-model="baseForm.contentPurpose" placeholder="请输入集训内容及训练目的"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col>
                        <el-form-item label="需要解决的问题：" prop="problem">
                            <el-input type="textarea" v-model="baseForm.problem" placeholder="请输入需要解决的问题"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>

        <!--其他内容-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">其他内容</span>
            </div>
            
        </el-card>
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    export default {
        mixins: [mixins],
        data() {
            return {
                userInfo: JSON.parse(localStorage.getItem('trainingBriefReport')),
                baseForm: {
                    project: null,
                    projectName: null,
                    team: null,
                    coach: null,
                    contacts: null,
                    contactsPhone: null, // 联系人
                    assist: null,    // 辅助人员
                    athlete: [],     // 运动员
                    trainYear: null,
                    address: null,
                    personNum: null,
                },
                rules: {
                    project: [
                        { required: true, message: '请选择项目', trigger: 'change' }
                    ],
                    team: [
                        { required: true, message: '请选择队伍', trigger: 'change' }
                    ],
                    coach: [
                        { required: true, message: '请选择主教练', trigger: 'change' }
                    ],
                }
            }
        },

        created() {
            this.getAllList(() => {  // 基础下拉
                this.baseForm.project = this.userInfo.projectId;
                this.baseForm.projectName = this.userInfo.projectName;
                this.baseForm.team = this.userInfo.teamId;
                this.baseForm.teamName = this.userInfo.teamName;
                this.baseForm.coach = this.userInfo.staffId.toString();
                this.baseForm.coachName = this.userInfo.staffName;
            });
        },

        methods: {
            // 根据队伍id获取运动员列表
            getAthleteListByTeam() {
                this.getAthleteList((res) => { // 运动员列表
                    this.baseForm.personNum = res.length ? res.length : 0;
                    if(res.length && res.length > 0) {
                        res.forEach(item => {
                            this.baseForm.athlete.push(item.dicKey)
                        })
                    }
                }, {teamId: this.baseForm.team});
            }
        },

        watch: {
            // 根据队伍获取运动员
            'baseForm.team': function(val) {
                if(val) {
                    this.getAthleteListByTeam();
                }
            }
        }
    }
</script>