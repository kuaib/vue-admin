<template>
    <div>
        <div class="filter-container">
            <el-row class="clearfix">
                <div class="left">
                    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.title')" v-model="listQuery.searchKey">
                    </el-input>
                    <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
                </div>
                <div class="right">
                    <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="toCreate">{{$t('table.add')}}</el-button>
                    <el-button class="filter-item" type="primary">基础信息</el-button>
                    <el-button class="filter-item" type="primary">日常监测&损伤风险</el-button>
                </div>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-select clearable class="filter-item" v-model="listQuery.ranks" placeholder="请选择队伍">
                        <el-option v-for="item in ranksOptions" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select clearable class="filter-item" v-model="listQuery.special" placeholder="请选择专项">
                        <el-option v-for="item in specialOptions" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select clearable class="filter-item" v-model="listQuery.sex" placeholder="请选择性别">
                        <el-option v-for="item in sexOptions" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select clearable class="filter-item" v-model="listQuery.company" placeholder="请选择单位">
                        <el-option v-for="item in companyOptions" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select clearable class="filter-item" v-model="listQuery.province" placeholder="请选择省份">
                        <el-option v-for="item in provinceOptions" :key="item" :label="item" :value="item">
                        </el-option>
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
            <el-table-column align="center" :label="$t('commonwords.edit')">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini"><router-link :to="{path: '/allAthlete/edit',query: {id:scope.row.id}}"><i class="el-icon-edit"></i></router-link></el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('commonwords.delete')">
                <template slot-scope="scope">
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
    import waves from '@/directive/waves' // 水波纹指令
    import { parseTime } from '@/utils'

    export default {
        name: 'complexTable',
        directives: {
            waves
        },
        data() {
            return {
                ranksOptions: [1,2,3],  // 队伍
                specialOptions: [11,22,33],     // 专项
                sexOptions: [111,222,333],  // 性别
                companyOptions: [1111,2222,3333,4444], // 单位
                provinceOptions: [11111,22222,33333],   // 省份
                riskOptions: ['a','b'], // 损伤风险


                list: null,         // table列表
                total: null,        // 总条目数
                listLoading: true,  // 查询table的loading
                listQuery: {
                    page: 1,
                    limit: 20,
                    searchKey: '',
                    ranks: '',
                    special: '',
                    sex: '',
                    company: '',
                    province: '',
                    risk: '',
                }
            }
        },

        created() {
            this.getList()
        },
        methods: {
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

            // 跳转新增页
            toCreate() {
                this.$router.push('/allAthlete/create');
            }
        }
    }
</script>
