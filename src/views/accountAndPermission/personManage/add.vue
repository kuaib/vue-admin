<!--创建人员-->
<template>
    <div class="person-permission-add-wrapper">

        <!--个人信息-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">个人信息</span>
            </div>
            <el-form :model="personForm" ref="personForm" label-width="100px" :rules="personFormRule">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="姓名：" prop="name">
                            <el-input v-model="personForm.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="身份证：" prop="idCard">
                            <el-input v-model="personForm.idCard" placeholder="请输入身份证"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别：" prop="sex">
                            <el-select v-model="personForm.sex" placeholder="请选择性别">
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="出生年月日：" prop="birthday">
                            <el-date-picker
                                    v-model="personForm.birthday"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="请选择出生年月日" style="width:100%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="身高(cm)：" prop="height">
                            <el-input v-model="personForm.height" placeholder="请输入身高(cm)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="体重(kg)：" prop="weight">
                            <el-input v-model="personForm.weight" placeholder="请输入体重(kg)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="籍贯：" prop="jg">
                            <el-input v-model="personForm.jg" placeholder="请输入籍贯"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="手机：" prop="phone">
                            <el-input v-model="personForm.phone" maxlength="11" placeholder="请输入手机"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="人员状态：" prop="status">
                            <el-select v-model="personForm.status" placeholder="请选择人员状态">
                                <el-option label="已激活" value="1"></el-option>
                                <el-option label="未激活" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="个人照片：">
                            <el-upload
                                    class="avatar-uploader"
                                    action="api/sports/sports_staff/upload"
                                    :show-file-list="false"
                                    :on-success="uploadSuccess"
                                    :before-upload="beforeUpload">
                                <template v-if="imgUrl">
                                    <img :src="imgUrl" class="avatar">
                                    <i class="el-icon-delete avatar-delete-icon" @click.stop.prevent="imgUrl=null"></i>
                                </template>
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>

        <!--业务信息-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">业务信息</span>
            </div>
            <el-form :model="businessForm" ref="businessForm" :rules="rules" label-width="130px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="职位：" prop="job">
                            <el-select v-model="businessForm.job" placeholder="请选择职位" @change="getLevel">
                                <el-option
                                        v-for="(item, idx) in jobInfoList"
                                        :key="idx"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="职位等级：" prop="level">
                            <el-select v-model="businessForm.level" placeholder="请选择职位等级">
                                <el-option
                                        v-for="(item, idx) in levelList"
                                        :key="idx"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="大项：" prop="bigPro">
                            <el-select v-model="businessForm.bigPro" placeholder="请选择大项" @change="getSmallProList">
                                <el-option
                                        v-for="item in bigProList"
                                        :key="item.dicKey"
                                        :label="item.dicValue"
                                        :value="item.dicKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="小项：" prop="smallPro">
                            <el-select v-model="businessForm.smallPro" placeholder="请选择小项">
                                <el-option
                                        v-for="(item, idx) in smallProList"
                                        :key="idx"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="运动队：" prop="team">
                            <el-select v-model="businessForm.team" placeholder="请选择运动队">
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
                        <el-form-item label="教练员：" prop="coach">
                            <el-select v-model="businessForm.coach" placeholder="请选择教练员">
                                <el-option
                                        v-for="item in coachInfoList"
                                        :key="item.dicKey"
                                        :label="item.dicValue"
                                        :value="item.dicKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="原项目：" prop="oldPro">
                            <el-select v-model="businessForm.oldPro" placeholder="请选择原项目">
                                <el-option
                                        v-for="item in bigProList"
                                        :key="item.dicKey"
                                        :label="item.dicValue"
                                        :value="item.dicKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="原项目训练年限：" prop="trainYear">
                            <el-input v-model="businessForm.trainYear" placeholder="请输入原项目训练年限"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="入队时间：" prop="joinDate">
                            <el-date-picker
                                    type="date"
                                    placeholder="请选择入队时间"
                                    value-format="yyyy-MM-dd"
                                    v-model="businessForm.joinDate"
                                    style="width: 100%;">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>

        <!--保存-->
        <el-row style="text-align: center;">
            <el-button v-waves @click="cancelAct" round class="new-pro-btn">取 消</el-button>
            <el-button v-waves type="primary" round @click="onSubmit" :loading="btnLoading" style="padding: 12px 35px;">保存</el-button>
        </el-row>
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    import {saveStaff, getLevelByName} from '@/api/accountAndPermission'
    export default {
        mixins: [mixins],
        data() {
            return {
                btnLoading: false,
                levelList: [],  // 职位级别列表(无key值)
                imgUrl: null, // 图片预览地址
                personForm: {  // 个人信息
                    name: null,
                    sex: null,
                    idCard: null,
                    birthday: null,
                    height: null,
                    weight: null,
                    jg: null,
                    phone: null,
                    status: null,
                    photo: null,  // 保存提交的对象
                },
                businessForm: {  // 业务信息
                    job: null,
                    level: null,
                    bigPro: null,
                    smallPro: null,
                    team: null,
                    coach: null,
                    oldPro: null,
                    trainYear: null,
                    joinDate: null,
                },
                personFormRule: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    idCard: [
                        { required: true, message: '请输入身份证', trigger: 'blur' }
                    ]
                },
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    idCard: [
                        { required: true, message: '请输入身份证', trigger: 'blur' }
                    ]
                }
            }
        },

        created() {
            this.getAllList(); // 获取基础下拉列表
        },

        methods: {
            // 保存人员
            onSubmit() {
                this.$refs.personForm.validate((valid) => {
                    if (valid) {
                        this.btnLoading = true;
                        saveStaff({
                            // 人员信息
                            staffId: null, // 更新的时候使用
                            staffName: this.personForm.name,
                            identity: this.personForm.idCard,
                            gender: parseInt(this.personForm.sex),
                            birthday: this.personForm.birthday,
                            height: parseInt(this.personForm.height),
                            weight: parseInt(this.personForm.weight),
                            nativePlace: this.personForm.jg,
                            telphone: this.personForm.phone,
                            status: this.personForm.status,
                            photo: this.personForm.photo,

                            // 业务信息
                            jobName: this.businessForm.job,
                            jboLevel: parseInt(this.businessForm.level),
                            projectId: this.businessForm.bigPro,
                            childProject: this.businessForm.smallPro,
                            teamId: this.businessForm.team,
                            coachId: this.businessForm.coach,
                            oldProjectId: this.businessForm.oldPro,
                            oldProjectDuration: this.businessForm.trainYear,
                            joinDate: this.businessForm.joinDate
                        }).then(res => {
                            if(res.data.code == 200) {
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                                this.cancelAct('save');
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

            // 通过职位名称查找职级
            getLevel(jobName) {
                getLevelByName({jobName: jobName}).then(res => {
                    if(res.data.code == 200) {
                        this.levelList = res.data.data;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
            },

            // 图片上传成功回调函数
            uploadSuccess(res, file) {
                this.imgUrl = URL.createObjectURL(file.raw);
                this.personForm.photo = res.data.staffPhoto;
            },

            // 上传前的校验
            beforeUpload(file) {

            }
        }
    }
</script>

<style lang="scss">
    .person-permission-add-wrapper {
        .card-box {
            margin-bottom: 25px;
            .section-title {
                font-weight: 700;
            }
        }


        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            width: 128px;
            height: 128px;
            line-height: 128px;
            text-align: center;
        }

        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }

        .avatar-delete-icon {
            position: absolute;
            right: 0;
            top: 0;
            color: #8c939d;
            font-size: 16px;
            width: 30px;
            height: 30px;
            line-height: 30px;
            background: rgba(0, 0, 0, .3);
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
        }

        .avatar {
            width: 128px;
            height: 128px;
            display: block;
        }
    }
</style>
