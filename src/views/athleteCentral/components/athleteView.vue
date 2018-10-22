<template>
    <div class="athleteView" v-if="athleteRow">
        <!--<el-row class="row-item">-->
            <!--<div class="img">-->
                <!--<img :src="'/img/'+ athleteRow.photo" alt="">-->
            <!--</div>-->
        <!--</el-row>-->
        <!--<el-row class="row-item">-->
            <!--<div class="name">-->
                <!--<span>{{athleteRow.athleteName}}</span>-->
                <!--<span>{{athleteRow.enAthleteName}}</span>-->
            <!--</div>-->
        <!--</el-row>-->
        <!--<el-row class="row-item">-->
            <!--<div class="orgnization">{{athleteRow.teamName}}</div>-->
        <!--</el-row>-->
        <!--<el-row class="row-item">-->
            <!--<div class="team">{{athleteRow.specialName}}</div>-->
        <!--</el-row>-->
        <!-- 主信息 -->
        <el-row :gutter="20">
            <el-col :span="16" :offset="4">
                <!--基本信息-->
                <el-row :gutter="20" class="mainInfo main-section">
                    <div class="mainTitle">基本信息</div>
                    <el-col :span="6">
                        <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1540192245&di=2d8f72d2cc24cc34e8c716bab9549e45&src=http://img18.3lian.com/d/file/201710/23/cebbf66c583b2c2e31165f5c7b86c088.jpg" />
                    </el-col>
                    <el-col :span="18">
                        <el-row class="athlete-item">
                            <p class="left">姓名：<span>地方大幅度</span></p>
                            <p class="right">测试时间：<span>2018-01-03</span></p>
                        </el-row>
                        <el-row>
                            <p class="athlete-item">性别：<span>男</span></p>
                            <p class="athlete-item">生日：<span>2002-0809</span></p>
                            <p class="athlete-item">年龄：<span>23</span></p>
                            <p class="athlete-item">运动项目：<span>皮划艇</span></p>
                            <p class="athlete-item">所在队伍：<span>队伍一</span></p>
                        </el-row>
                    </el-col>
                </el-row>

                <!-- 概览 -->
                <el-row :gutter="20" class="overview">
                    <div class="mainTitle">概 览</div>

                    <!-- 分数 -->
                    <div class="scoreBar main-section">
                        <div class="subTitle">总分</div>
                        <div class="content clearfix">
                            <p class="green item-bar">
                                <i class="one">0</i>
                                <span>
                                <span class="top tuch">3</span>
                                <span class="bottom tuch"></span>
                            </span>
                            </p>
                            <p class="yellow item-bar">
                                <i class="one">5</i>
                                <i class="two">9</i>
                                <span>
                                <span class="top tuch">7</span>
                                <span class="bottom tuch"></span>
                            </span>
                            </p>
                            <p class="red item-bar">
                                <i class="two">22</i>
                                <span>
                                <span class="top tuch">15</span>
                                <span class="bottom tuch"></span>
                            </span>
                            </p>
                        </div>
                    </div>

                    <!-- 错误动作 -->
                    <div class="wrongAct main-section">
                        <div class="subTitle">错误动作 Movement Errors</div>
                        <table>
                            <tbody>
                            <tr>
                                <td>屈膝不足</td>
                                <td>Keen Flexion at Initial Contact</td>
                                <td>L</td>
                            </tr>
                            <tr>
                                <td>屈髋不足</td>
                                <td>Hip Flexion at Initial Contact</td>
                                <td>Both</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- 神经肌肉分析 -->
                    <div class="neuromuscular main-section">
                        <div class="subTitle">神经肌肉分析 Neuromuscular Analysis</div>
                        <dl>
                            <dt>
                                <p>力输出可能较低的肌肉</p>
                                <p>Muscles with Probable low Force Output</p>
                            </dt>
                            <dd><i></i>股四头肌 Quadriceps</dd>
                            <dd><i></i>臀大肌 Gluteus Maximus</dd>
                            <dd><i></i>腘绳肌 Hamstrings</dd>
                        </dl>

                        <dl>
                            <dt>
                                <p>可能活动受限的关节</p>
                                <p>Joint Motion with Probale Restriction</p>
                            </dt>
                            <dd><i></i>屈髋 Hip Flexion</dd>
                        </dl>

                        <dl>
                            <dt>
                                <p>灵活性可能较差的肌肉</p>
                                <p>Muscles with Probale low Flexibility</p>
                            </dt>
                            <dd><i></i>股二头肌 Biceps Femoris</dd>
                            <dd><i></i>半膜肌/半肌腱 Semimembranosis/Semitendinosis</dd>
                        </dl>
                    </div>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import bus from '@/utils/bus.js'
    export default ({
        data() {
            return {
                athleteRow: null,    // 运动员行信息
            }
        },
        created() {
            // this.initData();
        },
        mounted() {
            bus.$on('getAthleteInfo', (row) => {
                this.athleteRow = row;
            })
        },
        methods: {
            initData() {
                aaa().then(res => {
                    if(res.data == 200) {

                    }
                })
            }
        },
        watch: {
            athleteRow: function (val) {
                console.log('---------------')
                console.log(val)
            }
        }
    })
</script>

<style lang="scss">
    @import '../../../styles/index.scss';
    .athleteView {
        .mainTitle {
            font-size: 18px;
            text-align: center;
            margin-bottom: 20px;
            color: $blue;
            font-weight: 700;
        }
        .main-section {
            margin-bottom: 20px;
        }

        /*基本信息*/
        .mainInfo {
            img {
                width: 100%;
            }
            .athlete-item {
                margin-bottom: 10px;
            }
        }

        /*概览*/
        .overview {
            .subTitle {
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 15px;
            }
            .scoreBar {
                margin-bottom: 40px;
                .content {
                    margin-top: 60px;
                    .green {
                        background: #71ad49;
                        width: 30%;
                        .tuch {
                            background: #71ad49;
                        }
                    }
                    .yellow {
                        background: #fdc100;
                        width: 20%;
                        .tuch {
                            background: #fdc100;
                        }
                    }
                    .red {
                        background: #bf0100;
                        width: 50%;
                        .tuch {
                            background: #bf0100;
                        }
                    }
                    .item-bar {
                        float: left;
                        height: 25px;
                        position: relative;
                        .tuch {
                            position: absolute;
                            left: 50%;
                        }
                        .one {
                            left: 0;
                        }
                        .two {
                            right: 0;
                        }
                        .top {
                            width: 30px;
                            height: 30px;
                            line-height: 30px;
                            border-radius: 50%;
                            -moz-border-radius: 50%;
                            -ms-border-radius: 50%;
                            -o-border-radius: 50%;
                            top: -48px;
                            text-align: center;
                            color: #fff;
                            margin-left: -15px;
                        }
                        .bottom {
                            width: 10px;
                            height: 20px;
                            top: -20px;
                            margin-left: -5px;
                        }
                        i {
                            position: absolute;
                            top: 25px;
                        }
                    }
                }
            }

            table {
                width: 100%;
                border: 1px solid #F3EDE9;
                border-collapse: collapse;
            }
            table td {
                border: 1px solid #F3EDE9;
                padding: 10px 0;
                text-align: center;
                color: #333;
            }
            dl {
                padding-bottom: 20px;
                border-bottom: 1px solid #ddd;
                margin-bottom: 20px;
            }
            dl:last-child {
                border: 0;
            }
            dt p {
                font-weight: 700;
                font-size: 14px;
            }
            dt dd {
                color: #333;
            }
            dd i {
                display: inline-block;
                width: 5px;
                height: 5px;
                background: #000;
                border-radius: 50%;
                -moz-border-radius: 50%;
                -ms-border-radius: 50%;
                -o-border-radius: 50%;
                margin-right: 10px;
                position: relative;
                top: -3px;
            }
        }
    }



    .row-item {
        text-align: center;
        margin-bottom: 20px;
        .img {
            width: 160px;
            margin: 0 auto;
            img {
                width: 100%;
            }
        }
        .name {
            font-weight: 700;
            font-size: 20px;
        }
    }
</style>