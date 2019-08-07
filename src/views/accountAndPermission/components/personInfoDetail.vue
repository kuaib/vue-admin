<!--创建/编辑账号的时候关联人员反显的信息-->
<template>
    <div>
        <!--个人信息-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">个人信息</span>
            </div>
            <el-form :model="personForm" label-width="100px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="姓名：">{{personForm.name}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别：">{{personForm.sex}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="身份证：">{{personForm.idCard}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="出生年月：">{{personForm.birthday}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="身高(cm)：">{{personForm.height}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="体重(kg)：">{{personForm.weight}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="籍贯：">{{personForm.jg}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="手机：">{{personForm.phone}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="个人照片：">
                            <img :src="personForm.photo" style="width: 150px;">
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>

        <!--业务信息-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">个人信息</span>
            </div>
            <el-form :model="businessForm" label-width="130px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="身份：">{{businessForm.jobName}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="运动员级别：">{{businessForm.level}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="入队时间：">{{businessForm.joinDate}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="大项：">{{businessForm.bigPro}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="小项：">{{businessForm.smallPro}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="运动队：">{{businessForm.team}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="教练员：">{{personForm.coach}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="原项目：">{{businessForm.frontPro}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="原项目训练年限：">{{businessForm.trainYear}}</el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import {getStaffDetail} from '@/api/accountAndPermission'
    export default {
        data() {
            return {
                personForm: {  // 个人信息
                    name: null,
                    sex: null,
                    idCard: null,
                    birthday: null,
                    height: null,
                    weight: null,
                    jg: null,
                    phone: null,
                    photo: null
                },
                businessForm: { // 业务信息
                    jobName: null,
                    level: null,
                    joinDate: null,
                    bigPro: null,
                    smallPro: null,
                    team: null,
                    coach: null,
                    frontPro: null,
                    trainYear: null,
                },
            }
        },

        methods: {
            // 获取人员详情
            getPersonInfo(id) {
                getStaffDetail({staffId: id}).then(res => {
                    if(res.data.code == 200) {
                        let resData = res.data.data;
                        this.personForm.name = resData.staffName;
                        this.personForm.sex = resData.gender == 1 ? '男' : '女';
                        this.personForm.idCard = resData.identity;
                        this.personForm.birthday = resData.birthday;
                        this.personForm.height = resData.height;
                        this.personForm.weight = resData.weight;
                        this.personForm.jg = resData.nativePlace;
                        this.personForm.phone = resData.telphone;
                        this.personForm.photo = resData.photo;

                        this.businessForm.jobName = resData.jobName;
                        this.businessForm.level = resData.jobLevel;
                        this.businessForm.joinDate = resData.joinDate;
                        this.businessForm.bigPro = resData.projectName;
                        this.businessForm.smallPro = resData.childProject;
                        this.businessForm.team = resData.teamName;
                        this.businessForm.coach = resData.coachName;
                        this.businessForm.frontPro = resData.oldProjectName;
                        this.businessForm.trainYear = resData.oldProjectDuration;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
            },
        }
    }
</script>
