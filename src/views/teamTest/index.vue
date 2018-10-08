<template>
    <div>
        <el-row :gutter="40">
            <el-col :span="6">
                <athleteOfTeam @getAthleteInfo="getAthleteInfo"></athleteOfTeam>
            </el-col>
            <el-col :span="18">
                <athleteOfTeamTest></athleteOfTeamTest>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import athleteOfTeam from './components/athleteOfTeam'
    import athleteOfTeamTest from './components/athleteOfTeamTest'
    export default ({
        components: {athleteOfTeam, athleteOfTeamTest},
        data() {
            return {
                athleteRow: null       // 当前选中的运动员
            }
        },
        methods: {
            getAthleteInfo() {
                this.athleteRow = row;
            }
        }
    })
</script>