<template>
    <div>
        <!--<el-table-->
                <!--:data="tableData6"-->
                <!--:span-method="objectSpanMethod"-->
                <!--border-->
                <!--style="width: 100%; margin-top: 20px">-->
            <!--<el-table-column label="序号"-->
                    <!--type="index"-->
                    <!--width="50">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="id"-->
                    <!--label="ID"-->
                    <!--width="180">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="name"-->
                    <!--label="姓名">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="amount1"-->
                    <!--label="数值 1（元）">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="amount2"-->
                    <!--label="数值 2（元）">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="amount3"-->
                    <!--label="数值 3（元）">-->
            <!--</el-table-column>-->
        <!--</el-table>-->
        <el-table
                :data="myList"
                :span-method="objectSpanMethod"
                border
                style="width: 100%; margin-top: 20px">
            <!--<el-table-column label="序号"-->
                             <!--type="index"-->
                             <!--width="50">-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="athleteName"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="stage"
                    label="时间">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        props: {
            list: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data() {

            return {
                myList: [],
                arr1: [],
                tableData6: [{
                    id: '12987122',
                    name: '王小虎',
                    amount1: '234',
                    amount2: '3.2',
                    amount3: 10
                }, {
                    id: '12987123',
                    name: '王小虎',
                    amount1: '165',
                    amount2: '4.43',
                    amount3: 12
                }, {
                    id: '12987124',
                    name: '王小虎',
                    amount1: '324',
                    amount2: '1.9',
                    amount3: 9
                }, {
                    id: '12987125',
                    name: '王小虎',
                    amount1: '621',
                    amount2: '2.2',
                    amount3: 17
                }, {
                    id: '12987126',
                    name: '王小虎',
                    amount1: '539',
                    amount2: '4.1',
                    amount3: 15
                }]
            }
        },
        methods: {
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                console.log(rowIndex + "*****" + columnIndex + "****" + row.athleteName + "***" + + row.stage)
                // console.log(columnIndex)
                // if (columnIndex === 0) {
                //     if (rowIndex % 2 === 0) {
                //         return {
                //             rowspan: 2,
                //             colspan: 1
                //         };
                //     } else {
                //         return {
                //             rowspan: 0,
                //             colspan: 0
                //         };
                //     }
                // }

                // if (rowIndex != -1) {
                //     if (columnIndex === 0 || columnIndex === 1) {
                //         console.log("需要处理的行和列" + rowIndex + "***" + columnIndex + "****" + row.stage)
                //         return [3, 1];
                //     }
                //     // else {
                //     //     return [0, 0];
                //     // }
                // }

                // if (rowIndex != 0) {
                //     return []
                // }

                // if (columnIndex === 0 || columnIndex === 1) {
                //     if (row.idx === this.myList[rowIndex].idx) {
                //         return {
                //             rowspan: this.arr1[rowIndex],
                //             colspan: this.arr1[rowIndex] > 0 ? 1 : 0
                //         };
                //     } else {
                //         return {
                //             rowspan: 0,
                //             colspan: 0
                //         };
                //     }
                // }

                if (columnIndex === 0) {
                    if (rowIndex %3 ===0 ) {
                        return {
                            rowspan: 3,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            },

            formatList(list) {
                let arr = [];
                list.forEach((item, idx) => {
                    if(item.details && item.details.length > 0) {
                        item.details.forEach(child => {
                            let obj = {
                                athleteId: item.athleteId,
                                athleteName: item.athleteName,
                                idx: idx
                            };
                            obj = Object.assign(obj, child);
                            arr.push(obj);
                        })
                        this.arr1.push(item.details.length);
                    } else {
                        this.arr1.push(0);
                    }
                });
                console.log(this.arr1)
                console.log(arr)
                this.myList = arr;
            }
        },

        watch: {
            list: function(val) {
                if(val.length > 0) {
                    this.formatList(val);
                }
            }
        }
    }
</script>
