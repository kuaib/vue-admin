<template>
    <div>
        <div class="filter-container">
            <el-row class="clearfix">
                <div class="left">
                    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="搜索" v-model="listQuery.searchKey">
                    </el-input>
                    <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                </div>
                <div class="right">
                    <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="toManage">新建运动员</el-button>
                    <el-button class="filter-item" type="primary">自定义表格</el-button>
                    <el-button class="filter-item" type="primary">导出表格</el-button>
                </div>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-select clearable class="filter-item" v-model="listQuery.categoryId" placeholder="请选择队伍"
                               @change="handleChange(listQuery.categoryId,'category')">
                        <el-option v-for="item in cateList" :label="item.dicValue" :value="item.dicKey"
                                   :key="item.dicKey"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select clearable class="filter-item" v-model="listQuery.specialId" placeholder="请选择专项"
                               @change="handleChange(listQuery.specialId,'special')">
                        <el-option v-for="item in specialList" :label="item.dicValue" :value="item.dicKey"
                                   :key="item.dicKey"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select clearable class="filter-item" v-model="listQuery.gender" placeholder="请选择性别"
                               @change="handleChange(listQuery.genderId,'gender')">
                        <el-option v-for="item in genderList" :label="item.dicValue" :value="item.dicKey"
                                   :key="item.dicKey"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select clearable class="filter-item" v-model="listQuery.organizationId" placeholder="请选择单位"
                               @change="handleChange(listQuery.organizationId,'organization')">
                        <el-option v-for="item in orgList" :label="item.dicValue" :value="item.dicKey"
                                   :key="item.dicKey"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select clearable class="filter-item" v-model="listQuery.provinceId" placeholder="请选择省份"
                               @change="handleChange(listQuery.provinceId,'provinces')">
                        <el-option v-for="item in provincesList" :label="item.dicValue" :value="item.dicKey"
                                   :key="item.dicKey"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select clearable class="filter-item" v-model="listQuery.risk" placeholder="请选择损伤风险">
                        <el-option v-for="item in riskOptions" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
        </div>

        <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                  style="width: 100%;min-height:1000px;">
            <el-table-column align="center" label="录入数据">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')"><i class="el-icon-plus"></i></el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('allAthlete.name')">
                <template slot-scope="scope">
                    <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('allAthlete.special')">
                <template slot-scope="scope">
                    <span>{{scope.row.author}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('allAthlete.sex')">
                <template slot-scope="scope">
                    <span style='color:red;'>{{scope.row.reviewer}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('allAthlete.age')">
                <template slot-scope="scope">
                    <svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('allAthlete.height')">
                <template slot-scope="scope">
                    <span v-if="scope.row.pageviews" class="link-type">{{scope.row.pageviews}}</span>
                    <span v-else>0</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('allAthlete.tel')">
                <template slot-scope="scope">
                    <span v-if="scope.row.pageviews" class="link-type">{{scope.row.pageviews}}</span>
                    <span v-else>0</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('allAthlete.wx')">
                <template slot-scope="scope">
                    <span v-if="scope.row.pageviews" class="link-type">{{scope.row.pageviews}}</span>
                    <span v-else>0</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini"><router-link :to="{path: '/athleteManage/edit',query: {id:scope.row.id}}"><i class="el-icon-edit"></i></router-link></el-button>
                    <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')"><i class="el-icon-delete"></i></el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
    import { getAllDic } from '@/api/common'
    import waves from '@/directive/waves' // 水波纹指令
    import { parseTime } from '@/utils'

    export default {
        name: 'complexTable',
        directives: {
            waves
        },
        data() {
            return {
                cateList: [],  // 队伍
                specialList: [],   // 专项
                genderList: [{dicKey: '1', dicValue: '男'},{dicKey: '2', dicValue: '女'}], // 性别
                orgList: [],       // 单位
                provincesList: [],      // 省份
                riskOptions: ['a','b'], // 损伤风险


                list: null,         // table列表
                total: null,        // 总条目数
                listLoading: true,  // 查询table的loading
                listQuery: {
                    page: 1,
                    limit: 20,
                    searchKey: '',
                    category: '',
                    specialId: '',
                    genderId: '',
                    organizationId: '',
                    provinceId: '',
                    risk: '',
                }
            }
        },

        created() {
            this.getSelectList();
            this.getList()
        },
        methods: {
            // 获取下拉选项
            getSelectList() {
                getAllDic().then(res => {
                    if (res.data.code === 200) {
                        const data = res.data.data;
                        this.cateList = data.cateList;
                        this.specialList = data.specialList;
                        this.orgList = data.orgList;
                        this.coachList = data.coachList;
                        this.provincesList = data.provincesList;
                    } else {
                        this.$message(res.data.msg);
                    }
                }).catch(rej => {
                    console.log('获取失败')
                })
            },

            // 获取运动员列表
            getList() {
                this.listLoading = true
                fetchList(this.listQuery).then(response => {
                    this.list = response.data.items
                    this.total = response.data.total

                    // Just to simulate the time of the request
                    setTimeout(() => {
                        this.listLoading = false
                    }, 1.5 * 1000)
                })
            },

            // 点击搜索
            handleFilter() {
                this.listQuery.page = 1
                this.getList()
            },

            // 改变每页显示条目数
            handleSizeChange(val) {
                this.listQuery.limit = val
                this.getList()
            },

            // 跳转到指定页数
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },

            // 删除
            handleModifyStatus(row, status) {
                this.$message({
                    message: '操作成功',
                    type: 'success'
                })
                row.status = status
            },

            // 跳转运动员维护页面
            toManage() {
                this.$router.push('/athleteManage/manage');
            },

            // 改变下拉选项
            handleChange(val, type) {
                // let obj = {};
                // if (type === 'category') {
                //     obj = this.arrToObj(this.cateList);
                //     this.form.categoryName = obj[val];
                // } else if (type === 'special') {
                //     obj = this.arrToObj(this.specialList);
                //     this.form.specialName = obj[val];
                // } else if (type === 'organization') {
                //     obj = this.arrToObj(this.orgList);
                //     this.form.organizationName = obj[val];
                // } else if(type === 'coach') {
                //     obj = this.arrToObj(this.coachList);
                //     this.form.coachName = obj[val];
                // } else if(type === 'provinces') {
                //     obj = this.arrToObj(this.provincesList);
                //     this.form.coachName = obj[val];
                // } else if(type === 'gender') {
                //     obj = this.arrToObj(this.genderList);
                //     this.form.coachName = obj[val];
                // }
            },
            // 转换数组集合(方便快速找出key对应的value)
            arrToObj(arrList) {
                return arrList.reduce((acc, cur) => {
                    acc[cur.dicKey] = cur.dicValue;
                    return acc
                }, {})
            },
        }
    }
</script>
