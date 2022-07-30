<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addRoleDialogIsShow"
            >添加角色</el-button
          >
        </el-col>
      </el-row>
      <!-- 角色列表区域 -->
      <el-table :data="rolelist" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row
              :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag
                  closable
                  @close="removeRightById(scope.row, item1.id)"
                  >{{ item1.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <!-- 通过 for 循环 嵌套渲染二级权限 -->
                <el-row
                  :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              round
              @click="showEditRoleDialog(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              round
              @click="removeRoleById(scope.row.id)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
              round
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色对话框 -->
    <add-role
      :addRoleDialogVisible="addRoleDialogVisible"
      :getRolesList="getRolesList"
    ></add-role>
    <!-- 编辑角色对话框 -->
    <edit-role
      :editRoleDialogVisible="editRoleDialogVisible"
      :editRoleForm="editRoleForm"
      :getRolesList="getRolesList"
    ></edit-role>
    <!-- 分配权限的对话框 -->
    <set-role
      :setRightDialogVisible="setRightDialogVisible"
      :rightslist="rightslist"
      :defKeys="defKeys"
      :roleId="roleId"
      :getRolesList="getRolesList"
    ></set-role>
  </div>
</template>

<script>
import AddRole from "../roles/childComps/AddRole.vue";
import EditRole from "../roles/childComps/EditRole.vue";
import SetRole from "../roles/childComps/SetRole.vue";
export default {
  components: {
    AddRole,
    EditRole,
    SetRole,
  },
  data() {
    return {
      // 所有角色列表数据
      rolelist: [],
      addRoleDialogVisible: {
        isShow: false,
      },
      // 控制编辑权限对话框的显示与隐藏
      editRoleDialogVisible: {
        isShow: false,
      },
      // 查询到的角色信息对象
      editRoleForm: {},
      // 控制分配权限对话框的显示与隐藏
      setRightDialogVisible: {
        isShow: false,
      },
      // 所有权限的数据
      rightslist: [],
      // 默认选中的节点Id值数组
      defKeys: {
        key: [],
      },
      // 当前即将分配权限的角色id
      roleId: -1000,
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    // 获取所有角色的列表
    async getRolesList() {
      const { data: res } = await this.$http.get("roles");

      if (res.meta.status === 200) {
        this.rolelist = res.data;
        // console.log(this.rolelist);
      } else {
        this.$message.error("获取角色列表失败！");
      }
    },
    addRoleDialogIsShow() {
      this.addRoleDialogVisible.isShow = true;
    },
    // 展示编辑角色的对话框
    async showEditRoleDialog(id) {
      const { data: res } = await this.$http.get("roles/" + id);
      if (res.meta.status === 200) {
        this.editRoleForm = res.data;
        this.editRoleDialogVisible.isShow = true;
      } else {
        this.$message.error("查询用户信息失败！");
      }
    },
    // 根据Id删除对应的用户信息
    async removeRoleById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该角色, 是否继续?",
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
      const { data: res } = await this.$http.delete("roles/" + id);
      if (res.meta.status === 200) {
        this.$message.success("删除角色成功！");
        this.getRolesList();
      } else {
        return this.$message.error("删除角色失败！");
      }
    },

    // 展示分配权限的对话框
    async showSetRightDialog(role) {
      this.roleId = role.id;
      // 获取所有权限的数据
      const { data: res } = await this.$http.get("rights/tree");

      if (res.meta.status === 200) {
        // 把获取到的权限数据保存到 data 中
        this.rightslist = res.data;

        // 递归获取三级节点的Id
        this.getLeafKeys(role, this.defKeys.key);

        this.setRightDialogVisible.isShow = true;
      } else {
        return this.$message.error("获取权限数据失败！");
      }
    },
    // 通过递归的形式，获取角色下所有三级权限的id，并保存到 defKeys 数组中
    getLeafKeys(node, arr) {
      // 如果当前 node 节点不包含 children 属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach((item) => this.getLeafKeys(item, arr));
    },

    // 根据Id删除对应的权限
    async removeRightById(role, rightId) {
      // 弹框提示用户是否要删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除该权限, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        }
      ).catch((err) => err);

      if (confirmResult !== "confirm") {
        return this.$message.info("取消了删除！");
      }

      const { data: res } = await this.$http.delete(
        `roles/${role.id}/rights/${rightId}`
      );

      if (res.meta.status === 200) {
        role.children = res.data;
      } else {
        return this.$message.error("删除权限失败！");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>
