<template>
    <div>
        <el-table
                :data="list"
                :span-method="objectSpanMethod"
                border
                style="width: 100%; margin-top: 20px">
<!--            <el-table-column label="序号"-->
<!--                             type="index"-->
<!--                             width="50">-->
<!--            </el-table-column>-->
            <el-table-column
                    prop="athleteName"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="stageDate"
                    label="时间">
            </el-table-column>
            <el-table-column
              v-for="(val,i) in configHeader"
              :key="i"
              :prop="val.props"
              :label="val.label">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {monthFilePreview} from '@/api/attendance'
    export default {
        data() {
            return {
                list: [],
                dateLength: 0,
                configHeader:[]
            }
        },
        created() {
            this.previewItem()
        },
        methods: {
            // 预览
            previewItem() {
                monthFilePreview({
                    coachId: this.$route.query.coachId,
                    projectId: this.$route.query.projectId,
                    attDate: this.$route.query.attDate,
                }).then(res => {
                    if(res.data.code == 200) {
                        this.list = this.formatList(res.data.data);
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                })
            },

            // 合并行的的函数
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
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

            // 重组数据
            formatList(list) {
                let arr = [];
                list.forEach((item, idx) => {
                    if(item.details && item.details.length > 0) {
                        item.details.forEach(child => {
                            this.dateLength = child.previewDetailText.length;
                            let tempObj = {};
                            for(let i = 0; i < child.previewDetailText.length; i++) {
                                tempObj[i+1] = child.previewDetailText[i];
                            }
                            let obj = {
                                athleteId: item.athleteId,
                                athleteName: item.athleteName
                            };

                            obj = Object.assign(obj, child, tempObj);
                            arr.push(obj);
                        })
                    }
                });


                // 形成表头
                for(let i = 0; i < this.dateLength; i++) {
                    let headItem = {
                        props: (i+1).toString(),
                        label : (i+1).toString()
                    }
                    this.configHeader.push(headItem)
                }

                return arr;
            },

        }
    }
</script>
