<template>
  <!-- 添加参数的对话框 -->
  <el-dialog
    :title="'添加' + title"
    :visible.sync="addParamDialogVisible.isShow"
    width="600px"
    @close="addParamDialogClosed"
  >
    <!-- 添加参数的对话框 -->
    <el-form
      :model="addParamForm"
      :rules="addParamFormRules"
      ref="addParamFormRef"
      label-width="90px"
    >
      <el-form-item :label="title" prop="attr_name">
        <el-input v-model="addParamForm.attr_name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addParamDialogVisible.isShow = false">取 消</el-button>
      <el-button type="primary" @click="addParam">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {addParamFormRules} from '../../../../utils/formRules'
export default {
  props: {
    addParamDialogVisible: {
      type: Object,
    },
    title: {
      type: String,
    },
    activeName: {
      type: String,
    },
    cateId: {
      type: Number,
    },
    getParamsData: {
      type: Function,
    },
  },
  data() {
    return {
      // 添加参数的表单数据对象
      addParamForm: {
        attr_name: "",
      },
      // 添加表单的验证规则对象
      addParamFormRules,
    };
  },
  methods: {
    fatherMethod() {
      this.getParamsData();
    },
    // 监听添加对话框的关闭事件
    addParamDialogClosed() {
      this.$refs.addParamFormRef.resetFields();
    },
    // 点击按钮，添加参数
    addParam() {
      this.$refs.addParamFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          `categories/${this.cateId}/attributes`,
          {
            attr_name: this.addParamForm.attr_name,
            attr_sel: this.activeName,
          }
        );
        if (res.meta.status === 201) {
          this.$message.success("添加参数成功！");
          this.addParamDialogVisible.isShow = false;
          this.fatherMethod();
        } else {
          this.$message.error("添加参数失败！");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>