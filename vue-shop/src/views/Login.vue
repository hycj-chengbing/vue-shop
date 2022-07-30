<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/image/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
            placeholder="请输入用户名称"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLogForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {loginFormRules} from '../utils/formRules'
export default {
  data() {
    return {
      // 这是表单的数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      //   表单验证规则对象
      loginFormRules
    };
  },
  methods: {
    //   重置表单
    resetLogForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http.post("login", this.loginForm);
        if (res.meta.status === 200) {
          console.log(res);
          this.$message.success(res.meta.msg);
          //  1. 将登陆后 token 保存到客户端的 sessionStorage 中
          //    1.1 项目中除了登录之外的其他所有API接口 必须在登录之后才能访问到
          //    1.2 token 只应当在当前网站打开期间有效，所以将 token 保存到 sessionStorage 中
          window.sessionStorage.setItem("token", res.data.token);
          //  2.通过编程式导航跳转到后台主页。路由地址是 /home
          this.$router.push("/home");
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>