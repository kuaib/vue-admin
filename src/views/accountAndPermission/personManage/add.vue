<!--创建人员-->
<template>
    <div class="person-permission-add-wrapper">

        <!--个人信息-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">个人信息</span>
            </div>
            <el-form :model="personForm" label-width="100px" :rules="personFormRule">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="姓名：" prop="name">
                            <el-input v-model="personForm.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别：" prop="sex">
                            <el-select v-model="personForm.sex" placeholder="请选择性别">
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="身份证：" prop="idCard">
                            <el-input v-model="personForm.idCard" placeholder="请输入身份证"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="出生年月：" prop="birthday">
                            <el-date-picker
                                    v-model="personForm.birthday"
                                    type="month"
                                    placeholder="请选择出生年月" style="width:100%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="身高：" prop="height">
                            <el-input v-model="personForm.height" placeholder="请输入身高"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="体重：" prop="weight">
                            <el-input v-model="personForm.weight" placeholder="请输入体重"></el-input>
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
                            <el-input v-model="personForm.phone" placeholder="请输入手机"></el-input>
                        </el-form-item>
                    </el-col>
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
            <el-form :model="businessForm" label-width="130px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="职位：" prop="job">
                            <el-select v-model="businessForm.job" placeholder="请选择职位">
                                <el-option
                                        v-for="item in jobInfoList"
                                        :key="item.dicKey"
                                        :label="item.dicValue"
                                        :value="item.dicKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="职位等级：" prop="level">
                            <el-select v-model="businessForm.level" placeholder="请选择职位等级">
                                <el-option
                                        v-for="item in jobInfoList"
                                        :key="item.dicKey"
                                        :label="item.dicValue"
                                        :value="item.dicKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="大项：" prop="bigPro">
                            <el-select v-model="businessForm.bigPro" placeholder="请选择大项">
                                <el-option
                                        v-for="item in bigProjectInfo"
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
                            <el-input v-model="businessForm.smallPro" placeholder="请输入小项"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="运动队：" prop="team">
                            <el-select v-model="businessForm.team" placeholder="请选择运动队">
                                <el-option
                                        v-for="item in jobInfoList"
                                        :key="item.dicKey"
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
                        <el-form-item label="原项目：" prop="frontPro">
                            <el-select v-model="businessForm.frontPro" placeholder="请选择原项目">
                                <el-option
                                        v-for="item in jobInfoList"
                                        :key="item.dicKey"
                                        :label="item.dicValue"
                                        :value="item.dicKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="训练年限：" prop="trainYear">
                            <el-input v-model="businessForm.trainYear" placeholder="请输入训练年限"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="入队时间：" prop="joinDate">
                            <el-date-picker type="date" placeholder="请选择入队时间" v-model="businessForm.joinDate" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>

        <!--保存-->
        <el-row style="text-align: center;">
            <el-button v-waves @click="cancelAct()" round style="padding: 12px 35px;">取 消</el-button>
            <el-button v-waves type="primary" round @click="onSubmit" style="padding: 12px 35px;">保存</el-button>
        </el-row>
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    import {saveStaff} from '@/api/accountAndPermission'
    export default {
        mixins: [mixins],
        data() {
            return {
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
                    photo: null,  // 保存提交的对象
                },
                businessForm: {  // 业务信息
                    job: null,
                    level: null,
                    bigPro: null,
                    smallPro: null,
                    team: null,
                    coach: null,
                    frontPro: null,
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
                }
            }
        },

        methods: {
            // 保存人员
            onSubmit() {
                saveStaff({

                }).then(res => {

                })
            },

            // 图片上传成功回调函数
            uploadSuccess(res, file) {
                this.imgUrl = URL.createObjectURL(file.raw);
                this.personForm.photo = res.data.fileName;
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
            width: 178px;
            height: 178px;
            line-height: 178px;
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
            width: 178px;
            height: 178px;
            display: block;
        }
    }
</style>
