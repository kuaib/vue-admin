<template>
    <div>
        <!--运动员测试指标变化趋势图-->
        <athlete-charts></athlete-charts>

        <!--运动队测试指标变化趋势图-->
        <team-charts></team-charts>

        <!--运动员测试指标对比图-->
        <!--<athlete-target-chart></athlete-target-chart>-->
    </div>
</template>

<script>
    import athleteCharts  from './components/athleteCharts'
    import teamCharts  from './components/teamCharts'
    import athleteTargetChart from './components/athleteTargetChart'

    export default {
        components: {athleteCharts, teamCharts, athleteTargetChart},
        data() {
            return {

            }
        }
    }
</script>
