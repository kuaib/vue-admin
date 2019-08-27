<!--运动员  测试指标变化趋势图(折线图)-->
<template>
    <div>
        <!--条件-->
        <el-row>
            <el-row :gutter="20">
                <el-col :span="3">条件一：</el-col>
                <el-col :span="7">
                    <el-date-picker
                            v-model="date"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="请选择日期">
                    </el-date-picker>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>
