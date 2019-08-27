<template>
    <div>
        <athlete-charts></athlete-charts>
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
