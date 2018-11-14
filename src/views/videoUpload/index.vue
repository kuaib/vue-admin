<template>
    <div>
        <!--条件过滤-->
        <el-row :gutter="20" style="margin-bottom: 20px;">
            <el-col :span="5">
                <el-select v-model="teamId" placeholder="请选择类别 Select Category" @change="changeC">
                    <el-option v-for="item in teamList" :label="item.teamName" :value="item.teamId"
                               :key="item.teamId"></el-option>
                </el-select>
            </el-col>
            <el-col :span="5">
                <el-select v-model="testKey" placeholder="请选择测试 Select Test" @change="changeC">
                    <el-option v-for="item in testItem" :label="item.dicValue" :value="item.dicKey"
                               :key="item.dicKey"></el-option>
                </el-select>
            </el-col>
            <el-col :span="5">
                <el-date-picker type="date" placeholder="选择测试日期 Select Date" v-model="testDate"
                                style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
            </el-col>
            <el-col :span="5">
                <el-select v-model="testNo" placeholder="请选择测试次数 Select No. of Test" @change="changeC">
                    <el-option v-for="item in testNoList" :label="item.dicValue" :value="item.dicKey"
                               :key="item.dicKey"></el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-button class="search" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索 Search</el-button>
            </el-col>
        </el-row>


        <!--less-->
        <el-row v-show="testKey1==='less'">
            <el-table :data="list" v-loading="listLoading" element-loading-text="" border fit highlight-current-row
                      style="width: 100%"
                      ref="athleteTable"
                      :row-class-name="tableRowClassName">
                <el-table-column align="center" :render-header="renderHeader" label="English,Name">
                    <template slot-scope="scope">
                        <span>{{scope.row.athleteNameEn}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="Chinese,Name">
                    <template slot-scope="scope">
                        <span>{{scope.row.athleteName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="正面,（第一次）,Front Trial 1">
                    <template slot-scope="scope">
                        <div class="upTag" v-if="!scope.row.submit">
                            <span class="up-btn activeBtn">{{scope.row.trials[0]==1?'重新上传':'上传'}}</span>
                            <input type="file" @change="onFileChange($event,scope)" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf">
                        </div>
                        <div class="upTag" v-else>
                            <span class="up-btn disableBtn">{{scope.row.trials[0]==1?'已上传':'上传'}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label=" 右侧面,（第一次）, Right Side Trial 1">
                    <!--<template slot-scope="scope">-->
                        <!--<span style="color:#f56c6c" v-if="scope.row.trial[1]==1">重新上传</span>-->
                        <!--<el-upload v-else-->
                                <!--class="avatar-uploader"-->
                                <!--action="/api/sports/sys/upload/athleteLogo"-->
                                <!--:show-file-list="false"-->
                                <!--:on-success="uploadSuccess"-->
                                <!--:before-upload="beforeUpload">-->
                        <!--</el-upload>-->
                    <!--</template>-->
                    <template slot-scope="scope">
                        <div class="upTag" v-if="!scope.row.submit">
                            <span class="up-btn activeBtn">{{scope.row.trials[1]==1?'重新上传':'上传'}}</span>
                            <input type="file" @change="onFileChange($event,scope)" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf">
                        </div>
                        <div class="upTag" v-else>
                            <span class="up-btn disableBtn">{{scope.row.trials[1]==1?'已上传':'上传'}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="正面,（第二次）,Front Trial 2">
                    <template slot-scope="scope">
                        <div class="upTag" v-if="!scope.row.submit">
                            <span class="up-btn activeBtn">{{scope.row.trials[2]==1?'重新上传':'上传'}}</span>
                            <input type="file" @change="onFileChange($event,scope)" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf">
                        </div>
                        <div class="upTag" v-else>
                            <span class="up-btn disableBtn">{{scope.row.trials[2]==1?'已上传':'上传'}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="右侧面,（第二次）,Right Side Trial 2">
                    <template slot-scope="scope">
                        <div class="upTag" v-if="!scope.row.submit">
                            <span class="up-btn activeBtn">{{scope.row.trials[3]==1?'重新上传':'上传'}}</span>
                            <input type="file" @change="onFileChange($event,scope)" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf">
                        </div>
                        <div class="upTag" v-else>
                            <span class="up-btn disableBtn">{{scope.row.trials[3]==1?'已上传':'上传'}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label=" 其他, ,Others">
                    <template slot-scope="scope">
                        <div class="upTag" v-if="!scope.row.submit">
                            <span class="up-btn activeBtn">{{scope.row.trials[4]==1?'重新上传':'上传'}}</span>
                            <input type="file" @change="onFileChange($event,scope)" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf">
                        </div>
                        <div class="upTag" v-else>
                            <span class="up-btn disableBtn">{{scope.row.trials[4]==1?'已上传':'上传'}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="确认,Sure">
                    <template slot-scope="scope">
                        <span v-if="!scope.row.submit" class="submitBtn" @click="submitCount(scope)">提交</span>
                        <span v-else style="color:#ccc">已提交</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="LESS分数,LESS Score">
                    <template slot-scope="scope">
                        <span>{{scope.row.lessScore}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="总分数,Total Score">
                    <template slot-scope="scope">
                        <span>{{scope.row.totalScore}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="测试次数,Test No.">
                    <template slot-scope="scope">
                        <span>{{scope.row.testCount}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="listQuery.currentPage" :page-sizes="[10,20,30,50]"
                               :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper"
                               :total="total">
                </el-pagination>
            </div>
        </el-row>

        <!--双腿-->
        <el-row v-show="testKey1==='double'">
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                      style="width: 100%"
                      ref="athleteTable"
                      :row-class-name="tableRowClassName">
                <el-table-column align="center" :render-header="renderHeader" label="English,Name">
                    <template slot-scope="scope">
                        <span>{{scope.row.athleteNameEn}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="Chinese,Name">
                    <template slot-scope="scope">
                        <span>{{scope.row.athleteName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="正面,(第一次),Front Trial 1">
                    <template slot-scope="scope">
                        <div class="upTag" v-if="!scope.row.submit">
                            <span class="up-btn activeBtn">{{scope.row.trials[0]==1?'重新上传':'上传'}}</span>
                            <input type="file" @change="onFileChange($event,scope)" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf">
                        </div>
                        <div class="upTag" v-else>
                            <span class="up-btn disableBtn">{{scope.row.trials[0]==1?'已上传':'上传'}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="右侧面,(第一次),Right Side Trial 1">
                    <template slot-scope="scope">
                        <div class="upTag" v-if="!scope.row.submit">
                            <span class="up-btn activeBtn">{{scope.row.trials[1]==1?'重新上传':'上传'}}</span>
                            <input type="file" @change="onFileChange($event,scope)" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf">
                        </div>
                        <div class="upTag" v-else>
                            <span class="up-btn disableBtn">{{scope.row.trials[1]==1?'已上传':'上传'}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="正面,(第二次),Front Trial 2">
                    <template slot-scope="scope">
                        <div class="upTag" v-if="!scope.row.submit">
                            <span class="up-btn activeBtn">{{scope.row.trials[2]==1?'重新上传':'上传'}}</span>
                            <input type="file" @change="onFileChange($event,scope)" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf">
                        </div>
                        <div class="upTag" v-else>
                            <span class="up-btn disableBtn">{{scope.row.trials[2]==1?'已上传':'上传'}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="右侧面,(第二次),Right Side Trial 2">
                    <template slot-scope="scope">
                        <div class="upTag" v-if="!scope.row.submit">
                            <span class="up-btn activeBtn">{{scope.row.trials[3]==1?'重新上传':'上传'}}</span>
                            <input type="file" @change="onFileChange($event,scope)" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf">
                        </div>
                        <div class="upTag" v-else>
                            <span class="up-btn disableBtn">{{scope.row.trials[3]==1?'已上传':'上传'}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="其他,Others">
                    <template slot-scope="scope">
                        <div class="upTag" v-if="!scope.row.submit">
                            <span class="up-btn activeBtn">{{scope.row.trials[4]==1?'重新上传':'上传'}}</span>
                            <input type="file" @change="onFileChange($event,scope)" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf">
                        </div>
                        <div class="upTag" v-else>
                            <span class="up-btn disableBtn">{{scope.row.trials[4]==1?'已上传':'上传'}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="确认,Sure">
                    <template slot-scope="scope">
                        <span v-if="!scope.row.submit" class="submitBtn" @click="submitCount(scope)">提交</span>
                        <span v-else style="color:#ccc">已提交</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="DL Squat,双腿深蹲分数">
                    <template slot-scope="scope">
                        <span>{{scope.row.doubleScore}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="总分数,Total Score">
                    <template slot-scope="scope">
                        <span>{{scope.row.totalScore}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="测试次数,Test No.">
                    <template slot-scope="scope">
                        <span>{{scope.row.testCount}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="listQuery.currentPage" :page-sizes="[10,20,30,50]"
                               :page-size="listQuery.pageSize" layout="prev, pager, next"
                               :total="total">
                </el-pagination>
            </div>
        </el-row>

        <!--单腿-->
        <el-row v-show="testKey1==='single'">
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                      style="width: 100%"
                      ref="athleteTable"
                      :row-class-name="tableRowClassName">
                <el-table-column align="center" :render-header="renderHeader" label="English,Name">
                    <template slot-scope="scope">
                        <span>{{scope.row.athleteNameEn}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="Chinese,Name">
                    <template slot-scope="scope">
                        <span>{{scope.row.athleteName}}</span>
                    </template>
                </el-table-column>

                <template>
                    <el-table-column align="center" :render-header="renderHeader" label="正面,(第一次),(左腿蹲),Front Trial 1 Left">
                        <template slot-scope="scope">
                            <div class="upTag" v-if="!scope.row.submit">
                                <span class="up-btn activeBtn">{{scope.row.trials[0]==1?'重新上传':'上传'}}</span>
                                <input type="file" @change="onFileChange($event,scope)" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf">
                            </div>
                            <div class="upTag" v-else>
                                <span class="up-btn disableBtn">{{scope.row.trials[0]==1?'已上传':'上传'}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :render-header="renderHeader" label="正面,(第一次),(右腿蹲),Front Trial 1 Right">
                        <template slot-scope="scope">
                            <div class="upTag" v-if="!scope.row.submit">
                                <span class="up-btn activeBtn">{{scope.row.trials[1]==1?'重新上传':'上传'}}</span>
                                <input type="file" @change="onFileChange($event,scope)" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf">
                            </div>
                            <div class="upTag" v-else>
                                <span class="up-btn disableBtn">{{scope.row.trials[1]==1?'已上传':'上传'}}</span>
                            </div>
                        </template>
                    </el-table-column>
                </template>

                <template>
                    <el-table-column align="center" :render-header="renderHeader" label="右侧面,(第一次),(左腿蹲),Right Side Trial 1 Left">
                        <template slot-scope="scope">
                            <div class="upTag" v-if="!scope.row.submit">
                                <span class="up-btn activeBtn">{{scope.row.trials[2]==1?'重新上传':'上传'}}</span>
                                <input type="file" @change="onFileChange($event,scope)" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf">
                            </div>
                            <div class="upTag" v-else>
                                <span class="up-btn disableBtn">{{scope.row.trials[2]==1?'已上传':'上传'}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :render-header="renderHeader" label="右侧面,(第一次),(右腿蹲),Right Side Trial 1 Right">
                        <template slot-scope="scope">
                            <div class="upTag" v-if="!scope.row.submit">
                                <span class="up-btn activeBtn">{{scope.row.trials[3]==1?'重新上传':'上传'}}</span>
                                <input type="file" @change="onFileChange($event,scope)" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf">
                            </div>
                            <div class="upTag" v-else>
                                <span class="up-btn disableBtn">{{scope.row.trials[3]==1?'已上传':'上传'}}</span>
                            </div>
                        </template>
                    </el-table-column>
                </template>

                <template>
                    <el-table-column align="center" :render-header="renderHeader" label="正面,(第二次),(左腿蹲),Front Trial 2 Left">
                        <template slot-scope="scope">
                            <div class="upTag" v-if="!scope.row.submit">
                                <span class="up-btn activeBtn">{{scope.row.trials[4]==1?'重新上传':'上传'}}</span>
                                <input type="file" @change="onFileChange($event,scope)" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf">
                            </div>
                            <div class="upTag" v-else>
                                <span class="up-btn disableBtn">{{scope.row.trials[4]==1?'已上传':'上传'}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :render-header="renderHeader" label="正面,(第二次),(右腿蹲),Front Trial 2 Right">
                        <template slot-scope="scope">
                            <div class="upTag" v-if="!scope.row.submit">
                                <span class="up-btn activeBtn">{{scope.row.trials[5]==1?'重新上传':'上传'}}</span>
                                <input type="file" @change="onFileChange($event,scope)" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf">
                            </div>
                            <div class="upTag" v-else>
                                <span class="up-btn disableBtn">{{scope.row.trials[5]==1?'已上传':'上传'}}</span>
                            </div>
                        </template>
                    </el-table-column>
                </template>


                <template>
                    <el-table-column align="center" :render-header="renderHeader" label="右侧面,(第二次),(左腿蹲), Right Side trial 2 Left">
                        <template slot-scope="scope">
                            <div class="upTag" v-if="!scope.row.submit">
                                <span class="up-btn activeBtn" style="color:#67c23a">{{scope.row.trials[6]==1?'重新上传':'上传'}}</span>
                                <input type="file" @change="onFileChange($event,scope)" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf">
                            </div>
                            <div class="upTag" v-else>
                                <span class="up-btn disableBtn">{{scope.row.trials[6]==1?'已上传':'上传'}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :render-header="renderHeader" label="右侧面,(第二次),(右腿蹲),Right Side trial 2 Right">
                        <template slot-scope="scope">
                            <div class="upTag" v-if="!scope.row.submit">
                                <span class="up-btn activeBtn" style="color:#67c23a">{{scope.row.trials[7]==1?'重新上传':'上传'}}</span>
                                <input type="file" @change="onFileChange($event,scope)" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf">
                            </div>
                            <div class="upTag" v-else>
                                <span class="up-btn disableBtn">{{scope.row.trials[7]==1?'已上传':'上传'}}</span>
                            </div>
                        </template>
                    </el-table-column>
                </template>

                <template>
                    <el-table-column align="center" :render-header="renderHeader" label="其他,,(左腿蹲),Others Left">
                        <template slot-scope="scope">
                            <div class="upTag" v-if="!scope.row.submit">
                                <span class="up-btn activeBtn" style="color:#67c23a">{{scope.row.trials[8]==1?'重新上传':'上传'}}</span>
                                <input type="file" @change="onFileChange($event,scope)" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf">
                            </div>
                            <div class="upTag" v-else>
                                <span class="up-btn disableBtn">{{scope.row.trials[8]==1?'已上传':'上传'}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :render-header="renderHeader" label="其他,,(右腿蹲),Others Right">
                        <template slot-scope="scope">
                            <div class="upTag" v-if="!scope.row.submit">
                                <span class="up-btn activeBtn">{{scope.row.trials[9]==1?'重新上传':'上传'}}</span>
                                <input type="file" @change="onFileChange($event,scope)" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf">
                            </div>
                            <div class="upTag" v-else>
                                <span class="up-btn disableBtn">{{scope.row.trials[9]==1?'已上传':'上传'}}</span>
                            </div>
                        </template>
                    </el-table-column>
                </template>

                <el-table-column align="center" :render-header="renderHeader" label="确认,Sure">
                    <template slot-scope="scope">
                        <span v-if="!scope.row.submit" class="submitBtn" @click="submitCount(scope)">提交</span>
                        <span v-else style="color:#ccc">已提交</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="SL Squat,单腿深蹲分数">
                    <template slot-scope="scope">
                        <span>{{scope.row.singleScore}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="总分数,Total Score">
                    <template slot-scope="scope">
                        <span>{{scope.row.totalScore}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="测试次数,Test No.">
                    <template slot-scope="scope">
                        <span>{{scope.row.testCount}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="listQuery.currentPage" :page-sizes="[10,20,30,50]"
                               :page-size="listQuery.pageSize" layout="prev, pager, next"
                               :total="total">
                </el-pagination>
            </div>
        </el-row>


        <el-row style="text-align: center;margin-top: 20px;">
            <el-button type="primary" @click="finishAllAthleteByTeam">完成本队视频上传</el-button>
        </el-row>


        <!--<video ref="video" :src="fileContent" controls="controls"></video>-->
    </div>
</template>

<script>
    import waves from '@/directive/waves' // 水波纹指令
    import { getTeamListAll } from '@/api/team'
    import { getTestAthleteList, uploadTestVideo, finishTeamVideo, submitOfCount } from '@/api/athlete'
    export default ({
        directives: {waves},
        data() {
            return {
                teamList: [],        // 队伍
                teamId: null,        // 当前选中的队伍id

                testKey: 'less',     // 测试项目id
                testItem: [          // 测试项目
                    {dicKey: 'less', dicValue: 'NC-LESS'},
                    {dicKey: 'double', dicValue: 'NC-Double Squat'},
                    {dicKey: 'single', dicValue: 'NC-Single Squat'},
                    // {dicKey: 4, dicValue: 'COC-Single Squat'}
                ],

                testDate: new Date(),   // 测试日期

                testNo: '1',      // 测试次数
                testNoList: [
                    {dicKey: '1', dicValue: '第一次测试 Test No.1'},
                    {dicKey: '2', dicValue: '第二次测试 Test No.2'},
                    {dicKey: '3', dicValue: '第三次测试 Test No.3'},
                    {dicKey: '4', dicValue: '第四次测试 Test No.4'},
                    {dicKey: '5', dicValue: '第五次测试 Test No.5'},
                ],


                list: [],            // 运动员列表
                total: null,         // 总条目数
                listLoading: false,
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    teamId: null,    // 当前选中的队伍id
                    type: 1,         // 测试类型 1:less，2: double，3:single
                    testDate: null,  // 测试日期
                    testCount: 1,    // 测试次数
                },

                // fileContent: null,


                testKey1: 'less',   // 用来切换表格列（点击搜索再切换）
                testNo1: '1'        // 用来切换表格列（点击搜索再切换）
            }
        },

        created() {
            if(this.testDate.toString().length > 10) { // 初次渲染的时间，格式许转换
                let time = new Date(this.testDate);
                let day = time.getDate().toString();
                this.listQuery.testDate = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + (day.length == 1 ? ('0' + day) : day);
            }
            this.getAllTeam();
        },

        methods: {
            // 获取所有队伍信息（不分页）
            getAllTeam() {
                getTeamListAll().then(res => {
                    if(res.data.code === 200) {
                        this.teamList = res.data.data;
                        this.listQuery.teamId = this.teamList[0].teamId;
                        this.teamId = this.teamList[0].teamId;
                        this.getList();
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    console.log('获取队伍列表失败')
                })
            },

            // 点击搜索
            handleFilter() {
                this.listQuery.currentPage = 1;
                this.listQuery.teamId = this.teamId;
                this.listQuery.testDate = this.testDate;
                this.listQuery.testNo = this.testNo;
                this.getList()
            },

            // 视频上传
            onFileChange(e, scope) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                this.listLoading = true;


                let trialName = null, temp = scope.column.label.split(','), testDate = null;
                if(this.testKey === 'single') {
                    trialName = temp[3];
                } else {
                    trialName = temp[2];
                }
                if(this.testDate.toString().length > 10) { // 初次渲染的时间，格式许转换
                    let time = new Date(this.testDate);
                    let day = time.getDate().toString();
                    testDate = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + (day.length == 1 ? ('0' + day) : day);
                }


                let param = new FormData(); //创建form对象
                param.append('file',files[0]);//通过append向form对象添加数据

                let testType, columnNum = scope.column.id, sort;
                if(this.testKey == 'less') {
                    testType = 1;
                    sort = columnNum.substr(columnNum.length - 1, 1) - 3
                } else if(this.testKey == 'double') {
                    testType = 2;
                    sort = columnNum.substr(columnNum.length - 2, 2) - 3 - 11; // 11是less的列数
                } else {
                    testType = 3;
                    sort = columnNum.substr(columnNum.length - 2, 2) - 3 - 22; // 22是less+double的列数
                }

                param.append('teamId', this.teamId);
                param.append('athleteId', scope.row.athleteId);
                param.append('type', testType);
                param.append('testDate', testDate ? testDate : this.testDate);
                param.append('testCount', parseInt(this.testNo));
                param.append('trialName', trialName.toLowerCase().replace(/\s+/g, ''));
                param.append('trialShowName', trialName);
                param.append('sort', sort);


                uploadTestVideo(param).then(res => {
                    this.listLoading = false;
                    if(res.data.code == 200) {
                        this.$set(this.list[scope.$index].trials, sort, 1);
                        this.$message({
                            message: '上传成功',
                            type: 'success'
                        })
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(() => {
                    this.listLoading = false;
                    console.log('上传失败')
                })
            },

            // 提交运动员本次上传信息
            submitCount(scope) {
                this.listLoading = true;
                let {teamId, type, testDate, testCount} = this.listQuery;
                submitOfCount({
                    teamId,
                    type,
                    testDate,
                    testCount,
                    athleteId: scope.row.athleteId
                }).then(res => {
                    this.listLoading = false;
                    if(res.data.code == 200) {
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        })
                        this.$set(this.list[scope.$index], 'submit', 1);
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                })
            },

            // 切换条件
            changeC(e) {},

            // 获取测试运动员列表
            getList() {
                if(this.testDate.toString().length > 10) { // 初次渲染的时间，格式许转换
                    let time = new Date(this.testDate);
                    let day = time.getDate().toString();
                    this.listQuery.testDate = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + (day.length == 1 ? ('0' + day) : day);
                }
                this.listLoading = true;
                getTestAthleteList(this.listQuery).then(res => {
                    this.listLoading = false;
                    if(res.data.code === 200) {
                        const data = res.data.data;
                        this.list = data.list;
                        this.total = data.pagination.total;
                        this.listQuery.currentPage = data.pagination.current;


                        // 改变表格显示隐藏的条件
                        this.testKey1 = this.testKey;
                        this.testNo1 = this.testNo;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    this.listLoading = false;
                    console.log('获取运动员列表失败');
                })
            },

            // 完成本队视频上传
            finishAllAthleteByTeam() {
                let testDate = null;
                if(this.testDate.toString().length > 10) { // 初次渲染的时间，格式许转换
                    let time = new Date(this.testDate);
                    let day = time.getDate().toString();
                    testDate = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + (day.length == 1 ? ('0' + day) : day);
                }
                finishTeamVideo({
                    teamId: this.teamId,
                    testCount: parseInt(this.testNo),
                    testDate: testDate ? testDate : this.testDate
                }).then(res => {
                    if(res.data.code == 200) {
                        if(res.data.data == 0) {
                            this.$message({
                                message: '还有运动员未上传视频，请上传！',
                                type: 'warning'
                            })
                        } else {
                            this.$message({
                                message: res.data.msg,
                                type: 'success'
                            })
                        }
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    console.log('请求失败')
                })
            },

            // 格式化表头
            renderHeader(h, column) {
                let title = column.column.label.split(',');
                return [h('p', {}, [title[0]]),h('p', {}, [title[1]]),h('p', {}, [title[2]]),h('p', {}, [title[3]])]
            },

            // 改变每页显示条目数
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList()
            },

            // 跳转到指定页数
            handleCurrentChange(val) {
                this.listQuery.currentPage = val;
                this.getList()
            },

            // 把每一行的索引放进row(行的回调方法)
            tableRowClassName({row, rowIndex}) {
                row.index = rowIndex
            }


        },

        watch: {
            teamId: function(val) {
                if(val) {
                    this.listQuery.teamId = val;
                }
            },
            testKey: function(val) {
                if(val) {
                    this.listQuery.type = val === 'less' ? 1 : val === 'double' ? 2 : 3;
                }
            },
            testDate: function(val) {
                if(val) {
                    this.listQuery.testDate = val;
                }
            },
            testNo: function(val) {
                if(val) {
                    this.listQuery.testCount = parseInt(val);
                }
            },
        }
    })
</script>

<style lang="scss" scoped>
    .upTag {
        position: relative;
        span {
            display: block;
            width: 100%;
            height: 100%;
        }
        input {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            z-index: 1;
            left: 0;
            top: 0;
            cursor: pointer;
        }
    }

    .submitBtn {
        color: #f56c6c;
        cursor: pointer;
    }
    .activeBtn {
        color: #67c23a;
    }
    .disableBtn {
        color: #ccc;
    }
</style>
