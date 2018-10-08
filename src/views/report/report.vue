<template>
    <div>
        <h3>报告输出 Report Export</h3>
        <el-row>
            <el-select clearable v-model="teamId" placeholder="请选择队伍 Select Team">
                <el-option v-for="item in teamList" :label="item.teamName" :value="item.teamId"
                           :key="item.teamId"></el-option>
            </el-select>
        </el-row>
    </div>
</template>

<script>
    export default ({
        data() {
            return {

            }
        },
        methods: {

        }
    })
</script>