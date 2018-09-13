<template>
    <div>
        <el-table :data="tableData"  border fit highlight-current-row
                  style="width: 100%;min-height:1000px;">
            <el-table-column align="center" v-if="item.isShow" v-for="item in tableTitle" :label="item.text">
                <template slot-scope="scope">
                    <span>{{scope.row[item.name]}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default ({
        data() {
            return {
                tableData: [
                    {name: 'aaa', age: '11', height: '165'},
                    {name: 'bbb', age: '22', height: '145'},
                    {name: 'ccc', age: '33', height: '170'}
                ],
                tableTitle: [
                    {text:'姓名',name: 'name',isShow: true},
                    {text:'年龄',name: 'age',isShow: true},
                    {text:'身高',name: 'height',isShow: false}
                ]
            }
        }
    })
</script>
