<template>
  <!-- 分配角色的对话框 -->
  <el-dialog
    title="分配角色"
    :visible.sync="setRoleDialogVisible.isShow"
    width="600px"
    @close="setRoleDialogClosed"
  >
    <div>
      <p>当前的用户：{{ powerData.userInfo.username }}</p>
      <p>当前的角色：{{ powerData.userInfo.role_name }}</p>
      <p>
        分配新角色：
        <el-select v-model="selectedRoleId" placeholder="请选择">
          <el-option
            v-for="item in powerData.rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="setRoleDialogIsShow">取 消</el-button>
      <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    setRoleDialogVisible: {
      type: Object,
    },
    powerData: {
      type: Object,
    },
    getUsersList: {
      type: Function,
    },
  },
  data() {
    return {
      // 已选中的角色Id值
      selectedRoleId: "",
    };
  },
  methods: {
    fatherMethod() {
      this.getUsersList();
    },
    setRoleDialogIsShow() {
      this.setRoleDialogVisible.isShow = false;
    },
    async saveRoleInfo() {
      if (!this.selectedRoleId) {
        return this.$message.error("请选择要分配的角色！");
      }

      const { data: res } = await this.$http.put(
        `users/${this.powerData.userInfo.id}/role`,
        {
          rid: this.selectedRoleId,
        }
      );

      if (res.meta.status === 200) {
        this.$message.success("更新角色成功！");
        this. fatherMethod();
        this.setRoleDialogVisible.isShow = false;
      } else {
        this.$message.error("更新角色失败！");
      }
    },
    // 监听分配角色对话框的关闭事件
    setRoleDialogClosed() {
      this.selectedRoleId = "";
      this.powerData.userInfo = {};
    },
  },
};
</script>

<style lang="less" scoped>
</style>