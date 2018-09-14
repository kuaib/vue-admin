<template>
    <el-dialog title="自定义运动员信息表格" :visible.sync="designTable" width="50%" center class="main-title">
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="title">
                    <el-checkbox :indeterminate="style1" v-model="isCheckAllBaseData" @change="checkAllBaseData">基础信息</el-checkbox>
                </div>
                <el-checkbox-group v-model="checkedBaseData" @change="checkBaseDataItem">
                    <el-checkbox v-for="item in baseDataList" :label="item" :key="item" class="check-item">{{item}}</el-checkbox>
                </el-checkbox-group>
            </el-col>
            <el-col :span="8">
                <div class="title">
                    <el-checkbox :indeterminate="style2" v-model="isCheckAllTest" @change="checkAllTest">日常监测指标</el-checkbox>
                </div>
                <el-checkbox-group v-model="checkedTest" @change="checkTestItem">
                    <el-checkbox v-for="item in testList" :label="item" :key="item" class="check-item">{{item}}</el-checkbox>
                </el-checkbox-group>
            </el-col>
            <el-col :span="8">
                <div class="title">
                    <el-checkbox :indeterminate="style3" v-model="isCheckAllEquip" @change="checkAllEquip">穿戴设备指标</el-checkbox>
                </div>
                <el-checkbox-group v-model="checkedEquip" @change="checkEquiItem">
                    <el-checkbox v-for="item in equipList" :label="item" :key="item" class="check-item">{{item}}</el-checkbox>
                </el-checkbox-group>
            </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
            <el-button @click="canncelAct">取 消</el-button>
            <el-button type="primary" @click="sureAct">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default ({
        data() {
            return {
                isCheckAllBaseData: false,    // 是否全选基础数据
                checkedBaseData: ['上海', '北京'],    // 已选中的
                baseDataList: ['上海', '北京', '广州', '深圳'],   // 全部子项集合
                style1: true,   // checkbox样式控制

                isCheckAllTest: false,    // 是否全选日常监测指标
                checkedTest: ['上海', '北京'],    // 已选中的
                testList: ['上海', '北京', '广州', '深圳'],   // 全部子项集合
                style2: true,   // checkbox样式控制

                isCheckAllEquip: false,    // 是否全选穿戴设备指标
                checkedEquip: ['上海', '北京'],    // 已选中的
                equipList: ['上海', '北京', '广州', '深圳'],   // 全部子项集合
                style3: true   // checkbox样式控制
            }
        },
        props: ['designTable'],
        methods: {
            // 全选基础数据
            checkAllBaseData(val) {
                this.checkedBaseData = val ? this.baseDataList : [];
                this.style1 = false;
            },
            // 选中基础数据子项
            checkBaseDataItem(value, type) {
                let checkedCount = value.length;
                this.isCheckAllBaseData = checkedCount === this.baseDataList.length;
                this.style1 = checkedCount > 0 && checkedCount < this.baseDataList.length;
            },



            // 全选日常监测数据
            checkAllTest(val) {
                this.checkedTest = val ? this.testList : [];
                this.style2 = false;
            },
            // 选中日常监测数据子项
            checkTestItem(value, type) {
                let checkedCount = value.length;
                this.isCheckAllTest = checkedCount === this.testList.length;
                this.style2 = checkedCount > 0 && checkedCount < this.testList.length;
            },



            // 全选穿戴设备指标
            checkAllEquip(val) {
                this.checkedEquip = val ? this.equipList : [];
                this.style3 = false;
            },
            // 选中穿戴设备指标子项
            checkEquiItem(value, type) {
                let checkedCount = value.length;
                this.isCheckAllEquip = checkedCount === this.equipList.length;
                this.style3 = checkedCount > 0 && checkedCount < this.equipList.length;
            },

            // 点击取消
            canncelAct() {
                this.$emit('canncelAct');
            },

            // 点击确定
            sureAct() {
                this.$emit('sureAct');
            }
        }
    })
</script>

<style lang="scss">
    .main-title .el-dialog__title {
        font-size: 20px;
        font-weight: 700;
    }
    .title {
        margin-bottom: 15px;
        span{
            font-size: 16px;
            font-weight: 700;
        }
    }

    .check-item {
        display: block !important;
        margin-left: 0 !important;
    }
</style>
