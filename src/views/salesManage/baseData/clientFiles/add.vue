<template>
    <section>
        <el-form ref="form" :model="form" label-width="100px">

            <el-tabs v-model="actTab" type="card">
                <el-tab-pane label="基础资料" name="baseDoc">
                    <div>
                        <div class="title">基本信息</div>
                        <el-row :gutter="4">
                            <el-col :span="6">
                                <el-form-item label="客户名称" prop="customerName">
                                    <el-input v-model="form.customerName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="所属分类" prop="type" class="mySel">
                                    <el-select v-model="form.type" placeholder="请选择" ref="typeSel">
                                        <el-option :value="treeType">
                                          <el-tree :data="data" :props="defaultProps" @node-click="chooseType"></el-tree>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="合同管理" name="contractMan">
                    
                </el-tab-pane>
            </el-tabs>
        </el-form>
    </section>
</template>

<script>
    export default({
        data() {
            return {
                actTab: 'baseDoc',
                form: {
                    customerName: '',   // 客户名称
                    type: '',           // 所属分类
                },
                treeType: '',           // 所属类型(树形选中的项)
                value: '',
                data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
        
            }
        },

        methods: {
            aaa(data) {
                console.log(data)
            },
            // 选中所属类型
            chooseType(type) {
                if(type == '全部' || !type.children) {
                    this.treeType = type.label;
                    this.form.type = this.treeType;
                    document.querySelector('.el-select-dropdown').style.display = "none";
                    this.$refs.typeSel.blur();
                }

            }
        }
    })
</script>
<style lang="scss">
    .el-select-dropdown__item {
        height: inherit;
        padding: 0;
    }
</style>