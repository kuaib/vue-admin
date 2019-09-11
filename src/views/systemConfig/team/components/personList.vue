<template>
    <el-table :data="list" border fit highlight-current-row
              style="width: 100%;" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column align="center" label="人员id">
            <template slot-scope="scope">
                <span>{{scope.row.staffId}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="职位">
            <template slot-scope="scope">
                <span>{{scope.row.jobName}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="级别">
            <template slot-scope="scope">
                <span>{{scope.row.jobLevel}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="姓名">
            <template slot-scope="scope">
                <span>{{scope.row.staffName}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="年龄">
            <template slot-scope="scope">
                <span>{{scope.row.age}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
            <template slot-scope="scope">
                <div class="act-btns">
                    <span @click="toDetail(scope.row)" class="act">详情</span>
                    <span> | </span>
                    <span @click="removeRelation(scope.row)" class="act">解除关联</span>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        props: {
            list: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            types: {  // 类型
                type: String
            }
        },
        methods: {
            // 点击详情
            toDetail(row) {
                this.$emit('toDetail', row, this.types)
            },

            // 点击解除关联
            removeRelation(row) {
                this.$emit('removeRelation', row, this.types)
            },
        },
        watch: {
            types: function(val) {
                console.log(val)
                console.log(1)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .act-btns {
        span {
            color: #409EFF;
        }
        .act {
            cursor: pointer;
        }
    }
</style>
