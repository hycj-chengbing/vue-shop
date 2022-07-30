<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="30">
        <el-col :span="10">
          <el-input
            placeholder="请输入搜索内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUsersList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUsersList"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserDialogIsShow"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              :width="50"
              @change="userStateChanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              round
              size="mini"
              @click="showUserEditDialog(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              round
              size="mini"
              @click="removeUserById(scope.row.id)"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-setting"
              round
              size="mini"
              @click="setRole(scope.row)"
              >权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->

    <add-user
      :addUserDialogVisible="addUserDialogVisible"
      :getUsersList="getUsersList"
    ></add-user>

    <!-- 编辑用户的对话框 -->
    <edit-user
      :editUserDialogVisible="editUserDialogVisible"
      :editUserForm="editUserForm"
      :getUsersList="getUsersList"
    ></edit-user>

    <power-user
      :setRoleDialogVisible="setRoleDialogVisible"
      :powerData="powerData"
      :getUsersList="getUsersList"
    ></power-user>
  </div>
</template>

<script>
import AddUser from "./childComps/AddUser.vue";
import EditUser from "./childComps/EditUser.vue";
import PowerUser from "./childComps/PowerUser.vue";
export default {
  components: { AddUser, EditUser, PowerUser },
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2,
      },
      userList: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addUserDialogVisible: {
        isShow: false,
      },

      // 控制修改用户对话框的显示与隐藏
      editUserDialogVisible: {
        isShow: false,
      },
      // 查询到的用户信息对象
      editUserForm: {},
      // 修改表单的验证规则对象
      setRoleDialogVisible: {
        isShow: false,
      },

      // 需要被分配角色的用户信息
      powerData: {
        userInfo: {},
        // 所有角色的数据列表
        rolesList: [],
        // 已选中的角色Id值
      },
    };
  },
  created() {
    this.getUsersList();
  },
  methods: {
     async getUsersList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      });
      if (res.meta.status === 200) {
        this.userList = res.data.users;
        this.total = res.data.total;
      } else {
        this.$message.error("获取用户列表失败！");
      }
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUsersList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUsersList();
    },
    // 监听 switch 开关状态的改变
    async userStateChanged(userInfo) {
      const { data: res } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      );
      if (res.meta.status === 200) {
        this.$message.success("更新用户状态成功！");
      } else {
        userInfo.mg_state = !userInfo.mg_state;
        this.$message.error("更新用户状态失败！");
      }
    },
    addUserDialogIsShow() {
      this.addUserDialogVisible.isShow = true;
    },

    // 展示编辑用户的对话框
    async showUserEditDialog(id) {
      const { data: res } = await this.$http.get("users/" + id);
      if (res.meta.status === 200) {
        this.editUserForm = res.data;
        this.editUserDialogVisible.isShow = true;
      } else {
        this.$message.error("查询用户信息失败！");
      }
    },
    // 根据Id删除对应的用户信息
    async removeUserById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        }
      ).catch((err) => err);

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }

      const { data: res } = await this.$http.delete("users/" + id);

      if (res.meta.status === 200) {
        this.$message.success("删除用户成功！");
        this.getUsersList();
      } else {
        return this.$message.error("删除用户失败！");
      }
    },
    // 展示分配角色的对话框
    async setRole(userInfo) {
      this.powerData.userInfo = userInfo;
      // 在展示对话框之前，获取所有角色的列表
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status === 200) {
        this.powerData.rolesList = res.data;
        this.setRoleDialogVisible.isShow = true;
      } else {
        this.$message.error("获取角色列表失败！");
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>
