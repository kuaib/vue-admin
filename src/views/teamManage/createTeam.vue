<template>
  <div>
    <el-form  ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="9">
          <el-row>
            <el-form-item label="队名" prop="teamName">
              <el-input v-model="form.teamName"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="类别" prop="categoryId" >
              <el-select v-model="form.categoryId" placeholder="请选择专项" @change="handleChange(form.categoryId,'category')" style="width:100%">
                <el-option v-for="item in form.cateList" :label="item.dicValue" :value="item.dicKey" :key="item.dicKey"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="专项" prop="specialId">
              <el-select v-model="form.specialId" placeholder="请选择专项" @change="handleChange(form.specialId,'special')">
                <el-option v-for="item in form.specialList" :label="item.dicValue" :value="item.dicKey" :key="item.dicKey"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="单位" prop="organizationId">
              <el-select v-model="form.organizationId" placeholder="请选择单位" @change="handleChange(form.organizationId,'organization')">
                <el-option v-for="item in form.orgList" :label="item.dicValue" :value="item.dicKey" :key="item.dicKey"></el-option>
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

          categoryId: '',        // 类别Id
          categoryName: '',      // 类别name
          cateList: [{dicValue: '国家队',dicKey: 1},{dicValue: '集训队',dicKey: 2}],    // 类别选项

          specialId: '',         // 专项id
          specialName: '',       // 专项name
          specialList: [{dicValue: '赛艇',dicKey: 1},{dicValue: '⽪皮划艇',dicKey: 2}],    // 专项选项

          organizationId: '',    // 单位id
          organizationName: '',  // 单位name
          orgList: [{dicValue: '赛艇⽪皮划艇协会',dicKey: 1},{dicValue: '游泳中⼼心',dicKey: 2}],    // 单位选项

          coachId: '',  // 教练id
          coachName: '',// 教练name
          coachList: [{dicValue: '教练a',dicKey: 1},{dicValue: '教练b',dicKey: 2}],    // 专项选项
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
    created() {

    },

    methods: {
      // 转换数组集合(方便快速找出key对应的value)
      arrToObj(arrList) {
        return arrList.reduce((acc, cur) => {
          acc[cur.dicKey] = cur.dicValue
          return acc
        }, {})
      },

      // 改变下拉选项
      handleChange(val,type) {
        let obj = {};
        if(type === 'category') {
          obj = this.arrToObj(this.form.cateList);
          this.form.categoryName = obj[val];
        } else if(type === 'special') {
          obj = this.arrToObj(this.form.specialList);
          this.form.specialName = obj[val];
        } else if(type === 'organization') {
          obj = this.arrToObj(this.form.orgList);
          this.form.organizationName = obj[val];
        }
        console.log(val,obj[val])

      },
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
