<!--<template>-->
    <!--<div>-->
        <!--<el-row>-->
            <!--<div>基础信息</div>-->
            <!--<el-form ref="form" :model="form" :rules="rules" label-width="100px">-->
                <!--<el-row :gutter="20">-->
                    <!--<el-col :span="9">-->
                        <!--<el-row>-->
                            <!--<el-form-item label="姓名" prop="athleteName">-->
                                <!--<el-input v-model="form.athleteName" placeholder="请输入姓名"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-row>-->
                        <!--<el-row>-->
                            <!--<el-form-item label="队伍" prop="teamId">-->
                                <!--<el-select v-model="form.teamId" placeholder="请选择队伍" v-if="!isTeam"-->
                                           <!--@change="handleChange(form.teamId,'team')">-->
                                    <!--<el-option v-for="item in cateList" :label="item.dicValue" :value="item.dicKey"-->
                                               <!--:key="item.dicKey"></el-option>-->
                                <!--</el-select>-->
                                <!--<div v-else>{{form.teamName}}</div>-->
                            <!--</el-form-item>-->
                        <!--</el-row>-->
                        <!--<el-row>-->
                            <!--<el-form-item label="专项" prop="specialId">-->
                                <!--<el-select v-model="form.specialId" placeholder="请选择专项"-->
                                           <!--@change="handleChange(form.specialId,'special')">-->
                                    <!--<el-option v-for="item in specialList" :label="item.dicValue" :value="item.dicKey"-->
                                               <!--:key="item.dicKey"></el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->
                        <!--</el-row>-->
                        <!--<el-row>-->
                            <!--<el-form-item label="省份" prop="provinceId">-->
                                <!--<el-select v-model="form.provinceId" placeholder="请选择省份"-->
                                           <!--@change="handleChange(form.provinceId,'province')">-->
                                    <!--<el-option v-for="item in provincesList" :label="item.dicValue" :value="item.dicKey"-->
                                               <!--:key="item.dicKey"></el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->
                            <!--<el-row>-->
                                <!--<el-form-item label="训练年限" prop="trainingAge">-->
                                    <!--<el-input v-model="form.trainingAge" placeholder="请输入训练年限"></el-input>-->
                                <!--</el-form-item>-->
                            <!--</el-row>-->
                        <!--</el-row>-->
                        <!--<el-form-item label="是否跨项" prop="isCross">-->
                            <!--<el-radio-group v-model="form.isCross" @change="crossChange">-->
                                <!--<el-radio label="0">否</el-radio>-->
                                <!--<el-radio label="1">是</el-radio>-->
                            <!--</el-radio-group>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="跨项开始时间" prop="crossSince" v-show="form.isCross==1">-->
                            <!--<el-col :span="11" class="chooseDate">-->
                                <!--<el-date-picker type="date" placeholder="选择日期" v-model="form.crossSince"-->
                                                <!--style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>-->
                            <!--</el-col>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="性别">-->
                            <!--<el-radio-group v-model="form.gender">-->
                                <!--<el-radio label="1">男</el-radio>-->
                                <!--<el-radio label="2">女</el-radio>-->
                            <!--</el-radio-group>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="生日" prop="birthday">-->
                            <!--<el-col :span="11" class="chooseDate">-->
                                <!--<el-date-picker type="date" placeholder="选择日期" v-model="form.birthday"-->
                                                <!--style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>-->
                            <!--</el-col>-->
                        <!--</el-form-item>-->
                        <!--<el-row>-->
                            <!--<el-form-item label="身高" prop="height">-->
                                <!--<el-input v-model="form.height" placeholder="请输入身高"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-row>-->
                        <!--<el-row>-->
                            <!--<el-form-item label="体重" prop="weight">-->
                                <!--<el-input v-model="form.weight" placeholder="请输入体重"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-row>-->
                        <!--<el-row>-->
                            <!--<el-form-item label="身份证" prop="idCard">-->
                                <!--<el-input v-model="form.idCard" placeholder="请输入身份证"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-row>-->
                        <!--<el-row>-->
                            <!--<el-form-item label="电话" prop="telephone">-->
                                <!--<el-input v-model="form.telephone" placeholder="请输入电话"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-row>-->
                        <!--<el-row>-->
                            <!--<el-form-item label="微信" prop="wechat">-->
                                <!--<el-input v-model="form.wechat" placeholder="请输入微信"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-row>-->
                    <!--</el-col>-->
                    <!--<el-col :span="9" :offset="6">-->
                        <!--<div class="imgTitle">上传运动员照片</div>-->
                        <!--<el-upload-->
                                <!--class="avatar-uploader"-->
                                <!--action="/sports/sys/upload/athleteLogo"-->
                                <!--:show-file-list="false"-->
                                <!--:on-success="uploadSuccess"-->
                                <!--:before-upload="beforeUpload">-->
                            <!--<template v-if="imgUrl">-->
                                <!--<img :src="imgUrl" class="avatar">-->
                                <!--<i class="el-icon-delete avatar-delete-icon" @click.stop.prevent="imgUrl=null"></i>-->
                            <!--</template>-->
                            <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                        <!--</el-upload>-->
                    <!--</el-col>-->
                <!--</el-row>-->
            <!--</el-form>-->
            <!--<el-row class="btn-row">-->
                <!--<el-button type="primary" v-show="!submitFlag" @click="submitForm('form')">确认</el-button>-->
                <!--<el-button type="primary" v-show="submitFlag" :loading="true">提交中</el-button>-->
                <!--<el-button @click="resetForm('form')" style="margin-left: 50px;">重置</el-button>-->
            <!--</el-row>-->
        <!--</el-row>-->

        <!--<el-row :gutter="20">-->
            <!--<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
            <!--<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
            <!--<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
            <!--<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
        <!--</el-row>-->
    <!--</div>-->
<!--</template>-->

<template>
    <div>4332432</div>
</template>