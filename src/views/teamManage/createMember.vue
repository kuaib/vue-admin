<template>
  <div>
    <el-form  ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="9">
          <el-row>
            <el-form-item label="队名" prop="teamName">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="类别" prop="types">
              <el-select v-model="form.types" placeholder="请选择类别" style="width:100%">
                <el-option v-for="item in form.typesList" :value="item.id" :key="item.id">{{item.name}}</el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="专项" prop="special">
              <el-select v-model="form.special" placeholder="请选择专项" style="width:100%">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="单位" prop="company">
              <el-select v-model="form.company" placeholder="请选择单位" style="width:100%">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-form-item label="教练" prop="coach">
            <el-radio-group v-model="form.coach">
              <el-radio label="A教练"></el-radio>
              <el-radio label="B教练"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="6">
          <div class="imgTitle">队伍logo上传</div>
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
          imageUrl: '',     // 图片上传
          teamName: '',     // 队伍
          types: '',        // 类别
          typesList: [{name: '国家队',id: 1},{name: '集训队',id: 2}],    // 类别集合
          special: '',      // 专项
          company: '',      // 单位
          coach: '',        // 教练
        },
        rules: { // 表单校验规则
          teamName: [
            {required: true, message: '请输入队伍名称', trigger: 'blur'},
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
