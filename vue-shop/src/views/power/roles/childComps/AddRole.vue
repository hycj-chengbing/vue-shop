<template>
  <el-dialog
    title="添加角色"
    :visible.sync="addRoleDialogVisible.isShow"
    width="600px"
    @close="addRoleDialogClosed"
  >
    <!-- 内容主体区域 -->
    <el-form
      :model="addRoleForm"
      :rules="addRoleFormRules"
      ref="addRoleFormRef"
      label-width="80px"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          v-model="addRoleForm.roleName"
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input
          v-model="addRoleForm.roleDesc"
          placeholder="请输入角色描述"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="addRoleDialogIsShow">取 消</el-button>
      <el-button type="primary" @click="addRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addRoleFormRules } from "../../../../utils/formRules";

export default {
  props: {
    addRoleDialogVisible: {
      type: Object,
    },
    getRolesList: {
      type: Function,
    },
  },
  data() {
    return {
      // 添加用户的表单数据
      addRoleForm: { roleName: "", roleDesc: "" },
      // 添加表单的验证规则对象
      addRoleFormRules,
    };
  },
  methods: {
    // 监听添加用户对话框的关闭事件
    addRoleDialogClosed() {
      this.$refs.addRoleFormRef.resetFields();
    },
    addRoleDialogIsShow() {
      this.addRoleDialogVisible.isShow = false;
    },
    fatherMethod() {
      this.getRolesList();
    },
    // 点击按钮，添加新用户
    addRole() {
      this.$refs.addRoleFormRef.validate(async (valid) => {
        if (!valid) return;
        // 可以发起添加用户的网络请求
        const { data: res } = await this.$http.post("roles", this.addRoleForm);

        if (res.meta.status === 201) {
          this.$message.success("添加角色成功！");
          // 隐藏添加用户的对话框
          this.addRoleDialogVisible.isShow = false;
          
          // 重新获取用户列表数据
          this.fatherMethod();
        } else {
          this.$message.error("添加角色失败！");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>