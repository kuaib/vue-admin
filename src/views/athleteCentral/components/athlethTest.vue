<template>
    <div class="athlete-test">
        <el-row class="mar-top-15">
            <el-col :span="6">
                <el-select v-model="testItemId" placeholder="请选择测试项目 Choose Test Item"
                           @change="handleChange">
                    <el-option v-for="item in testItem" :label="item.dicValue" :value="item.dicKey"
                               :key="item.dicKey"></el-option>
                </el-select>
            </el-col>
        </el-row>
        <section class="less-test" v-show="testItemId=='less'">
            <el-row :gutter="20" class="mar-top-15">
                <el-col :span="12">
                    <h3>I.初次落地瞬间 Initial Contact
                    </h3>
                    <div class="dataTable">
                        <ul>
                            <li class="clearfix" v-for="(item, idx) in oneList">
                                <div class="left one">
                                    <p class="baseAct"><i>{{idx+1}}.</i>{{item.baseAct}}</p>
                                    <p class="errorAct">{{item.errorAct}}</p>
                                    <p class="china">{{item.china}}</p>
                                </div>
                                <div class="left two">
                                    <p>
                                        <el-radio v-model="item.score" label="1">{{item.noError}}</el-radio>
                                    </p>
                                    <p>
                                        <el-radio v-model="item.score" label="0">{{item.error}}</el-radio>
                                    </p>
                                </div>
                                <div class="left three">
                                    <p v-if="item.left">
                                        <el-radio v-model="item.whichLeg" label="left">{{item.left}}</el-radio>
                                    </p>
                                    <p v-if="item.right">
                                        <el-radio v-model="item.whichLeg" label="right">{{item.right}}</el-radio>
                                    </p>
                                    <p v-if="item.both">
                                        <el-radio v-model="item.whichLeg" label="both">{{item.both}}</el-radio>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="12">
                    <h3>II.屈膝缓冲，屈膝最大时 Maximum Flexion Position
                    </h3>
                    <div class="dataTable">
                        <ul>
                            <li class="clearfix" v-for="(item, idx) in twoList">
                                <div class="left one">
                                    <p class="baseAct"><i>{{idx+oneList.length+1}}.</i>{{item.baseAct}}</p>
                                    <p class="errorAct">{{item.errorAct}}</p>
                                    <p class="china">{{item.china}}</p>
                                </div>
                                <div class="left two" v-if="item.noError">
                                    <p>
                                        <el-radio v-model="item.score" label="0">{{item.noError}}</el-radio>
                                    </p>
                                    <p>
                                        <el-radio v-model="item.score" label="1">{{item.error}}</el-radio>
                                    </p>
                                </div>
                                <div class="left three">
                                    <p v-if="item.left">
                                        <el-radio v-model="item.whichLeg" label="left">{{item.left}}</el-radio>
                                    </p>
                                    <p v-if="item.right">
                                        <el-radio v-model="item.whichLeg" label="right">{{item.right}}</el-radio>
                                    </p>
                                    <p v-if="item.both">
                                        <el-radio v-model="item.whichLeg" label="both">{{item.both}}</el-radio>
                                    </p>
                                    <p v-if="item.soft">
                                        <el-radio v-model="item.other" label="left">{{item.soft}}</el-radio>
                                    </p>
                                    <p v-if="item.average">
                                        <el-radio v-model="item.other" label="right">{{item.average}}</el-radio>
                                    </p>
                                    <p v-if="item.stiff">
                                        <el-radio v-model="item.other" label="both">{{item.Stiff}}</el-radio>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="mar-top-15">
                <el-col :span="12">
                    <h3>III.人工打分</h3>
                    <div class="dataTable">
                        <ul>
                            <li class="clearfix" v-for="(item, idx) in threeList">
                                <div class="left one">
                                    <p class="baseAct"><i>{{idx+oneList.length+1}}.</i>{{item.baseAct}}</p>
                                    <p class="errorAct">{{item.errorAct}}</p>
                                    <p class="china">{{item.china}}</p>
                                </div>
                                <div class="left two" v-if="item.noError">
                                    <p>
                                        <el-radio v-model="item.score" label="1">{{item.noError}}</el-radio>
                                    </p>
                                    <p>
                                        <el-radio v-model="item.score" label="0">{{item.error}}</el-radio>
                                    </p>
                                </div>
                                <div class="left three">
                                    <p v-if="item.excellent">
                                        <el-radio v-model="item.other" label="left">{{item.excellent}}</el-radio>
                                    </p>
                                    <p v-if="item.average">
                                        <el-radio v-model="item.other" label="right">{{item.average}}</el-radio>
                                    </p>
                                    <p v-if="item.poor">
                                        <el-radio v-model="item.other" label="both">{{item.poor}}</el-radio>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
        </section>
        <el-row class="test-btns">
            <el-button type="primary" v-if="">完成LESS测试</el-button>
            <el-button type="primary">完成全部测试</el-button>
        </el-row>
    </div>
</template>

<script>
    export default ({
        data() {
            return {
                testItemId: 'less', // 当前选中的项目
                testItem: [
                    {dicKey: 'less', dicValue: 'NC-LESS'},
                    {dicKey: 'double', dicValue: 'NC-Double Squat'},
                    {dicKey: 'single', dicValue: 'NC-Single Squat'},
                    {dicKey: 4, dicValue: 'COC-Single Squat'}
                ],   // 测试项目
                radio: 1,
                oneList: [
                    {score: null, baseAct: 'Knee Flexion:', errorAct: '<30deg', china: '屈膝小于30度',noError: 'No Error(1)', error: 'Error(1)'},
                    {score: null, whichLeg: null, baseAct: 'Hip Flexion:', errorAct: 'hips are NOT flexed', china: '没有屈髋',noError: 'No Error(1)', error: 'Error(1)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {score: null, baseAct: 'Trunk Flexion:', errorAct: 'trunk is NOT flexed', china: '躯干前屈',noError: 'No Error(1)', error: 'Error(1)'},
                    {score: null, whichLeg: null, baseAct: 'Ankle Plantar-Flexion Angle:', errorAct: 'land heel to Toe or flat foot', china: '前脚掌 或 全脚掌落地',noError: 'No Error(1)', error: 'Error(1)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {score: null, baseAct: 'Asymmetrical Foot Contact:', errorAct: 'NOT symmetric', china: '两脚落地时有任何区别',noError: 'No Error(1)', error: 'Error(1)'},
                    {score: null, whichLeg: null, baseAct: 'Asymmetrical Timing:', errorAct: 'Feet do NOT land at the same time', china: '左右脚落地不同时',noError: 'No Error(1)', error: 'Error(1)', left: 'Left 左', right: 'Right 右'},
                    {score: null, whichLeg: null, baseAct: 'Asymmetrical Heel-Toe/ Toe-Heel:', errorAct: 'One foot lands heel-toe and the other lands toe-heel', china: '左右脚落地时姿势不同（一脚脚跟落地，另一脚脚尖落地）',noError: 'No Error(1)', error: 'Error(1)', left: 'Left 左', right: 'Right 右'},
                    {score: null, baseAct: 'Lateral Trunk Flexion:', errorAct: 'Trunk is not vertical', china: '躯干侧倾',noError: 'No Error(1)', error: 'Error(1)'},
                    {score: null, whichLeg: null, baseAct: 'Medial Knee Position:', errorAct: 'knees medial to mid foot', china: '膝盖内扣（膝盖中心比脚中心更靠近身体中线）',noError: 'No Error(1)', error: 'Error(1)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {score: null, baseAct: 'Stance Width:', errorAct: '>shoulder width', china: '两膝距离比肩宽',noError: 'No Error(1)', error: 'Error(1)'},
                    {score: null, baseAct: 'Stance Width', errorAct: ' <shoulder width', china: '两膝距离比肩窄',noError: 'No Error(1)', error: 'Error(1)'}

                    ],
                twoList: [
                    {score: null, whichLeg: null, baseAct: 'Max IR Foot Position:', errorAct: 'Toes >30 deg. IR', china: '脚尖向内（内八字）超过30度',noError: 'No Error(1)', error: 'Error(1)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {score: null, whichLeg: null, baseAct: 'Max ER Foot Position:', errorAct: 'Toes >30 deg. ER', china: '脚尖向外（外八字）超过30度',noError: 'No Error(1)', error: 'Error(1)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {score: null, baseAct: 'Knee Flexion Displacement:', errorAct: 'an additional 45 degree of flexion after initial contact', china: '屈膝小于45度',noError: 'No Error(1)', error: 'Error(1)'},
                    {score: null, baseAct: 'Hip Flexion Displacement:', errorAct: 'hips do NOT flex more than at initial contact', china: '屈髋程度小于落地瞬间',noError: 'No Error(1)', error: 'Error(1)'},
                    {score: null, baseAct: 'Trunk Flexion Displacement:', errorAct: 'Trunk does NOT flex more than at initial contact', china: '躯干前屈程度小于落地瞬间',noError: 'No Error(1)', error: 'Error(1)'},
                    {score: null, baseAct: 'Excessive Trunk Flexion Displacement:', errorAct: 'trunk flexes past parallel with lower leg', china: '躯干过度前屈 (躯干前屈程度超过与小腿平行的程度)',noError: 'No Error(1)', error: 'Error(1)'},
                    {score: null, baseAct: 'Maximum Medial Knee Position:', errorAct: '> great toe', china: '膝盖内扣',noError: 'No Error(1)', error: 'Error(1)'},
                    {score: null, whichLeg: null, baseAct: 'Asymmetrical Loading:', errorAct: 'A weight shift is present - one side is loaded more than the other side', china: '臀部左/右倾',noError: 'No Error(1)', error: 'Error(1)', left: 'Left 左', right: 'Right 右'},
                    {score: null, whichLeg: null, baseAct: 'Knee Wobble:', errorAct: 'quick varus/valgus motion', china: '膝盖发抖',noError: 'No Error(1)', error: 'Error(1)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {score: null, other: null, baseAct: 'Joint Displacement:', errorAct: 'Sagittal Plane', china: '矢状面关节自然移位',soft: 'Soft(0) 软（大量移位）', average: 'Average(1) 一般（少量移位）', Stiff: 'Stiff(2) 硬（几乎无移位）'}
                ],
                threeList: [
                    {score: null, other: null, baseAct: 'Overall Impression:', errorAct: '', china: '总体印象',excellent: 'Excellent(0) 很好', average: 'Average(1) 一般', poor: 'Poor(2) 差'}
                ]
            }
        },

        methods: {
            // 改变测试项目
            handleChange(a) {
                console.log(a)
            }
        }
    })
</script>

<style lang="scss">
    .athlete-test {
        .mar-top-15 {
            margin-bottom: 15px !important;
        }

        h3 {
            margin-bottom: 10px;
            color: #409EFF;
        }
        .dataTable {
            li {
                border: 1px solid #ebeef5;
                padding: 10px;
                border-bottom: 0;
                color: #909399;
                font-size: 12px;
                position: relative;
                padding-left: 30px;
                &:last-child {
                    border: 1px solid #ebeef5;
                }
                i {
                    position: absolute;
                    left: 5px;
                    top: 10px;
                }
                .one {
                    width: 55%;
                }
                .two {
                    width: 25%;
                    p {
                        margin-bottom: 15px;
                        &:last-child {
                            margin-bottom: 0;
                        }
                    }
                    span {
                        font-size: 12px;
                    }
                }
                .three {
                    width: 20%;
                    p {
                        margin-bottom: 2px;
                        &:last-child {
                            margin-bottom: 0;
                        }
                    }
                    span {
                        font-size: 12px;
                    }
                }
                .baseAct {
                    color: #000;
                }
                .errorAct {
                    color: #999;
                    margin: 5px 0;
                }
                .china {
                    color: #333;
                }
            }
        }
        .test-btns {
            text-align: center;
        }
    }
</style>