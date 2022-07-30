<template>
  <!-- 编辑用户的对话框 -->
  <el-dialog
    title="编辑角色"
    :visible.sync="editRoleDialogVisible.isShow"
    width="600px"
    @close="editRoleDialogClosed"
  >
    <!-- 内容主体区域 -->
    <el-form
      :model="editRoleForm"
      :rules="addRoleFormRules"
      ref="editRoleFormRef"
      label-width="80px"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          v-model="editRoleForm.roleName"
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input
          v-model="editRoleForm.roleDesc"
          placeholder="请输入角色描述"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="editRoleDialogIsShow">取 消</el-button>
      <el-button type="primary" @click="editRoleInfo">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addRoleFormRules } from "../../../../utils/formRules";
export default {
  props: {
    editRoleDialogVisible: {
      type: Object,
    },
    editRoleForm: {
      type: Object,
    },
    getRolesList: {
      type: Function,
    },
  },
  data() {
    return {
      // 添加表单的验证规则对象
      addRoleFormRules,
    };
  },
  methods: {
    editRoleDialogIsShow() {
      this.editRoleDialogVisible.isShow = false;
    },

    // 监听修改用户对话框的关闭事件
    editRoleDialogClosed() {
      // this.$refs.editRoleFormRef.resetFields();
    },
    fatherMethod() {
      this.getRolesList();
    },
    // 修改用户信息并提交
    editRoleInfo() {
      this.$refs.editRoleFormRef.validate(async (valid) => {
        if (!valid) return;
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$http.put(
          "roles/" + this.editRoleForm.roleId,
          {
            roleName: this.editRoleForm.roleName,
            roleDesc: this.editRoleForm.roleDesc,
          }
        );
        if (res.meta.status === 200) {
          // 关闭对话框
          this.editRoleDialogVisible.isShow = false;
          // 刷新数据列表
          this.fatherMethod();
          // 提示修改成功
          this.$message.success("更新用户信息成功！");
        } else {
          this.$message.error("更新用户信息失败！");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>