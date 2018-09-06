<template>
    <div>
        <el-form  ref="form" :model="form" :rules="rules" label-width="100px">
            <el-row :gutter="20">
                <el-col :span="9">
                    <el-row>
                        <el-form-item label="销售订单号" prop="saleOrderNum">
                            <el-input v-model="form.saleOrderNum"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="单据日期" prop="orderDate">
                            <el-date-picker type="date" placeholder="单据日期" v-model="form.orderDate" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="交货日期" prop="subProdDate">
                            <el-date-picker type="date" placeholder="交货日期" v-model="form.subProdDate" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="收货地址" prop="address">
                            <el-select v-model="form.address" placeholder="请选择收货地址" style="width:100%">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="单据日期" prop="orderDate">
                            <el-date-picker type="date" placeholder="单据日期" v-model="form.orderDate" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-row>
                </el-col>
                <el-col :span="9" :offset="6">
                    <div class="imgTitle">运动员照片上传</div>
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
            <el-button type="primary" @click="submitForm('form')" style="margin-right: 50px;">保存</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
        </el-row>
    </div>
</template>

<script>
    export default ({
        data() {
            return {
                form: {
                    imageUrl: '',

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
                    saleOrderNum: [
                        {required: true, message: '请输入销售订单编号', trigger: 'blur'},
                        {message: '长度为 17 个字符', trigger: 'blur'}
                    ],
                    orderDate: [
                        {type: 'date', required: true, message: '请选择单据日期', trigger: 'change'}
                    ],
                    subProdDate: [
                        {type: 'date', required: true, message: '请选择交货日期', trigger: 'change'}
                    ],
                    customer: [
                        {required: true, message: '请输入/选择客户'}
                    ],
                    address: [
                        {required: true, message: '请至少选择一个地址', trigger: 'change'}
                    ]
                }
            }
        },

        methods: {
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