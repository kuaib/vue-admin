<!--个人信息-->
<template>
    <el-form :model="personForm" label-width="130px">
        <el-row>
            <div class="sub-title" style="margin-top:0">个人信息</div>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="姓名：">{{personForm.staffName}}</el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="性别：">{{personForm.gender == 1 ?'男':'女'}}</el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="身份证：">{{personForm.identity}}</el-form-item>
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
                    <el-form-item label="籍贯：">{{personForm.nativePlace}}</el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="个人照片：">
                        <img :src="personForm.photo" style="width: 150px;">
                    </el-form-item>
                </el-col>
            </el-row>
        </el-row>

        <el-row>
            <div class="sub-title">身份信息</div>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="身份角色：">{{personForm.jobName}}</el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="运动员级别：">{{personForm.jobLevel}}</el-form-item>
                </el-col>
            </el-row>
        </el-row>

        <el-row>
            <div class="sub-title">业务信息</div>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="大项：">{{personForm.projectName}}</el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="小项：">{{personForm.childProject}}</el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="运动队：">{{personForm.teamName}}</el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="教练员：">{{personForm.coachName}}</el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="原项目：">{{personForm.oldProjectName}}</el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="原项目训练年限：">{{personForm.oldProjectDuration}}</el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="入队时间：">{{personForm.joinDate}}</el-form-item>
                </el-col>
            </el-row>
        </el-row>
    </el-form>
</template>

<script>
    export default {
        props: {
            personForm: {  // 运动员信息
                type: Object,
                default: () => {
                    return {}
                }
            }
        }
    }
</script>
