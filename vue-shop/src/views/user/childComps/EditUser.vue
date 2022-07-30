<template>
  <!-- 编辑用户的对话框 -->
  <el-dialog
    title="修改用户"
    :visible.sync="editUserDialogVisible.isShow"
    width="600px"
    @close="editUserDialogClosed"
  >
    <el-form
      :model="editUserForm"
      :rules="editUserFormRules"
      ref="editUserFormRef"
      label-width="70px"
    >
      <el-form-item label="用户名">
        <el-input v-model="editUserForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editUserForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="editUserForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editUserDialogIsShow">取 消</el-button>
      <el-button type="primary" @click="editUserInfo">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editUserFormRules } from "../../../utils/formRules";
export default {
  props: {
    editUserDialogVisible: {
      type: Object,
    },
    editUserForm: {
      type: Object,
    },
    getUsersList: {
      type: Function,
    },
  },

  data() {
    return {
      // 添加用户的表单数据
      // 添加表单的验证规则对象
      editUserFormRules,
      // 查询到的用户信息对象
    };
  },

  methods: {
    editUserDialogIsShow() {
      this.editUserDialogVisible.isShow = false;
    },
    // 监听修改用户对话框的关闭事件
    editUserDialogClosed() {
      this.$refs.editUserFormRef.resetFields();
    },
    fatherMethod() {
      this.getUsersList();
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editUserFormRef.validate(async (valid) => {
        if (!valid) return;
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$http.put(
          "users/" + this.editUserForm.id,
          {
            email: this.editUserForm.email,
            mobile: this.editUserForm.mobile,
          }
        );

        if (res.meta.status === 200) {
          // 关闭对话框
          this.editUserDialogVisible.isShow = false;
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