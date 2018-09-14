<template>
    <div>
        <el-table :data="tableData"  border fit highlight-current-row
                  style="width: 100%;min-height:1000px;">
            <el-table-column align="center"  v-if="item.isShow" v-for="item in tableTitle" :label="item.title">
                <template slot-scope="scope">
                    <span>{{scope.row[item.columnName]}}</span>
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
                    {weight: '45kg', age: '11', height: '165cm'},
                    {weight: '50kg', age: '22', height: '145cm'},
                    {weight: '55kg', age: '33', height: '170cm'}
                ],
                tableTitle: [
                    {title:'体重',columnName: 'weight',isShow: true},
                    {title:'年龄',columnName: 'age',isShow: true},
                    {title:'身高',columnName: 'height',isShow: false}
                ]
            }
        },
        methods: {

        }
    })
</script>
