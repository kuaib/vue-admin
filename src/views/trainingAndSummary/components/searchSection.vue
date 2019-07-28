<template>
    <el-form :model="searchForm" ref="searchForm">
        <el-row :gutter="20" class="search-item">
            <el-col :span="6">
                <el-form-item prop="id">
                    <el-input placeholder="idPlaceholder" v-model="searchForm.id"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item prop="sport">
                    <el-select v-model="searchForm.sport" placeholder="请选择项目 Select Sport">
                        <el-option v-for="item in sportItem" :label="item.dicValue" :value="item.dicKey"
                                   :key="item.dicKey"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item prop="team">
                    <el-select v-model="searchForm.team" placeholder="选择队伍 Select Team">
                        <el-option v-for="item in teamList" :label="item.dicValue" :value="item.dicKey"
                                   :key="item.dicKey"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6" v-if="typeName">
                <el-button type="success" @click="createAct" style="float: right;">{{actBtnName}}</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="search-item">
            <el-col :span="6">
                <el-form-item prop="coach">
                    <el-select v-model="searchForm.coach" placeholder="请选择教练 Select Coach">
                        <el-option v-for="item in coachList" :label="item.dicValue" :value="item.dicKey"
                                   :key="item.dicKey"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item prop="year">
                    <el-select v-model="searchForm.year" placeholder="请选择训练年度 Select Year">
                        <el-option v-for="item in yearList" :label="item.dicValue" :value="item.dicKey"
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
                    <el-button class="search" type="info" v-waves @click="resetForm('searchForm')">重置 Reset</el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
    import mixin from '@/utils/mixins'
    export default ({
        mixins: [mixin],
        props: {
            idPlaceholder: {  // id的placeHolder
                type: String,
                default: '输入ID'
            },
            actBtnName: {  // 操作按钮的名字
                type: String,
                default: '创建'
            },
            typeName: { // 类型名称（年/月/周）
                type: String,
                default: ''
            }
        },
        data() {
            return {
                sportItem: [],  // 项目列表
                teamList: [],   // 队伍列表
                coachList: [],  // 教练列表
                yearList: [],   // 年度列表
                searchForm: {
                    id: '',
                    sport: '',
                    team: '',
                    coach: '',
                    year: ''
                },
            }
        },

        methods: {
            // 如果有创建按钮
            createAct() {
                if(this.typeName === '年') {
                    this.$router.push('/yearTraining/details');
                }
            },

            // 搜索
            handleFilter() {
                this.$emit('handleFilter', this.searchForm)
            }
        }
    })
</script>
