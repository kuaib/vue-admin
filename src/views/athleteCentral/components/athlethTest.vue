<template>
    <div class="athlete-test">
        <el-row class="mar-top-15">
            <el-col :span="6">
                <el-select v-model="step" placeholder="请选择测试项目 Choose Test Item"
                           @change="handleChange">
                    <el-option v-for="item in testItem" :label="item.dicValue" :value="item.dicKey"
                               :key="item.dicKey"></el-option>
                </el-select>
            </el-col>
        </el-row>

        <!--less测试-->
        <section class="less-test" v-show="step=='less'">
            <el-row :gutter="20" class="mar-top-15">
                <el-col :span="12">
                    <h3>I.落地之前
                    </h3>
                    <div class="dataTable">
                        <ul>
                            <li class="clearfix" v-for="(item, idx) in initialContact">
                                <div class="left one">
                                    <p class="baseAct"><i>{{idx+1}}.</i>{{item.baseAct}}</p>
                                    <p class="errorAct">{{item.errorAct}}</p>
                                    <p class="china">{{item.china}}</p>
                                </div>
                                <div class="left two">
                                    <p>
                                        <el-radio v-model="item.score" label="0">{{item.noError}}</el-radio>
                                    </p>
                                    <p>
                                        <el-radio v-model="item.score" label="1">{{item.error}}</el-radio>
                                    </p>
                                </div>
                                <div class="left three">
                                    <template v-if="item.score==1">
                                        <p v-if="item.left">
                                            <el-radio v-model="item.whichLeg" label="2">{{item.left}}</el-radio>
                                        </p>
                                        <p v-if="item.right">
                                            <el-radio v-model="item.whichLeg" label="3">{{item.right}}</el-radio>
                                        </p>
                                        <p v-if="item.both">
                                            <el-radio v-model="item.whichLeg" label="4">{{item.both}}</el-radio>
                                        </p>
                                    </template>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="12">
                    <h3>II.落地后直到稳定
                    </h3>
                    <div class="dataTable">
                        <ul>
                            <li class="clearfix" v-for="(item, idx) in maximumFlexionPosition">
                                <div class="left one">
                                    <p class="baseAct"><i>{{idx+initialContact.length+1}}.</i>{{item.baseAct}}</p>
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
                                    <template v-if="item.score==1">
                                        <p v-if="item.left">
                                            <el-radio v-model="item.whichLeg" label="2">{{item.left}}</el-radio>
                                        </p>
                                        <p v-if="item.right">
                                            <el-radio v-model="item.whichLeg" label="3">{{item.right}}</el-radio>
                                        </p>
                                        <p v-if="item.both">
                                            <el-radio v-model="item.whichLeg" label="4">{{item.both}}</el-radio>
                                        </p>
                                    </template>
                                    <p v-if="item.soft">
                                        <el-radio v-model="item.other" label="0">{{item.soft}}</el-radio>
                                    </p>
                                    <p v-if="item.average">
                                        <el-radio v-model="item.other" label="1">{{item.average}}</el-radio>
                                    </p>
                                    <p v-if="item.stiff">
                                        <el-radio v-model="item.other" label="2">{{item.stiff}}</el-radio>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="mar-top-15">
                <el-col :span="12">
                    <h3>III.总体评分</h3>
                    <div class="dataTable">
                        <ul>
                            <li class="clearfix" v-for="(item, idx) in grade">
                                <div class="left one">
                                    <p class="baseAct"><i>{{idx+initialContact.length+1}}.</i>{{item.baseAct}}</p>
                                    <p class="errorAct">{{item.errorAct}}</p>
                                    <p class="china">{{item.china}}</p>
                                </div>
                                <div class="left three">
                                    <p v-if="item.excellent">
                                        <el-radio v-model="item.other" label="0">{{item.excellent}}</el-radio>
                                    </p>
                                    <p v-if="item.average">
                                        <el-radio v-model="item.other" label="1">{{item.average}}</el-radio>
                                    </p>
                                    <p v-if="item.poor">
                                        <el-radio v-model="item.other" label="2">{{item.poor}}</el-radio>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
        </section>

        <!--double测试-->
        <section class="double-test" v-show="step=='double'">
            <el-row :gutter="20" class="mar-top-15">
                <el-col :span="12">
                    <h3>I.从前方观察（被测人双腿下蹲五次）</h3>
                    <div class="dataTable">
                        <ul>
                            <li class="clearfix" v-for="(item, idx) in front">
                                <div class="left one">
                                    <p class="baseAct"><i>{{idx+1}}.</i>{{item.baseAct}}</p>
                                    <p class="errorAct">{{item.errorAct}}</p>
                                    <p class="china">{{item.china}}</p>
                                </div>
                                <div class="left two">
                                    <p>
                                        <el-radio v-model="item.score" label="0">{{item.noError}}</el-radio>
                                    </p>
                                    <p>
                                        <el-radio v-model="item.score" label="1">{{item.error}}</el-radio>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="12">
                    <h3>II.从侧面观察（被测人双腿下蹲五次）</h3>
                    <div class="dataTable">
                        <ul>
                            <li class="clearfix" v-for="(item, idx) in flank">
                                <div class="left one">
                                    <p class="baseAct"><i>{{front.length+idx+1}}.</i>{{item.baseAct}}</p>
                                    <p class="errorAct">{{item.errorAct}}</p>
                                    <p class="china">{{item.china}}</p>
                                </div>
                                <div class="left two">
                                    <p>
                                        <el-radio v-model="item.score" label="0">{{item.noError}}</el-radio>
                                    </p>
                                    <p>
                                        <el-radio v-model="item.score" label="1">{{item.error}}</el-radio>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <h3>III.从后面观察（被测人双腿下蹲五次）</h3>
                    <div class="dataTable">
                        <ul>
                            <li class="clearfix" v-for="(item, idx) in behind">
                                <div class="left one">
                                    <p class="baseAct"><i>{{front.length+flank.length+idx+1}}.</i>{{item.baseAct}}</p>
                                    <p class="errorAct">{{item.errorAct}}</p>
                                    <p class="china">{{item.china}}</p>
                                </div>
                                <div class="left two">
                                    <p>
                                        <el-radio v-model="item.score" label="0">{{item.noError}}</el-radio>
                                    </p>
                                    <p>
                                        <el-radio v-model="item.score" label="1">{{item.error}}</el-radio>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
        </section>

        <!--single测试-->
        <section class="double-test" v-show="step=='single'">
            <el-row :gutter="20" class="mar-top-15">
                <el-col :span="12">
                    <h3>I.单腿（左腿或右腿）下蹲</h3>
                    <div class="dataTable">
                        <ul>
                            <li class="clearfix" v-for="(item, idx) in single">
                                <div class="left one">
                                    <p class="baseAct"><i>{{idx+1}}.</i>{{item.baseAct}}</p>
                                    <p class="errorAct">{{item.errorAct}}</p>
                                    <p class="china">{{item.china}}</p>
                                </div>
                                <div class="left two">
                                    <p>
                                        <el-radio v-model="item.score" label="0">{{item.noError}}</el-radio>
                                    </p>
                                    <p>
                                        <el-radio v-model="item.score" label="1">{{item.error}}</el-radio>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="mar-top-15">
                <el-col :span="12">
                    <h3>II.左腿下蹲</h3>
                    <div class="dataTable">
                        <ul>
                            <li class="clearfix" v-for="(item, idx) in left">
                                <div class="left one">
                                    <p class="baseAct"><i>{{single.length+idx+1}}.</i>{{item.baseAct}}</p>
                                    <p class="errorAct">{{item.errorAct}}</p>
                                    <p class="china">{{item.china}}</p>
                                </div>
                                <div class="left two">
                                    <p>
                                        <el-radio v-model="item.score" label="0">{{item.noError}}</el-radio>
                                    </p>
                                    <p>
                                        <el-radio v-model="item.score" label="1">{{item.error}}</el-radio>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="mar-top-15">
                <el-col :span="12">
                    <h3>III.右腿下蹲</h3>
                    <div class="dataTable">
                        <ul>
                            <li class="clearfix" v-for="(item, idx) in right">
                                <div class="left one">
                                    <p class="baseAct"><i>{{single.length+left.length+idx+1}}.</i>{{item.baseAct}}</p>
                                    <p class="errorAct">{{item.errorAct}}</p>
                                    <p class="china">{{item.china}}</p>
                                </div>
                                <div class="left two">
                                    <p>
                                        <el-radio v-model="item.score" label="0">{{item.noError}}</el-radio>
                                    </p>
                                    <p>
                                        <el-radio v-model="item.score" label="1">{{item.error}}</el-radio>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
        </section>
        <el-row class="test-btns">
            <el-button type="primary" v-if="step=='less' && !saveLoading" @click="finishedItem('less')">完成LESS测试</el-button>
            <el-button type="primary" v-if="step=='double' && !saveLoading" @click="finishedItem('double')">完成双腿下蹲测试</el-button>
            <el-button type="primary" v-if="step=='single' && !saveLoading" @click="finishedItem('single')">完成单腿下蹲测试</el-button>
            <el-button type="primary" :loading="true" v-if="saveLoading">保存中</el-button>
            <el-button type="primary" v-if="!saveAllLoading" @click="finishedAll">完成全部测试</el-button>
            <el-button type="primary" :loading="true" v-if="saveAllLoading">请稍后</el-button>
        </el-row>
    </div>
</template>

<script>
    import { getAthleteTestStep, saveAthleteTest, testDone } from '@/api/athlete'
    export default ({
        data() {
            return {
                id: null,       // -1: 是一组新的测试；1：未完成的一组测试
                step: 'less',   // 切换到哪个测试
                idFlag: true,   // 只记录当前运动员初次时候的id
                saveLoading: false,
                saveAllLoading: false,  // 点击完成全部测试按钮
                canSave: false,
                testItem: [         // 测试项目
                    {dicKey: 'less', dicValue: 'NC-LESS'},
                    {dicKey: 'double', dicValue: 'NC-Double Squat'},
                    {dicKey: 'single', dicValue: 'NC-Single Squat'},
                    // {dicKey: 4, dicValue: 'COC-Single Squat'}
                ],
                athleteName: true,  // 运动员名字
                initialContact: [   // 落地之前
                    {name: 'kneeFlexionLess30', score: null, baseAct: 'Knee Flexion:', errorAct: '<30deg', china: '屈膝小于30度',noError: 'No Error(0)', error: 'Error(1)'},
                    {name: 'hipFlexion', score: null, whichLeg: null, baseAct: 'Hip Flexion:', errorAct: 'hips are NOT flexed', china: '没有屈髋',noError: 'No Error(0)', error: 'Error(1)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {name: 'trunkFlexion', score: null, baseAct: 'Trunk Flexion:', errorAct: 'trunk is NOT flexed', china: '躯干前屈',noError: 'No Error(0)', error: 'Error(1)'},
                    {name: 'anklePlantarFlexionAngle',score: null, whichLeg: null, baseAct: 'Ankle Plantar-Flexion Angle:', errorAct: 'land heel to Toe or flat foot', china: '前脚掌 或 全脚掌落地',noError: 'No Error(0)', error: 'Error(1)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {name: 'asymmetricalFootContact', score: null, baseAct: 'Asymmetrical Foot Contact:', errorAct: 'NOT symmetric', china: '两脚落地时有任何区别',noError: 'No Error(0)', error: 'Error(1)'},
                    {name: 'asymmetricalTiming', score: null, whichLeg: null, baseAct: 'Asymmetrical Timing:', errorAct: 'Feet do NOT land at the same time', china: '左右脚落地不同时',noError: 'No Error(0)', error: 'Error(1)', left: 'Left 左', right: 'Right 右'},
                    {name: 'asymmetricalHeelToeToeHeel',score: null, whichLeg: null, baseAct: 'Asymmetrical Heel-Toe/ Toe-Heel:', errorAct: 'One foot lands heel-toe and the other lands toe-heel', china: '左右脚落地时姿势不同（一脚脚跟落地，另一脚脚尖落地）',noError: 'No Error(0)', error: 'Error(1)', left: 'Left 左', right: 'Right 右'},
                    {name: 'lateralTrunkFlexion', score: null, baseAct: 'Lateral Trunk Flexion:', errorAct: 'Trunk is not vertical', china: '躯干侧倾',noError: 'No Error(0)', error: 'Error(1)'},
                    {name: 'medialKneePosition', score: null, whichLeg: null, baseAct: 'Medial Knee Position:', errorAct: 'knees medial to mid foot', china: '膝盖内扣（膝盖中心比脚中心更靠近身体中线）',noError: 'No Error(0)', error: 'Error(1)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {name: 'stanceWidthGreaterThanShoulderWidth', score: null, baseAct: 'Stance Width:', errorAct: '>shoulder width', china: '两膝距离比肩宽',noError: 'No Error(0)', error: 'Error(1)'},
                    {name: 'stanceWidthLessThanShoulderWidth', score: null, baseAct: 'Stance Width', errorAct: ' <shoulder width', china: '两膝距离比肩窄',noError: 'No Error(0)', error: 'Error(1)'}

                    ],
                maximumFlexionPosition: [   // 落地后直到稳定
                    {name: 'maxIRFootPosition', score: null, whichLeg: null, baseAct: 'Max IR Foot Position:', errorAct: 'Toes >30 deg. IR', china: '脚尖向内（内八字）超过30度',noError: 'No Error(0)', error: 'Error(1)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {name: 'maxERFootPosition', core: null, whichLeg: null, baseAct: 'Max ER Foot Position:', errorAct: 'Toes >30 deg. ER', china: '脚尖向外（外八字）超过30度',noError: 'No Error(0)', error: 'Error(1)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {name: 'kneeFlexionDisplacement', score: null, baseAct: 'Knee Flexion Displacement:', errorAct: 'an additional 45 degree of flexion after initial contact', china: '屈膝小于45度',noError: 'No Error(0)', error: 'Error(1)'},
                    {name: 'hipFlexionDisplacement',score: null, baseAct: 'Hip Flexion Displacement:', errorAct: 'hips do NOT flex more than at initial contact', china: '屈髋程度小于落地瞬间',noError: 'No Error(0)', error: 'Error(1)'},
                    {name: 'trunkFlexionDisplacement', score: null, baseAct: 'Trunk Flexion Displacement:', errorAct: 'Trunk does NOT flex more than at initial contact', china: '躯干前屈程度小于落地瞬间',noError: 'No Error(0)', error: 'Error(1)'},
                    {name: 'excessiveTrunkFlexionDisplacement', score: null, baseAct: 'Excessive Trunk Flexion Displacement:', errorAct: 'trunk flexes past parallel with lower leg', china: '躯干过度前屈 (躯干前屈程度超过与小腿平行的程度)',noError: 'No Error(0)', error: 'Error(1)'},
                    {name: 'maximumMedialKneePosition', score: null, baseAct: 'Maximum Medial Knee Position:', errorAct: '> great toe', china: '膝盖内扣',noError: 'No Error(0)', error: 'Error(1)'},
                    {name: 'asymmetricalLoading', score: null, whichLeg: null, baseAct: 'Asymmetrical Loading:', errorAct: 'A weight shift is present - one side is loaded more than the other side', china: '臀部左/右倾',noError: 'No Error(0)', error: 'Error(1)', left: 'Left 左', right: 'Right 右'},
                    {name: 'kneeWobble', score: null, whichLeg: null, baseAct: 'Knee Wobble:', errorAct: 'quick varus/valgus motion', china: '膝盖发抖',noError: 'No Error(0)', error: 'Error(1)', left: 'Left 左', right: 'Right 右', both: 'Both 两只'},
                    {name: 'sagittalPlaneJointDisplacement', other: null, baseAct: 'Joint Displacement:', errorAct: 'Sagittal Plane', china: '矢状面关节自然移位',soft: 'Soft(0) 软（大量移位）', average: 'Average(1) 一般（少量移位）', stiff: 'Stiff(2) 硬（几乎无移位）'}
                ],
                grade: [ // 总体评分
                    {name: 'overallImpression' , other: null, baseAct: 'Overall Impression:', errorAct: '', china: '总体印象',excellent: 'Excellent(0) 很好', average: 'Average(1) 一般', poor: 'Poor(2) 差'}
                ],

                // 从前方观察（被测人双腿下蹲五次）
                front: [
                    {name: 'feetTurnOut', score: null, baseAct: 'Feet Turn Out', china: '脚尖向外',noError: 'No Error(0)', error: 'Error(1)'},
                    {name: 'feetFlatten', score: null, baseAct: 'Feet Flatten', china: '足弓压平',noError: 'No Error(0)', error: 'Error(1)'},
                    {name: 'heelsRise', score: null, baseAct: 'Heels Rise', china: '抬起脚跟',noError: 'No Error(0)', error: 'Error(1)'},
                    {name: 'kneeMovesIn', score: null, baseAct: 'Knee Moves In', china: '膝关节内扣',noError: 'No Error(0)', error: 'Error(1)'},
                    {name: 'kneeMovesOut', score: null, baseAct: 'Knee Moves Out', china: '膝关节外展',noError: 'No Error(0)', error: 'Error(1)'},
                ],
                // 从侧面观察（被测人双腿下蹲五次）
                flank: [
                    {name: 'excessiveForwardLean', score: null, baseAct: 'Excessive Forward Lean', china: '躯干过度前倾',noError: 'No Error(0)', error: 'Error(1)'},
                    {name: 'lowBackArches', score: null, baseAct: 'Low Back Arches', china: '下背部弓形（腰椎过伸）',noError: 'No Error(0)', error: 'Error(1)'},
                    {name: 'lowBackRounds', score: null, baseAct: 'Low Back Rounds', china: '下背部拱起',noError: 'No Error(0)', error: 'Error(1)'},
                    {name: 'armsFallForward', score: null, baseAct: 'Arms Fall Forward', china: '手臂前伸',noError: 'No Error(0)', error: 'Error(1)'},
                ],
                // 从后面观察（被测人双腿下蹲五次）
                behind: [
                    {name: 'hipShift', score: null, baseAct: 'Hip Shift', china: '',noError: 'No Error(0)', error: 'Error(1)'},
                ],

                // 单腿（左腿或右腿）下蹲
                single: [
                    {name: 'footFlattens', score: null, baseAct: 'Foot Flattens', china: '足弓压平',noError: 'No Error(0)', error: 'Error(1)'},
                    {name: 'kneeMovesIn', score: null, baseAct: 'Knee Moves In', china: '膝关节内扣',noError: 'No Error(0)', error: 'Error(1)'},
                    {name: 'kneeMovesOut', score: null, baseAct: 'Knee Moves Out', china: '膝关节外展',noError: 'No Error(0)', error: 'Error(1)'},
                    {name: 'hipDrop', score: null, baseAct: 'Hip Drop', china: '臀部降低',noError: 'No Error(0)', error: 'Error(1)'},
                    {name: 'hipHike', score: null, baseAct: 'Hip Hike', china: '臀部升高',noError: 'No Error(0)', error: 'Error(1)'},
                ],
                // 左腿下蹲
                left: [
                    {name: 'uncontrolledTunkMotion', score: null, baseAct: 'Uncontrolled Tunk Motion', china: '躯干运动失控',noError: 'No Error(0)', error: 'Error(1)'},
                ],
                // 右腿下蹲
                right: [
                    {name: 'uncontrolledTunkMotion', score: null, baseAct: 'Uncontrolled Tunk Motion', china: '躯干运动失控',noError: 'No Error(0)', error: 'Error(1)'},
                ],
            }
        },

        props: ['athleteRow'],

        methods: {
            // 初始化当前运动员测试进度
            initTestStep() {
                getAthleteTestStep(this.athleteRow.id).then((res) => {
                    if(res.data.code == 200) {
                        const data = res.data.data;
                        this.step = data.step;
                        if(this.idFlag) {
                            this.idFlag = false;
                            this.id = data.id;
                        }
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    console.log('初始化失败')
                })
            },

            // 点击完成单项目测试按钮
            finishedItem(testName) {
                this.saveLoading = false;
                let dataForm = {
                    'id': this.id,
                    'step': testName,
                    'athleteId': this.athleteRow.id,
                    'athleteName': this.athleteRow.athleteName,
                    'doubleForm': null
                };
                if(testName === 'less') {
                    let initialContact, maximumFlexionPosition, grade;
                    initialContact = this.getRequestItem(this.initialContact);
                    if(this.canSave) {
                        maximumFlexionPosition = this.getRequestItem(this.maximumFlexionPosition);
                        if(this.canSave) {
                            grade = this.getRequestItem(this.grade);
                            if(this.canSave) {
                                dataForm.lessForm = {initialContact: initialContact, maximumFlexionPosition: maximumFlexionPosition, grade: grade}
                                this.saveTest(dataForm);
                            }
                        }
                    }
                } else if(testName === 'double') {
                    let front, flank, behind;
                    front = this.getRequestItem(this.front);
                    if(this.canSave) {
                        flank = this.getRequestItem(this.flank);
                        if(this.canSave) {
                            behind = this.getRequestItem(this.behind);
                            if(this.canSave) {
                                dataForm.doubleForm = {front: front, flank: flank, behind: behind}
                                this.saveTest(dataForm);
                            }
                        }
                    }
                } else if(testName == 'single') {
                    let single, left, right;
                    single = this.getRequestItem(this.single);
                    if(this.canSave) {
                        left = this.getRequestItem(this.left);
                        if(this.canSave) {
                            right = this.getRequestItem(this.right);
                            if(this.canSave) {
                                dataForm.singleForm = {single: single, left: left, right: right}
                                this.saveTest(dataForm);
                            }
                        }
                    }
                }

            },

            // 保存单项测试
            saveTest(dataForm, lastTest) {
                saveAthleteTest(dataForm).then(res => {
                    this.saveLoading = false;
                    if(res.data.code == 200) {
                        this.id = res.data.data.id;
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        })
                        this.initTestStep();
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    this.saveLoading = false;
                    console.log('保存失败')
                })
            },

            // 点击完成全部测试按钮
            finishedAll() {
                this.saveAllLoading = true;
                testDone({'athleteId': this.athleteRow.id,id: this.id}).then(res => {
                    this.saveAllLoading = false;
                    if(res.data.code == 200) {
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        })
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    console.log('失败');
                    this.saveAllLoading = false;
                })
            },

            // 改变测试项目
            handleChange(a) {
                console.log(a)
            },

            // 取各个测试中的必要字段
            getRequestItem(item) {
                let obj = {};
                for(let i = 0; i < item.length; i++) {
                    let str = '', val=item[i];
                    if(val.score === null || val.other === null || (val.score == 1 && val.whichLeg === null)) {
                        this.$message({
                            message: val.baseAct + 'is incomplete (' + val.china + '不完整)',
                            type: 'warning'
                        })
                        this.canSave = false;
                        break;
                    } else {
                        if(val.score !== undefined && val.score !== null) {
                            str += val.score;
                        }
                        if(val.score == 1 && val.whichLeg !== undefined && val.whichLeg !== null) {
                            str += val.whichLeg;
                        }
                        if(val.other !== undefined && val.other !== null) {
                            str += val.other;
                        }
                        obj[val.name] = str;
                        this.canSave = true;
                    }
                }
                return obj;
            },

            // 重置页面(切换运动员的时候)
            resetPage(testItem) {
                for (let i = 0; i < testItem.length; i++) {
                    let item = testItem[i];
                    if(item.score) {
                        testItem[i].score = null;
                    }
                    if(item.whichLeg) {
                        testItem[i].whichLeg = null;
                    }
                    if(item.other) {
                        testItem[i].other = null;
                    }
                }

            }
        },
        watch: {
            athleteRow(val) {
                if(val && val.id) {
                    this.idFlag = true;
                    this.resetPage(this.initialContact);
                    this.resetPage(this.maximumFlexionPosition);
                    this.resetPage(this.grade);
                    this.resetPage(this.front);
                    this.resetPage(this.flank);
                    this.resetPage(this.behind);
                    this.resetPage(this.single);
                    this.resetPage(this.left);
                    this.resetPage(this.right);
                    this.initTestStep();
                }
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
            margin-top: 20px;
        }
    }
</style>