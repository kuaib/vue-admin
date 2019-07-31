<template>
    <div>
        <!--项目(大项)管理-搜索-->
        <el-form :model="bigProjectForm" ref="bigProjectForm" v-if="typeName==='bigPro'">
            <el-row :gutter="20" class="search-item">
                <el-col :span="6">
                    <el-form-item prop="id">
                        <el-input placeholder="请输入大项id" v-model="bigProjectForm.id"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="name">
                        <el-input placeholder="请输入大项名称" v-model="bigProjectForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="bigProjectState">
                        <el-select v-model="bigProjectForm.bigProjectState" placeholder="请选择大项状态">
                            <el-option label="已激活" value="1"></el-option>
                            <el-option label="未激活" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item prop="name">
                        <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索 Search</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item prop="name">
                        <el-button class="search" type="info" v-waves @click="resetForm('bigProjectForm')">重置 Reset</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <!--职位管理-搜索-->
        <el-form :model="positionForm" ref="positionForm" v-if="typeName==='position'">
            <el-row :gutter="20" class="search-item">
                <el-col :span="6">
                    <el-form-item prop="id">
                        <el-input placeholder="请输入职位id" v-model="positionForm.id"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="account">
                        <el-input placeholder="请输入职位名称" v-model="positionForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="accountState">
                        <el-select v-model="positionForm.positionState" placeholder="请选择职位状态">
                            <el-option label="已激活" value="1"></el-option>
                            <el-option label="未激活" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item prop="name">
                        <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索 Search</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item prop="name">
                        <el-button class="search" type="info" v-waves @click="resetForm('positionForm')">重置 Reset</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <!--队伍管理-搜索-->
        <el-form :model="teamForm" ref="teamForm" v-if="typeName==='team'">
            <el-row :gutter="20" class="search-item">
                <el-col :span="6">
                    <el-form-item prop="id">
                        <el-input placeholder="请输入队伍di" v-model="teamForm.id"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="name">
                        el-form-item prop="name">
                        <el-select v-model="teamForm.name" placeholder="请选择队伍名称">
                            <el-option v-for="item in teamList" :label="item.dicValue" :value="item.dicKey"
                                       :key="item.dicKey"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="teamState">
                        <el-select v-model="teamForm.teamState" placeholder="请选择队伍状态">
                            <el-option v-for="item in teamStateList" :label="item.dicValue" :value="item.dicKey"
                                       :key="item.dicKey"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="search-item">
                <el-col :span="6">
                    <el-form-item prop="coach">
                        <el-select v-model="searchForm.coach" placeholder="请选择教练员">
                            <el-option v-for="item in coachList" :label="item.dicValue" :value="item.dicKey"
                                       :key="item.dicKey"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="parentPro">
                        <el-select v-model="searchForm.parentPro" placeholder="请选择隶属大项">
                            <el-option v-for="item in bigProList" :label="item.dicValue" :value="item.dicKey"
                                       :key="item.dicKey"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item prop="name">
                        <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索 Search</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item prop="name">
                        <el-button class="search" type="info" v-waves @click="resetForm('teamForm')">重置 Reset</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>

</template>

<script>
    import mixins from '@/utils/mixins'
    export default ({
        mixins: [mixins],
        data() {
            return {
                bigProjectStateList: [],  // 大项状态列表
                positionStateList: [],    // 职位状态列表
                teamStateList: [],        // 队伍状态列表
                teamList: [],   // 队伍列表
                coachList: [],  // 教练列表
                bigProList: [], // 大项列表

                // 大项表单
                bigProjectForm: {
                    id: null,
                    name: null,           // 名称
                    bigProjectState: null // 大项状态
                },
                // 职位表单
                positionForm: {
                    id: null,
                    name: null,         // 名称
                    positionState: null // 职位状态
                },

                // 队伍表单
                teamForm: {
                    id: null,
                    name: null,
                    teamState: null,
                    coach: null,      // 教练
                    parentPro: null   // 隶属大项
                }
            }
        },

        props: {
            typeName: {  // 引用搜索组件的父组件
                type: String
            }
        },

        methods: {
            // 搜索
            handleFilter() {
                let formName;
                if(this.typeName==='bigPro') {
                    formName = 'bigProjectForm';
                } else if(this.typeName==='position') {
                    formName = 'positionForm';
                } else {
                    formName = 'teamForm';
                }
                this.$emit('handleFilter', this[formName])
            }
        }
    })
</script>
