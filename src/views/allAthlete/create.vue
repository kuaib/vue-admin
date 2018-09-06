<template>
    <div>
        <el-form  ref="form" :model="form" :rules="rules" label-width="100px">
            <el-row :gutter="20">
                <el-col :span="9">
                    <el-row>
                        <el-form-item :label="$t('allAthlete.name')" prop="name">
                            <el-input v-model="form.name" :placeholder="$t('commonwords.pIpt')+$t('allAthlete.name')"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item :label="$t('allAthlete.ranks')" prop="ranks">
                            <span>{{form.ranks}}</span>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item :label="$t('allAthlete.special')" prop="special">
                            <el-select v-model="form.special" :placeholder="$t('commonwords.pSel')+$t('allAthlete.special')" style="width:100%">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-form-item :label="$t('allAthlete.sex')" prop="sex">
                        <el-radio-group v-model="form.sex">
                            <el-radio :label="$t('allAthlete.male')"></el-radio>
                            <el-radio :label="$t('allAthlete.female')"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-row>
                        <el-form-item :label="$t('allAthlete.birthday')" prop="birthday">
                            <el-date-picker type="date" v-model="form.birthday" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item :label="$t('allAthlete.height')" prop="height">
                            <el-input v-model="form.height" :placeholder="$t('commonwords.pIpt')+$t('allAthlete.height')"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item :label="$t('allAthlete.weight')" prop="weight">
                            <el-input v-model="form.weight" :placeholder="$t('commonwords.pIpt')+$t('allAthlete.weight')"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item :label="$t('allAthlete.idCard')" prop="idCard">
                            <el-input v-model="form.idCard" :placeholder="$t('commonwords.pIptA')+$t('allAthlete.idCard')"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item :label="$t('allAthlete.tel')" prop="tel">
                            <el-input v-model="form.tel" :placeholder="$t('commonwords.pIpt')+$t('allAthlete.tel')"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item :label="$t('allAthlete.wx')" prop="wx">
                            <el-input v-model="form.wx" :placeholder="$t('commonwords.pIpt')+$t('allAthlete.wx')"></el-input>
                        </el-form-item>
                    </el-row>
                </el-col>
                <el-col :span="9" :offset="6">
                    <div class="imgTitle">{{$t('allAthlete.title')}}</div>
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="form.imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-col>
            </el-row>
        </el-form>
        <el-row class="btn-row">
            <el-button type="primary" @click="submitForm('form')" style="margin-right: 50px;">{{$t('commonwords.confirm')}}</el-button>
            <el-button @click="resetForm('form')">{{$t('commonwords.reset')}}</el-button>
        </el-row>
    </div>
</template>

<script>
    export default ({
        data() {
            return {
                form: {
                    imageUrl: '', // 图片上传
                    name: '',     // 姓名
                    ranks: 'fdfdfdf',    // 队伍
                    special: '',  // 专项
                    sex: '',      // 性别
                    birthday: '',   // 生日
                    height: '',     // 身高
                    weight: '',     // 体重
                    idCard: '',     // 身份证
                    tel: '',        // 电话
                    wx: '',         // 微信



                    saleOrderNum: '', // 销售订单号
                    orderDate: '', // 单据日期
                    subProdDate: '', // 交货日期
                    employee: '', // 职员
                    customer: '', // 客户
                    address: '', // 收货地址
                    linkman: '', // 联系人
                    linktel: '', // 联系电话
                    remark: '', // 备注信息
                    conRate: '0.00', // 优惠率
                    conPrice: '0.00', // 优惠金额
                    hasConPrice: '0.00', // 优惠后金额
                    detailList: [] // 明细信息列表
                },
                rules: { // 表单校验规则
                    name: [
                        {required: true, message: this.$t('commonwords.pIpt')+this.$t('allAthlete.name'), trigger: 'blur'},
                    ],
                    special: [
                        {required: true, message: this.$t('commonwords.pSel')+this.$t('allAthlete.special'), trigger: 'change'}
                    ]
                }
            }
        },

        methods: {
            // 提交表单
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.form)
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            // 重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields()
            },

            handleAvatarSuccess(res, file) {
                this.form.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                // const isJPG = file.type === 'image/jpeg';
                const isJPG = true;
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
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
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
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