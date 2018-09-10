<template>
  <div>
    <div class="filter-container">
      <el-row class="clearfix">
        <div class="left">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入查询条件" v-model="listQuery.keyWord">
          </el-input>
          <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
        </div>
        <div class="right">
          <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="toCreateTeam">新建队伍</el-button>
          <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="toCreateMember">新建队员</el-button>
        </div>
      </el-row>
    </div>

    <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;">
      <el-table-column sortable align="center" label="队名">
        <template slot-scope="scope">
          <router-link tag="div" :to="{path: '/',query:{id: scope.row.id}}">{{scope.row.teamName}}</router-link>
        </template>
      </el-table-column>
      <el-table-column sortable align="center" label="专项">
        <template slot-scope="scope">
          <span>{{scope.row.specialName}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable align="center" label="级别">
        <template slot-scope="scope">
          <span>{{scope.row.categoryName}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable align="center" label="单位">
        <template slot-scope="scope">
          <span>{{scope.row.organizationName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini"><router-link :to="{path: '/teamManage/edit',query: {id:scope.row.id}}"><i class="el-icon-edit"></i></router-link></el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"><i class="el-icon-delete"></i></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.current" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
  import { getTeamList, deleteTeam } from '@/api/team'
  import waves from '@/directive/waves' // 水波纹指令

  export default {
    name: 'complexTable',
    directives: {
      waves
    },
    data() {
      return {
        list: null,         // table列表
        total: null,        // 总条目数
        listLoading: true,  // 查询table的loading
        listQuery: {
          current: 1,
          pageSize: 10,
          keyWord: ''
        }
      }
    },

    created() {
      this.getList()
    },
    methods: {
      aaa() {
        alert(34343)
      },
      // 获取列表
      getList() {
        this.listLoading = true;
        getTeamList(this.listQuery.current, this.listQuery.pageSize, this.listQuery.keyWord).then(res => {
            this.listLoading = false;
            if(res.code === '200') {
                this.list = res.data.list;
                this.total = res.data.pagination.total;
                this.listQuery.pageSize = res.data.pagination.pageSize;
                this.listQuery.current = res.data.pagination.current;
            } else {
                this.$message(res.msg);
            }
        }).catch(rej => {
            console.log('获取队伍列表失败')
        })
        // fetchList(this.listQuery).then(response => {
        //   this.list = response.data.items
        //   this.total = response.data.total
        //
        //   // Just to simulate the time of the request
        //   setTimeout(() => {
        //     this.listLoading = false
        //   }, 1.5 * 1000)
        // })
      },

      // 删除队伍
      handleDelete(row) {
        this.listLoading = true;
        deleteTeam(row.id).then(res => {
          this.listLoading = false;
          this.$message(res.msg)
        }).catch((rej) => {
          this.listLoading = false;
          console.log('删除失败');
        })
      },

      // 点击搜索
      handleFilter() {
        this.listQuery.current = 1;
        this.getList()
      },

      // 跳转新增队伍
      toCreateTeam() {
        this.$router.push('/teamManage/createTeam');
      },
      // 跳转新增队员
      toCreateMember() {
        this.$router.push('/teamManage/createMember');
      },

      // 改变每页显示条目数
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.getList()
      },

      // 跳转到指定页数
      handleCurrentChange(val) {
        this.listQuery.current = val
        this.getList()
      },
    }
  }
</script>
