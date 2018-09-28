<template>
    <div class="athlete-test">
        <el-row class="row-item">
            <el-col :span="6">
                <el-select v-model="testItemId" placeholder="请选择测试项目 Choose Test Item"
                           @change="handleChange">
                    <el-option v-for="item in testItem" :label="item.dicValue" :value="item.dicKey"
                               :key="item.dicKey"></el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row class="row-item">
            <el-row>
                <el-col>
                    <h3>I.落地之前</h3>
                    <div class="dataTable">
                        <ul>
                            <li>
                                <p></p>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
        </el-row>
        <el-row>
            <el-button class="filter-item" type="primary">完成全部测试</el-button>
        </el-row>
    </div>
</template>

<script>
    export default ({
        data() {
            return {
                testItemId: '', // 当前选中的项目
                testItem: [
                    {dicKey: 1, dicValue: 'NC-LESS'},
                    {dicKey: 2, dicValue: 'NC-Double Squat'},
                    {dicKey: 3, dicValue: 'NC-Single Squat'},
                    {dicKey: 4, dicValue: 'COC-Single Squat'}
                ],   // 测试项目
            }
        },

        methods: {
            // 改变测试项目
            handleChange() {

            }
        }
    })
</script>

<style lang="scss">
    .athlete-test {
        .row-item {
            margin-bottom: 15px;
        }
    }
</style>