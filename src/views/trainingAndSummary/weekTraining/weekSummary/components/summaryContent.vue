<template>
    <div class="week-summary-content-wrapper">
        <el-form :model="baseForm" ref="baseForm" label-width="200px">
            <el-row :gutter="20">
                <el-col>
                    <el-form-item label="当日队伍整体训练总结：" prop="summary">
                        <el-input type="textarea" v-model="baseForm.summary" placeholder="请输入当日队伍整体训练总结"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col>
                    <el-form-item label="当日表现最佳运动员：" prop="bestAthlete">
                        <el-input type="textarea" v-model="baseForm.bestAthlete" placeholder="请输入当日表现最佳运动员"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <el-row>
            <div style="font-size:14px;margin-bottom: 10px;color:#606266">伤病备注</div>
            <el-table :data="remarkList" border fit highlight-current-row
                      style="width: 100%;">
                <el-table-column align="center" label="伤病人员">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="伤病原因及病症">
                    <template slot-scope="scope">
                        <span>{{scope.row.reason}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="康复情况">
                    <template slot-scope="scope">
                        <span>{{scope.row.detail}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="运动员等级">
                    <template slot-scope="scope">
                        <span>{{scope.row.level}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <div class="add-btn">
                            <span @click="handleDel(scope.$index, 'remarkList')">删除</span>
                            <span> | </span>
                            <span @click="addRow(scope.row, scope.$index)">编辑</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-row class="add-btn"><span @click="addRow">添加</span></el-row>
        </el-row>

        <summary-content-add ref="summaryContentAdd" @showItem="showItem"></summary-content-add>
    </div>
</template>

<script>
    import summaryContentAdd from './summaryContentAdd'
    export default {
        components: {summaryContentAdd},
        data() {
            return {
                baseForm: {
                    summary: null,
                    bestAthlete: null
                },

                remarkList: []
            }
        },

        methods: {
            // 反显行数据
            showItem(addForm, idx) {
                if(typeof idx === 'number') {
                    this.remarkList[idx] = addForm;
                } else {
                    this.remarkList.push(addForm);
                }
            },

            // 添加 / 编辑 行
            addRow(row, idx) {
                if(typeof idx === 'number') {
                    row = JSON.parse(JSON.stringify(row));
                }
                this.$refs.summaryContentAdd.addRow(row, idx);
            },

            // 删除一条表格行
            handleDel(index, tableName) {
                this[tableName].splice(index, 1)
            }
        }
    }
</script>

<style lang="scss">
    .week-summary-content-wrapper {
        .el-table__empty-block {
            display: none;
        }
        .add-btn {
            margin: 15px auto;
            color: #409EFF;
            text-align: center;
            span {
                cursor: pointer;
            }
        }
    }
</style>