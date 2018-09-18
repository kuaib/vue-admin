<template>
    <div>
        <!--顶部按钮和搜素-->
        <div class="filter-container">
            <el-row class="clearfix">
                <div class="left">
                    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="搜索" v-model="listQuery.searchKey">
                    </el-input>
                    <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                </div>
                <div class="right">
                    <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="toManage">新建运动员</el-button>
                    <el-button class="filter-item" type="primary" @click="designTable = true">自定义表格</el-button>
                    <el-button class="filter-item" type="primary">导出表格</el-button>
                </div>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-select clearable class="filter-item" v-model="listQuery.teamId" placeholder="请选择队伍"
                               @change="handleChange(listQuery.teamId,'team')">
                        <el-option v-for="item in teamList" :label="item.teamName" :value="item.teamId"
                                   :key="item.teamId"></el-option>
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
                    <el-select clearable class="filter-item" v-model="listQuery.risk" placeholder="请选择损伤分数范围">
                        <el-option v-for="item in riskList" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
        </div>

        <!--表格-->
        <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                  style="width: 100%">
            <el-table-column align="center" label="录入数据" width="50">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="enteringData(scope.row)" style="width:30px;padding:7px 0"><i class="el-icon-plus"></i></el-button>
                </template>
            </el-table-column>
            <el-table-column align="center"  v-if="item.isShow" v-for="item in tableTitle"
                             :key="item.id"
                             :label="item.title"
                             :width="item.columnName==='gender' || item.columnName==='age' || item.columnName==='height'?60
                             :item.columnName==='views'?100:''">
                <template slot-scope="scope">
                    <el-button v-if="item.columnName==='views'" @click="goToDetail(scope.row.id)">进入</el-button>
                    <span v-else>{{scope.row[item.columnName]}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作" width="130">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini"><router-link :to="{path: '/athleteManage/manage',query: {id:scope.row.id}}"><i class="el-icon-edit"></i></router-link></el-button>
                    <el-button size="mini" type="danger" @click="deleteData(scope.row)"><i class="el-icon-delete"></i></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="listQuery.current" :page-sizes="[10,20,30, 50]"
                           :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
        </div>

        <!--动态定义表格弹窗-->
        <column-dialog :designTable="designTable" @canncelAct="canncelAct" @sureAct="sureAct"></column-dialog>
    </div>
</template>

<script>
    // import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
    import { getAllDic } from '@/api/common'
    import { getAthleteList } from '@/api/athlete'
    import { getTeamListAll } from '@/api/team'
    import waves from '@/directive/waves' // 水波纹指令
    import columnDialog from './components/columnDialog'


    export default {
        name: 'complexTable',
        directives: {waves},
        components: {columnDialog},
        data() {
            return {
                teamList: [],       // 队伍
                specialList: [],    // 专项
                genderList: [{dicKey: '1', dicValue: '男'},{dicKey: '2', dicValue: '女'}], // 性别
                orgList: [],        // 单位
                provincesList: [],  // 省份
                riskList: ['0-9','10-19','20-29','30-59','60-69','70-79','80-89','90-100'], // 损伤风险


                list: [
                    {id:1,name: '45kg', views: '11', special: '165cm',gender: '男',age: '11',height:'175',telephone:'13333333333',REP:33,ready:45,sleep:'12',score: 80},
                    {id:2,name: '45kg', views: '11', special: '165cm',gender: '男',age: '11',height:'175',telephone:'13333333333',REP:33,ready:45,sleep:'12',score: 80},
                    {id:3,name: '45kg', views: '11', special: '165cm',gender: '男',age: '11',height:'175',telephone:'13333333333',REP:33,ready:45,sleep:'12',score: 80},

                ],         // table列表
                tableTitle: [
                    {title:'姓名',columnName: 'name',isShow: true},
                    {title:'运动员看板',columnName: 'views',isShow: true},
                    {title:'专项',columnName: 'special',isShow: true},
                    {title:'性别',columnName: 'gender',isShow: true},
                    {title:'年龄',columnName: 'age',isShow: true},
                    {title:'身高',columnName: 'height',isShow: true},
                    {title:'电话',columnName: 'telephone',isShow: true},
                    {title:'自感疲劳PRE',columnName: 'REP',isShow: true},
                    {title:'准备度',columnName: 'ready',isShow: true},
                    {title:'睡眠',columnName: 'sleep',isShow: true},
                    {title:'损伤分数',columnName: 'score',isShow: true}
                ],

                total: null,        // 总条目数
                listQuery: {
                    current: 1,
                    pageSize: 10,
                    searchKey: null,
                    teamId: null,       // 通过队伍查询队员的时候使用，队伍id
                    specialId: null,
                    genderId: null,
                    organizationId: null,
                    provinceId: null,
                    risk: null,
                },

                listLoading: false,  // 查询table的loading
                designTable: false,  // 是否弹出定义表格弹窗
            }
        },
        created() {
            if(this.$route.query.teamId) {
                this.listQuery.teamId = parseInt(this.$route.query.teamId);
            }
            this.getAllTeam();      // 获取队伍下拉
            this.getSelectList();   // 获取其他下拉
            this.getList();     // 获取运动员列表
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
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    console.log('获取失败')
                })
            },

            // 获取所有队伍信息（不分页）
            getAllTeam() {
                getTeamListAll().then(res => {
                    if(res.data.code === 200) {
                        this.teamList = res.data.data;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    console.log('获取队伍列表失败')
                })
            },

            // 获取运动员列表
            getList() {
                this.listLoading = true;
                getAthleteList(this.listQuery.teamId).then(res => {
                    this.listLoading = false;
                    if(res.data.code === 200) {
                        if(res.data.data && res.data.data.length > 0) {
                            this.list = res.data.data;
                        }
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    this.listLoading = false;
                    console.log('获取运动员列表失败');
                })
            },

            // 删除数据行
            deleteData(row) {
                this.$confirm('确定删除 ' + row.name + ' 这名运动员吗?', '删除运动员', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    // 删除接口
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {

                });
            },


            // 点击搜索
            handleFilter() {
                this.listQuery.current = 1;
                this.getList()
            },

            // 改变每页显示条目数
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList()
            },

            // 跳转到指定页数
            handleCurrentChange(val) {
                this.listQuery.current = val;
                this.getList()
            },

            // 跳转录入数据页面
            enteringData(row, status) {
                // this.$router.push('/athleteManage/')
            },

            // 跳转运动员维护页面
            toManage() {
                if(this.$route.query.teamId && this.listQuery.teamId) {
                    let teamName = this.arrToObj(this.teamList)[this.listQuery.teamId];
                    this.$router.push({path:'/athleteManage/manage',query:{teamId: this.listQuery.teamId, teamName: teamName}});
                } else {
                    this.$router.push('/athleteManage/manage');
                }
            },

            // 跳转至看板
            goToDetail(id) {
                // this.$router.push({path: '/athleteManage/manage', query: {id: id}});
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
            // 转换队伍数组
            arrToObj(arrList) {
                return arrList.reduce((acc, cur) => {
                    acc[cur.teamId] = cur.teamName;
                    return acc
                }, {})
            },

            // 取消定义表格弹窗
            canncelAct() {
                this.designTable = false;
            },
            // 确定定义表格弹窗
            sureAct(data) {
                this.designTable = false;
            }
        }
    }
</script>

<style lang="scss">
    .main-title .el-dialog__title {
        font-size: 20px;
        font-weight: 700;
    }
    .title {
        margin-bottom: 15px;
        span{
            font-size: 16px;
            font-weight: 700;
        }
    }

    .check-item {
        display: block !important;
        margin-left: 0 !important;
    }
</style>
