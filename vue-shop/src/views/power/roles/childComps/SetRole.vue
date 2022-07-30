<template>
  <el-dialog
    title="分配权限"
    :visible.sync="setRightDialogVisible.isShow"
    width="600px"
    @close="setRightDialogClosed"
  >
    <!-- 树形控件 -->
    <el-tree
      :data="rightslist"
      :props="treeProps"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="defKeys.key"
      ref="treeRef"
    ></el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="setRightDialogIsShow">取 消</el-button>
      <el-button type="primary" @click="allotRights">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    setRightDialogVisible: {
      type: Object,
    },
    rightslist: {
      type: Array,
    },
    defKeys: {
      type: Object,
    },
    roleId: {
      type: Number,
    },
    getRolesList: {
      type: Function,
    },
  },
  data() {
    return {
      // 树形控件的属性绑定对象
      treeProps: {
        label: "authName",
        children: "children",
      },
    };
  },
  methods: {
    setRightDialogIsShow() {
      this.setRightDialogVisible.isShow = false;
    },
    // 监听分配权限对话框的关闭事件
    setRightDialogClosed() {
      this.defKeys.key = [];
    },
    fatherMethod() {
      this.getRolesList();
    },
    // 点击为角色分配权限
    async allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ];

      const idStr = keys.join(",");

      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        { rids: idStr }
      );
      if (res.meta.status === 200) {
        this.$message.success("分配权限成功！");
        this.fatherMethod();
        this.setRightDialogVisible.isShow = false;
      } else {
        this.$message.error("分配权限失败！");
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>