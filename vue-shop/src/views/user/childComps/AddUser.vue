<template>
  <!-- 添加用户的对话框 -->
  <el-dialog
    title="添加用户"
    :visible.sync="addUserDialogVisible.isShow"
    width="600px"
    @close="addUserDialogClosed"
  >
    <!-- 内容主体区域 -->
    <el-form
      :model="addUserForm"
      :rules="addUserFormRules"
      ref="addUserFormRef"
      label-width="70px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="addUserForm.username"
          placeholder="请输入用户名称"
          prefix-icon="el-icon-user"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="addUserForm.password"
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="addUserForm.email"
          placeholder="请输入邮箱"
          prefix-icon="el-icon-message"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="addUserForm.mobile"
          prefix-icon="el-icon-mobile-phone"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="addUserDialogIsShow">取 消</el-button>
      <el-button type="primary" @click="addUser">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addUserFormRules } from "../../../utils/formRules";

export default {
  props: {
    addUserDialogVisible: {
      type: Object,
    },
    getUsersList: {
      type: Function,
    },
  },
  data() {
    return {
      // 添加用户的表单数据
      addUserForm: { username: "", password: "", email: "", mobile: "" },
      // 添加表单的验证规则对象
      addUserFormRules,
    };
  },
  methods: {
    // 监听添加用户对话框的关闭事件
    addUserDialogClosed() {
      this.$refs.addUserFormRef.resetFields();
    },
    addUserDialogIsShow() {
      this.addUserDialogVisible.isShow = false;
    },
    fatherMethod() {
      this.getUsersList();
    },
    // 点击按钮，添加新用户
    addUser() {
      this.$refs.addUserFormRef.validate(async (valid) => {
        if (!valid) return;
        // 可以发起添加用户的网络请求
        const { data: res } = await this.$http.post("users", this.addUserForm);
        if (res.meta.status === 201) {
          this.$message.success("添加用户成功！");
          // 隐藏添加用户的对话框
          this.addUserDialogVisible.isShow = false;
          // 重新获取用户列表数据
          this.fatherMethod();
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },
  },
};
</script>


<style lang="less" scoped>
</style>