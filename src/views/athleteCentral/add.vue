<template>
    <div class="createAthlete">
        <el-form ref="form" :model="form" :rules="rules" label-width="180px">
            <!--基本信息-->
            <div class="general">
                <h3 class="mainTitle">基本信息 General</h3>
                <el-row :gutter="20">
                    <el-col :span="16">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="姓名 Name" prop="athleteName">
                                    <el-input v-model="form.athleteName" placeholder="请输入姓名 Enter Name"></el-input>
                                </el-form-item>
                                <el-form-item label="生日 Birthday" prop="birthday">
                                    <el-col :span="11" class="chooseDate">
                                        <el-date-picker type="date" placeholder="选择日期 Select Birthday" v-model="form.birthday"
                                                        style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="体重 Weight (kg)" prop="weight">
                                    <el-input v-model="form.weight" placeholder="请输入体重 Enter Weight"></el-input>
                                </el-form-item>
                                <el-form-item label="省份 Province" prop="provinceId">
                                    <el-select v-model="form.provinceId" placeholder="请选择省份 Select Province"
                                               @change="handleChange(form.provinceId,'province')">
                                        <el-option v-for="item in provincesList" :label="item.dicValue" :value="item.dicKey"
                                                   :key="item.dicKey"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="电话1 Cell1" prop="telephone1">
                                    <el-input v-model="form.telephone1" placeholder="请输入电话1 Enter Cell1"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="性别 Sex">
                                    <el-radio-group v-model="form.gender">
                                        <el-radio label="1">男 Mail</el-radio>
                                        <el-radio label="2">女 Femail</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="身高 Height (cm)" prop="height">
                                    <el-input v-model="form.height" placeholder="请输入身高 Enter Height"></el-input>
                                </el-form-item>
                                <el-form-item label="身份证 ID No." prop="idCard">
                                    <el-input v-model="form.idCard" placeholder="请输入身份证 Enter ID No."></el-input>
                                </el-form-item>
                                <el-form-item label="微信 Wechat" prop="wechat">
                                    <el-input v-model="form.wechat" placeholder="请输入微信 Enter Wechat"></el-input>
                                </el-form-item>
                                <el-form-item label="电话2 Cell2" prop="telephone2">
                                    <el-input v-model="form.telephone2" placeholder="请输入电话 Enter Cell2"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="6" :offset="2" class="upload-item">
                        <div class="imgTitle">上传运动员照片<br/>Upload File</div>
                        <el-form-item prop="photo">
                            <el-upload
                                    class="avatar-uploader"
                                    action="/sports/sys/upload/athleteLogo"
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
            </div>

            <!--专项信息-->
            <div class="Sepcialty">
                <h3 class="mainTitle">专项信息 Sepcialty</h3>
                <el-row :gutter="20">
                    <el-col :span="16">
                        <el-col :span="12">
                            <el-form-item label="运动项目 Sport" prop="specialId">
                                <el-select v-model="form.specialId" placeholder="请选择专项 Select Sport"
                                           @change="handleChange(form.specialId,'special')">
                                    <el-option v-for="item in specialList" :label="item.dicValue" :value="item.dicKey"
                                               :key="item.dicKey"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="训练年限 Training Age" prop="trainingAge" label-width="200px">
                                <el-input v-model="form.trainingAge" placeholder="请输入训练年限 Enter Training Age"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="队伍 Team" prop="teamId">
                                <el-select v-model="form.teamId" placeholder="请选择队伍 Select Team"
                                           @change="handleChange(form.teamId,'team')">
                                    <el-option v-for="item in teamList" :label="item.teamName" :value="item.teamId"
                                               :key="item.teamId"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="损伤历史 Injury History" prop="injuryHistory">
                                <el-select v-model="form.injuryHistory" placeholder="请选择损伤历史 Select Injury History">
                                    <el-option v-for="item in injuryHistoryList" :label="item.dicValue" :value="item.dicKey"
                                               :key="item.dicKey"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!--<el-form-item label="是否跨项" prop="isCross">-->
                            <!--<el-radio-group v-model="form.isCross" @change="crossChange">-->
                                <!--<el-radio label="0">否</el-radio>-->
                                <!--<el-radio label="1">是</el-radio>-->
                            <!--</el-radio-group>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="跨项开始时间" prop="crossSince" v-show="form.isCross==1">-->
                            <!--<el-col :span="11" class="chooseDate">-->
                                <!--<el-date-picker type="date" placeholder="选择日期" v-model="form.crossSince"-->
                                                <!--style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>-->
                            <!--</el-col>-->
                        <!--</el-form-item>-->
                    </el-col>
                </el-row>
            </div>
        </el-form>
        <el-row class="btn-row">
            <el-button type="primary" v-show="!submitFlag" @click="submitForm('form')">保存 save</el-button>
            <el-button type="primary" v-show="submitFlag" :loading="true">提交中 submiting</el-button>
            <el-button @click="resetForm('form')" style="margin-left: 50px;">重置 reset</el-button>
        </el-row>
    </div>
</template>

<script>
    import {getAllDic} from '@/api/common'
    import {saveAthlete} from '@/api/athlete'
    import {getTeamListAll} from '@/api/team'

    export default ({
        data() {
            return {
                imgUrl: null,         // 图片的预览地址

                submitFlag: false,  // 提交锁
                teamList: [],       // 队伍选项
                specialList: [],    // 专项选项
                provincesList: [],   // 省份选项
                injuryHistoryList: [
                    {dicKey: 'None', dicValue: '无损伤'},
                    {dicKey: 'Moderate', dicValue: '中等损伤'},
                    {dicKey: 'Significant', dicValue: '严重损伤'},
                ],  // 损伤历史选项


                form: {
                    id: this.$route.query.id ? this.$route.query.id : '',
                    photo: null,        // 图片url
                    athleteName: null,  // 姓名

                    teamId: null,        // 队伍Id
                    teamName: null,      // 队伍name

                    specialId: null,      // 专项id
                    specialName: null,    // 专项name

                    provinceId: null,     //省份id
                    provinceName: null,   //省份名称

                    gender: '1',       // 性别
                    trainingAge: null, // 训练年限
                    // isCross: '0',   // 是否跨项
                    // crossSince: null, // 跨项开始时间
                    birthday: null,   // 生日
                    height: null,     // 身高
                    weight: null,     // 体重
                    idCard: null,     // 身份证
                    telephone: null,  // 电话
                    telephone1: null,  // 电话1
                    telephone2: null,  // 电话2
                    wechat: null,      // 微信
                    injuryHistory: null // 损伤历史

                },
                rules: { // 表单校验规则
                    athleteName: [
                        {required: true, message: '请输入姓名 Please enter name', trigger: 'blur'},
                    ],
                    teamId: [
                        {required: true, message: '请选择队伍', trigger: 'blur'},
                    ],
                    injuryHistory: [
                        {required: true, message: '请选择损伤历史', trigger: 'blur'},
                    ],
                    specialId: [
                        {required: true, message: '请选择运动项目 Please select Sport', trigger: 'blur'},
                    ],
                    provinceId: [
                        {required: true, message: '请选择省份 Please select province', trigger: 'blur'},
                    ],
                    trainingAge: [
                        {required: true, message: '请输入训练年限 Please enter Training Age', trigger: 'blur'},
                    ],
                    birthday: [
                        {required: true, message: '请选择生日 Please select birthday', trigger: 'blur'},
                    ],
                    height: [
                        {required: true, message: '请输入身高 Please enter height', trigger: 'blur'},
                    ],
                    weight: [
                        {required: true, message: '请输入体重 Please enter weight', trigger: 'blur'},
                    ],
                    telephone1: [
                        {required: true, message: '请输入电话 Please enter telephone', trigger: 'blur'},
                    ],
                    idCard: [
                        {required: true, message: '请输入身份证 Please enter ID No.', trigger: 'blur'},
                    ],
                    photo: [
                        {required: true, message: '请上传图片 Please upload image', trigger: 'blur'},
                    ]
                }
            }
        },
        created() {
            this.getSelectList();
            this.getTeamList();
        },

        methods: {
            // 获取所有下拉徐选项列表
            getSelectList() {
                getAllDic().then(res => {
                    if (res.data.code === 200) {
                        const data = res.data.data;
                        // this.cateList = data.cateList;
                        this.specialList = data.specialList;
                        this.orgList = data.orgList;
                        this.provincesList = data.provincesList;
                        this.coachList = data.coachList;
                        console.log(this.provincesList)
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    console.log('获取失败')
                })
            },

            // 获取所有队伍信息
            getTeamList() {
                getTeamListAll().then(res => {
                    if(res.data.code == 200) {
                        this.teamList = res.data.data;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    console.log('获取队伍列表失败')
                })
            },

            // 提交表单
            submitForm(formName) {
                console.log(this.form)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.submitFlag = true;
                        this.form.telephone = this.form.telephone2 ?
                            (this.form.telephone1 + ',' + this.form.telephone2) :
                            this.form.telephone1;
                        saveAthlete(this.form).then(res => {
                            this.submitFlag = false;
                            if(res.data.code === 200) {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'success'
                                });
                                this.resetForm('form');
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'warning'
                                })
                            }

                        }).catch(rej => {
                            this.submitFlag = false;
                            console.log('保存失败')
                        })
                    } else {
                        return false
                    }
                })
            },

            // 转换数组集合(方便快速找出key对应的value)
            arrToObj(arrList, type) {
                if(type === 'team') {
                    return arrList.reduce((acc, cur) => {
                        acc[cur.teamId] = cur.teamName;
                        return acc
                    }, {})
                } else {
                    return arrList.reduce((acc, cur) => {
                        acc[cur.dicKey] = cur.dicValue;
                        return acc
                    }, {})
                }
            },

            // 改变下拉选项
            handleChange(val, type) {
                let obj = {};
                if (type === 'team') {
                    obj = this.arrToObj(this.teamList, 'team');
                    this.form.teamName = obj[val];
                } else if (type === 'special') {
                    obj = this.arrToObj(this.specialList);
                    this.form.specialName = obj[val];
                } else if (type === 'province') {
                    obj = this.arrToObj(this.provincesList);
                    this.form.provinceName = obj[val];
                }
            },

            // 重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.form.photo = null;
                this.imgUrl = null;
            },

            // 切换是否跨项目
            crossChange(label) {
                if(label == 0) {
                    this.form.crossSince = null
                }
            },

            // 图片上传成功回调函数
            uploadSuccess(res, file) {
                this.imgUrl = URL.createObjectURL(file.raw);
                this.form.photo = res.data.fileName;
            },

            // 上传前的校验
            beforeUpload(file) {
                // const isJPG = file.type === 'image/jpeg';
                // const isLt2M = file.size / 1024 / 1024 < 2;
                //
                // if (!isJPG) {
                //   this.$message.error('上传头像图片只能是 JPG 格式!');
                // }
                // if (!isLt2M) {
                //   this.$message.error('上传头像图片大小不能超过 2MB!');
                // }
                // return isJPG && isLt2M;
            }
        }
    })
</script>

<style lang="scss">
    .createAthlete {
        .mainTitle {
            padding-bottom: 10px;
            margin-bottom: 15px;
            border-bottom: 1px solid #409EFF;
            color: #409EFF;
        }
        .chooseDate {
            padding-left: 0 !important;
            padding-right: 0 !important;
            width: 100%;
        }

        .upload-item .el-form-item__content {
            margin-left: 0 !important;
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

        .imgTitle {
            width: 178px;
            text-align: center;
            padding-bottom: 30px;
            font-size: 16px;
        }

        .btn-row {
            text-align: center;
            margin-top: 35px;
            .el-button {
                width: 150px;
            }
        }
    }
</style>
