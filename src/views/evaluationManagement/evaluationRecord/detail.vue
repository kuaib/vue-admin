<template>
    <div class="evaluation-record-detail-wrapper">
        <!--个人信息-->
        <el-collapse v-model="activeNames" style="margin-bottom: 15px;">
            <el-collapse-item title="个人信息" name="1">
                <el-form :model="personForm" label-width="130px">
                    <el-row>
                        <div class="sub-title">基础信息</div>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-form-item label="姓名：">{{personForm.name}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="性别：">{{personForm.sex}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="身份证：">{{personForm.idCard}}</el-form-item>
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
                                <el-form-item label="籍贯：">{{personForm.jg}}</el-form-item>
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
                                <el-form-item label="运动员级别：">{{personForm.level}}</el-form-item>
                            </el-col>
                        </el-row>
                    </el-row>

                    <el-row>
                        <div class="sub-title">业务信息</div>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-form-item label="大项：">{{personForm.bigPro}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="小项：">{{personForm.smallPro}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="运动队：">{{personForm.team}}</el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-form-item label="教练员：">{{personForm.coach}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="原项目：">{{personForm.frontPro}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="原项目训练年限：">{{personForm.trainYear}}</el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-form-item label="入队时间：">{{personForm.joinDate}}</el-form-item>
                            </el-col>
                        </el-row>
                    </el-row>
                </el-form>
            </el-collapse-item>
        </el-collapse>

        <!--测评信息-->
        <el-collapse v-model="activeNames">
            <el-collapse-item title="测评信息" name="2">
                <el-form :model="testForm" label-width="130px">
                    <el-row>
                        <div class="sub-title">基础信息</div>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-form-item label="测评类型：">{{personForm.testType}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="测评项目：">{{personForm.project}}</el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-form-item label="测评id：">{{personForm.id}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="测评批次：">{{personForm.batch}}</el-form-item>
                            </el-col>
                        </el-row>
                    </el-row>

                    <el-row>
                        <div class="sub-title">测评详情</div>
                        <el-row :gutter="20">
                            <el-table :data="list" border fit highlight-current-row
                                      style="width: 100%;">
                                <el-table-column align="center" label="通气量(MV)">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.trainMonthId}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="最大氧耗量（VO2max ）">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.trainMonth}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="心率(HR)">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.projectName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="负荷">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.teamName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="速度(km/h)">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.coachName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="坡度(%)">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.coachName}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </el-row>
                </el-form>
            </el-collapse-item>
        </el-collapse>
        <el-row style="text-align: center;margin-top:20px;">
            <el-button type="primary" round @click="closeWindow" :loading="btnLoading" style="padding: 12px 35px;">关闭</el-button>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeNames: ['2'],
                personForm: { // 个人信息
                    name: null,
                    sex: null,
                    idCard: null,
                    birthday: null,
                    height: null,
                    weight: null,
                    jg: null,
                    photo: null,

                    jobName: null,
                    level: null,
                },

                testForm: {  // 测评信息
                    testType: null,
                    project: null,
                    id: null,
                    batch: null
                },

                list: []   // 测评详情列表
            }
        },

        created() {
            // this.getDetails();
        },

        methods: {
            // 获取详情信息
            getDetails() {
                aaaa().then(res => {
                    if(res.data.code == 200) {

                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
            },

            // 关闭
            closeWindow() {
                this.$store.dispatch('delVisitedViews', this.$route).then((views) => {
                    this.$router.go(-1)
                })
            }
        }
    }
</script>


<style lang="scss">
    .evaluation-record-detail-wrapper {
        .el-collapse-item__header {
            font-weight: 700;
            font-size: 18px;
            border-bottom: 1px solid #EBEEF5
        }
        .sub-title {
            font-weight: 700;
            font-size: 15px;
            padding-left: 5px;
            border-left: 2px solid #000;
            margin: 15px 0;
            line-height: 1;
        }

        .el-form-item {
            margin-bottom: 0;
        }

        .el-collapse-item__wrap {
            border-bottom: 0;
        }
    }
</style>
