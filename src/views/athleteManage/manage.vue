<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-row :gutter="20">
                <el-col :span="9">
                    <el-row>
                        <el-form-item label="姓名" prop="athleteName1">
                            <el-input v-model="form.athleteName1" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="队伍" prop="teamId">
                            <el-select v-model="form.teamId" placeholder="请选择队伍"
                                       @change="handleChange(form.teamId,'team')">
                                <el-option v-for="item in teamList" :label="item.dicValue" :value="item.dicKey"
                                           :key="item.dicKey"></el-option>
                            </el-select>
                            <!--<div>编辑运动员时显示</div>-->
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="专项" prop="specialId">
                            <el-select v-model="form.specialId" placeholder="请选择专项"
                                       @change="handleChange(form.specialId,'special')">
                                <el-option v-for="item in specialList" :label="item.dicValue" :value="item.dicKey"
                                           :key="item.dicKey"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="省份" prop="provinceId">
                            <el-select v-model="form.provinceId" placeholder="请选择省份"
                                       @change="handleChange(form.provinceId,'province')">
                                <el-option v-for="item in provinceList" :label="item.dicValue" :value="item.dicKey"
                                           :key="item.dicKey"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-row>
                            <el-form-item label="训练年限" prop="trainingAge">
                                <el-input v-model="form.trainingAge" placeholder="请输入身高"></el-input>
                            </el-form-item>
                        </el-row>
                    </el-row>
                    <el-form-item label="是否跨项" prop="isCross">
                        <el-radio-group v-model="form.isCross">
                            <el-radio label="0">否</el-radio>
                            <el-radio label="1">是</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="跨项开始时间" prop="crossSince" v-show="form.isCross==1">
                        <el-col :span="11" class="chooseDate">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.crossSince"
                                            style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="form.gender">
                            <el-radio label="1">男</el-radio>
                            <el-radio label="2">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="生日" prop="birthday">
                        <el-col :span="11" class="chooseDate">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday"
                                            style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-row>
                        <el-form-item label="身高" prop="height">
                            <el-input v-model="form.height" placeholder="请输入身高"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="体重" prop="weight">
                            <el-input v-model="form.weight" placeholder="请输入体重"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="身份证" prop="idCard">
                            <el-input v-model="form.idCard" placeholder="请输入身份证"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="电话" prop="telephone">
                            <el-input v-model="form.telephone" placeholder="请输入电话"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="微信" prop="weChart">
                            <el-input v-model="form.weChart" placeholder="请输入微信"></el-input>
                        </el-form-item>
                    </el-row>
                </el-col>
                <el-col :span="9" :offset="6">
                    <div class="imgTitle">队伍logo上传</div>
                    <el-upload
                            class="avatar-uploader"
                            action="/api/upload"
                            :show-file-list="false"
                            :on-success="uploadSuccess"
                            :before-upload="beforeUpload">
                        <template v-if="form.photo">
                            <img :src="form.photo" class="avatar">
                            <i class="el-icon-delete avatar-delete-icon" @click="form.photo=''"></i>
                        </template>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-col>
            </el-row>
        </el-form>
        <el-row class="btn-row">
            <el-button type="primary" v-show="!submitFlag" @click="submitForm('form')">确认</el-button>
            <el-button type="primary" v-show="submitFlag" :loading="true">提交中</el-button>
            <el-button @click="resetForm('form')" style="margin-left: 50px;">重置</el-button>
        </el-row>
    </div>
</template>

<script>
    import {getAllDic} from '@/api/common'
    import {saveAthlete} from '@/api/athlete'

    export default ({
        data() {
            return {
                submitFlag: false,  // 提交锁
                teamList: [{dicValue: '国家队', dicKey: 1}, {dicValue: '集训队', dicKey: 2}],       // 队伍选项
                specialList: [{dicValue: '赛艇', dicKey: 1}, {dicValue: '⽪皮划艇', dicKey: 2}],    // 专项选项
                provinceList: [{dicValue: '辽宁省', dicKey: 11}, {dicValue: '黑龙江省', dicKey: 22}],    // 省份选项
                form: {
                    id: this.$route.query.id,
                    photo: '',        // 图片url
                    athleteName1: '', // 姓名

                    teamId: '',        // 队伍Id
                    teamName: '',      // 队伍name

                    specialId: '',      // 专项id
                    specialName: '',    // 专项name

                    provinceId: "150000",       //省份id
                    provinceName: "内蒙古⾃自治区", //省份名称

                    gender: '1',    // 性别
                    trainingAge: '',// 训练年限
                    isCross: '0',   // 是否跨项
                    crossSince: '', // 跨项开始时间
                    birthday: '',   // 生日
                    height: '',     // 身高
                    weight: '',     // 体重
                    idCard: '',     // 身份证
                    telephone: '',  // 电话
                    weChart: ''     // 微信

                },
                rules: { // 表单校验规则
                    athleteName1: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    teamId: [
                        {required: true, message: '请选择队伍', trigger: 'blur'},
                    ],
                    specialId: [
                        {required: true, message: '请选择专项', trigger: 'blur'},
                    ]
                }
            }
        },
        created() {
            this.getSelectList();
        },

        methods: {
            // 获取所有下拉徐选项列表
            getSelectList() {
                getAllDic().then(res => {
                    if (res.data.code === '200') {
                        this.teamList = data.teamList;
                        this.specialList = data.specialList;
                    } else {
                        this.$message(res.data.msg);
                    }
                }).catch(rej => {
                    console.log('获取失败')
                })
            },

            // 提交表单
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.submitFlag = true;
                        saveAthlete(this.form).then(res => {
                            this.submitFlag = false;
                            this.$message(res.msg)
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
            arrToObj(arrList) {
                return arrList.reduce((acc, cur) => {
                    acc[cur.dicKey] = cur.dicValue;
                    return acc
                }, {})
            },

            // 改变下拉选项
            handleChange(val, type) {
                let obj = {};
                if (type === 'team') {
                    obj = this.arrToObj(this.teamList);
                    this.form.teamName = obj[val];
                } else if (type === 'special') {
                    obj = this.arrToObj(this.specialList);
                    this.form.specialName = obj[val];
                } else if (type === 'province') {
                    obj = this.arrToObj(this.provinceList);
                    this.form.provinceName = obj[val];
                }
            },

            // 重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields()
            },

            // 图片上传成功
            uploadSuccess(res, file) {
                this.form.photo = URL.createObjectURL(file.raw);
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
    .chooseDate {
        padding-left: 0 !important;
        padding-right: 0 !important;
        width: 100%;
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
        font-weight: 700;
        font-size: 20px;
    }

    .btn-row {
        text-align: center;
        margin-top: 35px;
        .el-button {
            width: 150px;
        }
    }
</style>
