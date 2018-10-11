<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-row :gutter="20">
                <el-col :span="9">
                    <el-row>
                        <el-form-item label="队名" prop="teamName">
                            <el-input v-model="form.teamName" placeholder="请输入队名"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="类别" prop="categoryId">
                            <el-select v-model="form.categoryId" placeholder="请选择类别"
                                       @change="handleChange(form.categoryId,'category')">
                                <el-option v-for="item in cateList" :label="item.dicValue" :value="item.dicKey"
                                           :key="item.dicKey"></el-option>
                            </el-select>
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
                        <el-form-item label="单位" prop="organizationId">
                            <el-select v-model="form.organizationId" placeholder="请选择单位"
                                       @change="handleChange(form.organizationId,'organization')">
                                <el-option v-for="item in orgList" :label="item.dicValue" :value="item.dicKey"
                                           :key="item.dicKey"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="教练" prop="coachId">
                            <el-select v-model="form.coachId" placeholder="请选择教练"
                                       @change="handleChange(form.coachId,'coach')">
                                <el-option v-for="item in coachList" :label="item.dicValue" :value="item.dicKey"
                                           :key="item.dicKey"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                </el-col>
                <el-col :span="9" :offset="6">
                    <div class="imgTitle">队伍logo上传</div>
                    <el-form-item prop="logo">
                        <el-upload
                                class="avatar-uploader"
                                action="/sports/sys/upload/teamLogo"
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
        <el-row class="btn-row">
            <el-button type="primary" v-show="!submitFlag" @click="submitForm('form')">确认</el-button>
            <el-button type="primary" v-show="submitFlag" :loading="true">提交中</el-button>
            <el-button @click="resetForm('form')" style="margin-left: 50px;">重置</el-button>
        </el-row>
    </div>
</template>

<script>
    import {getAllDic} from '@/api/common'
    import {saveTeam, teamDetail} from '@/api/team'
    import LocalDB from '@/utils/indexedDB'

    export default ({
        data() {
            return {
                teamTable: null,    // indexed
                submitFlag: false,  // 提交锁
                cateList: [],       // 类别选项
                specialList: [],    // 专项选项
                orgList: [],        // 单位选项
                coachList: [],      // 教练选项

                imgUrl: null,         // 图片的预览地址
                form: {
                    id: null,
                    logo: null,         // 图片url
                    teamName: null,     // 队伍

                    categoryId: null,        // 类别Id
                    categoryName: null,      // 类别name

                    specialId: null,         // 专项id
                    specialName: null,       // 专项name

                    organizationId: null,    // 单位id
                    organizationName: null,  // 单位name

                    coachId: null,           // 教练id
                    coachName: null,         // 教练name

                },
                rules: { // 表单校验规则
                    teamName: [
                        {required: true, message: '请输入队伍名称', trigger: 'blur'},
                    ],
                    categoryId: [
                        {required: true, message: '请选择类别', trigger: 'blur'},
                    ],
                    specialId: [
                        {required: true, message: '请选择类别', trigger: 'blur'},
                    ],
                    organizationId: [
                        {required: true, message: '请选择单位', trigger: 'blur'},
                    ],
                    logo: [
                        {required: true, message: '请上传图片 Please upload image', trigger: 'blur'},
                    ]
                }
            }
        },
        created() {
            this.getSelectList();
            this.teamTable = new LocalDB('sports', 'team');
        },

        methods: {
            // 编辑时渲染页面
            initPage() {
                teamDetail(this.form.id).then(res => {
                    if (res.data.code === 200) {
                        const data = res.data.data;
                        this.imgUrl = data.logo;

                        this.form.logo = data.logo.split('/img/')[1];
                        this.form.teamName = data.teamName;
                        this.form.categoryId = data.categoryId.toString();
                        this.form.categoryName = data.categoryName;
                        this.form.specialId = data.specialId.toString();
                        this.form.specialName = data.specialName;
                        this.form.organizationId = data.organizationId.toString();
                        this.form.organizationName = data.organizationName;
                        this.form.coachId = data.coachId.toString();
                        this.form.coachName = data.coachName;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    console.log('获取数据失败')
                })
            },

            // 获取下拉选项
            getSelectList() {
                getAllDic().then(res => {
                    if (res.data.code === 200) {
                        const data = res.data.data;
                        this.cateList = data.cateList;
                        this.specialList = data.specialList;
                        this.orgList = data.orgList;
                        this.coachList = data.coachList;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).then(() => {
                    if (this.$route.query.teamId) {
                        this.form.id = this.$route.query.teamId;
                        this.initPage();
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
                        if (navigator.onLine) {
                            saveTeam(this.form).then(res => {
                                this.submitFlag = false;
                                if (res.data.code === 200) {
                                    this.$message({
                                        message: res.data.msg,
                                        type: 'success'
                                    });
                                    this.$router.replace('/teamManage/list');
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
                            console.log('离线')
                            // 如果是离线状态，则保存到本地
                            this.teamTable.open(() => {
                                this.teamTable.set(this.form);
                            })
                        }
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
                if (type === 'category') {
                    obj = this.arrToObj(this.cateList);
                    this.form.categoryName = obj[val];
                } else if (type === 'special') {
                    obj = this.arrToObj(this.specialList);
                    this.form.specialName = obj[val];
                } else if (type === 'organization') {
                    obj = this.arrToObj(this.orgList);
                    this.form.organizationName = obj[val];
                } else {
                    obj = this.arrToObj(this.coachList);
                    this.form.coachName = obj[val];
                }
            },

            // 重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.imgUrl = null;
                this.form.logo = null;
            },

            // 图片上传成功回调函数
            uploadSuccess(res, file) {
                this.imgUrl = URL.createObjectURL(file.raw);
                this.form.logo = res.data.fileName;
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
