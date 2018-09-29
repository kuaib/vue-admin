<template>
    <div class="athlete-test">
        <el-row class="row-item">
            <el-col :span="6">
                <el-select v-model="testItemId" placeholder="请选择测试项目 Choose Test Item"
                           @change="handleChange">
                    <el-option v-for="item in testItem" :label="item.dicValue" :value="item.dicKey"
                               :key="item.dicKey"></el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row class="row-item">
            <el-row :gutter="20">
                <el-col :span="12">
                    <h3>I.落地之前</h3>
                    <div class="dataTable">
                        <ul>
                            <li class="clearfix" v-for="(item, idx) in testList">
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
                                        <el-radio v-model="item.score" label="2">{{item.error}}</el-radio>
                                    </p>
                                </div>
                                <div class="left three" v-if="item.isLeg">
                                    <p>
                                        <el-radio v-model="item.score" label="2">{{item.left}}</el-radio>
                                    </p>
                                    <p>
                                        <el-radio v-model="item.score" label="2">{{item.right}}</el-radio>
                                    </p>
                                    <p>
                                        <el-radio v-model="item.score" label="2">{{item.both}}</el-radio>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="12"></el-col>
            </el-row>
        </el-row>
        <el-row>
            <el-button class="filter-item" type="primary">完成全部测试</el-button>
        </el-row>
    </div>
</template>

<script>
    export default ({
        data() {
            return {
                testItemId: '', // 当前选中的项目
                testItem: [
                    {dicKey: 1, dicValue: 'NC-LESS'},
                    {dicKey: 2, dicValue: 'NC-Double Squat'},
                    {dicKey: 3, dicValue: 'NC-Single Squat'},
                    {dicKey: 4, dicValue: 'COC-Single Squat'}
                ],   // 测试项目
                radio: 1,
                testList: [
                    {score: 0, baseAct: 'Knee Flexion', errorAct: '&lt;30deg', china: '初次落地瞬间屈膝小于30度',noError: 'No Error(1)', error: 'Error(0)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {score: 0, isLeg: true, whichLeg: 'left', baseAct: 'Hip Flexion', errorAct: 'hips are NOT flexed', china: '没有屈髋',noError: 'No Error(1)', error: 'Error(0)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {score: 0, baseAct: 'Trunk Flexion', errorAct: 'trunk is NOT flexed', china: '躯干前屈',noError: 'No Error(1)', error: 'Error(0)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {score: 0, isLeg: true, whichLeg: 'left', baseAct: 'Ankle Plantar-Flexion Angle', errorAct: 'land heel to Toe or flat foot', china: '前脚掌 或 全脚掌落地',noError: 'No Error(1)', error: 'Error(0)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {score: 0, baseAct: 'Asymmetrical Foot Contact', errorAct: 'NOT symmetric', china: '两脚落地时有任何区别',noError: 'No Error(1)', error: 'Error(0)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {score: 0, isLeg: true, whichLeg: 'left', baseAct: 'Asymmetrical Timing', errorAct: 'Feet do NOT land at the same time', china: '左右脚落地不同时',noError: 'No Error(1)', error: 'Error(0)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {score: 0, isLeg: true, whichLeg: 'left', baseAct: 'Asymmetrical Heel-Toe/ Toe-Heel', errorAct: 'One foot lands heel-toe and the other lands toe-heel', china: '左右脚落地时姿势不同（一脚脚跟落地，另一脚脚尖落地）',noError: 'No Error(1)', error: 'Error(0)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {score: 0, baseAct: 'Lateral Trunk Flexion', errorAct: 'Trunk is not vertical', china: '躯干侧倾',noError: 'No Error(1)', error: 'Error(0)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {score: 0, isLeg: true, whichLeg: 'left', baseAct: 'Medial Knee Position', errorAct: 'knees medial to mid foot', china: '膝盖内扣（膝盖中心比脚中心更靠近身体中线）',noError: 'No Error(1)', error: 'Error(0)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {score: 0, baseAct: 'Stance Width:', errorAct: 'shoulder width', china: '两膝距离比肩宽',noError: 'No Error(1)', error: 'Error(0)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {score: 0, baseAct: 'Stance Width', errorAct: ' &lt;shoulder width', china: '两膝距离比膝窄',noError: 'No Error(1)', error: 'Error(0)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                ]
            }
        },

        methods: {
            // 改变测试项目
            handleChange() {

            }
        }
    })
</script>

<style lang="scss">
    .athlete-test {
        .row-item {
            margin-bottom: 15px;
        }

        .dataTable li {
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
            }
            .three {
                width: 20%;
                p {
                    margin-bottom: 5px;
                    &:last-child {
                        margin-bottom: 0;
                    }
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
</style>