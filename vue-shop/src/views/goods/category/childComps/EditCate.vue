<template>
  <!-- 编辑分类的对话框 -->
  <el-dialog
    title="编辑分类"
    :visible.sync="editCateDialogVisible.isShow"
    width="600px"
    @close="editCateDialogClosed"
  >
    <!-- 内容主体区域 -->
    <el-form
      :model="editCateForm"
      :rules="editCateFormRules"
      ref="editCateFormRef"
      label-width="80px"
    >
      <el-form-item label="分类名称" prop="cat_name">
        <el-input
          v-model="editCateForm.cat_name"
          placeholder="请输入分类名称"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="editCateDialogIsShow">取 消</el-button>
      <el-button type="primary" @click="editCateInfo">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addCateFormRules } from "../../../../utils/formRules";
export default {
  props: {
    editCateDialogVisible: {
      type: Object,
    },
    editCateForm: {
      type: Object,
    },
    getCatesList: {
      type: Function,
    },
  },
  data() {
    return {
      // 添加表单的验证规则对象
      editCateFormRules:addCateFormRules
    };
  },
  methods: {
    editCateDialogIsShow() {
      this.editCateDialogVisible.isShow = false;
    },

    // 监听修改分类对话框的关闭事件
    editCateDialogClosed() {
      // this.$refs.editCateFormRef.resetFields();
    },
    fatherMethod() {
      this.getCatesList();
    },
    // 修改分类信息并提交
    editCateInfo() {
      this.$refs.editCateFormRef.validate(async (valid) => {
        if (!valid) return;
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$http.put(
          "categories/" + this.editCateForm.cat_id,
          {
            cat_name: this.editCateForm.cat_name,
          }
        );
        if (res.meta.status === 200) {
          // 关闭对话框
          this.editCateDialogVisible.isShow = false;
          // 刷新数据列表
          this.fatherMethod();
          // 提示修改成功
          this.$message.success("更新分类成功！");
        } else {
          this.$message.error("更新分类失败！");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>