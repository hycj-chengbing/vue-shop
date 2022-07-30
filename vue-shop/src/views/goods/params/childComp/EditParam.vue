<template>
  <el-dialog
    :title="'编辑' + title"
    :visible.sync="editParamDialogVisible.isShow"
    width="600px"
    @close="editParamDialogClosed"
  >
    <!-- 添加参数的对话框 -->
    <el-form
      :model="editParamForm"
      :rules="editParamFormRules"
      ref="editParamFormRef"
      label-width="90px"
    >
      <el-form-item :label="title" prop="attr_name">
        <el-input v-model="editParamForm.attr_name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editParamDialogVisible.isShow = false"
        >取 消</el-button
      >
      <el-button type="primary" @click="editParam">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editParamFormRules } from "../../../../utils/formRules";
export default {
  props: {
    editParamDialogVisible: {
      type: Object,
    },
    editParamForm: {
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
      // 修改表单的验证规则对象
      editParamFormRules,
    };
  },
  methods: {
    fatherMethod() {
      this.getParamsData();
    },
    // 重置修改的表单
    editParamDialogClosed() {
      // this.$refs.editParamFormRef.resetFields();
    },
    // 点击按钮，修改参数信息
    editParam() {
      this.$refs.editParamFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.put(
          `categories/${this.cateId}/attributes/${this.editParamForm.attr_id}`,
          { attr_name: this.editParamForm.attr_name, attr_sel: this.activeName }
        );

        if (res.meta.status === 200) {
          this.$message.success("编辑参数成功！");
          this.fatherMethod();
          this.editParamDialogVisible.isShow = false;
        } else {
          this.$message.error("编辑参数失败！");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>