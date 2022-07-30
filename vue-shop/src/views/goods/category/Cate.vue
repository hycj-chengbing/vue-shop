<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog"
            >添加分类</el-button
          >
        </el-col>
      </el-row>

      <!-- 表格 -->
      <tree-table
        class="treeTable"
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
      >
        <!-- 是否有效 -->
        <template v-slot:isok="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: lightgreen"
          >
          </i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <!-- 排序 -->
        <template v-slot:order="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag
            type="success"
            size="mini"
            v-else-if="scope.row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag type="warning" size="mini" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template v-slot:opt="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            round
            @click="showEditCateDialog(scope.row.cat_id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            round
            @click="removeCateById(scope.row.cat_id)"
            >删除</el-button
          >
        </template>
      </tree-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="querInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加分类的对话框 -->
    <add-cate
      :addCateDialogVisible="addCateDialogVisible"
      :parentCatesList="parentCatesList"
      :getCatesList="getCatesList"
    ></add-cate>
    <!-- 编辑分类 -->
    <edit-cate
      :editCateDialogVisible="editCateDialogVisible"
      :editCateForm="editCateForm"
      :getCatesList="getCatesList"
    >
    </edit-cate>
  </div>
</template>

<script>
import AddCate from "./childComps/AddCate.vue";
import EditCate from "./childComps/EditCate.vue";

export default {
  components: {
    AddCate,
    EditCate,
  },
  data() {
    return {
      // 查询条件
      querInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      // 商品分类的数据列表，默认为空
      cateList: [],
      // 总数据条数
      total: 0,
      // 为table指定列的定义
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          // 表示，将当前列定义为模板列
          type: "template",
          // 表示当前这一列使用模板名称
          template: "isok",
        },
        {
          label: "排序",
          // 表示，将当前列定义为模板列
          type: "template",
          // 表示当前这一列使用模板名称
          template: "order",
        },
        {
          label: "操作",
          // 表示，将当前列定义为模板列
          type: "template",
          // 表示当前这一列使用模板名称
          template: "opt",
        },
      ],
      // 控制添加分类对话框的显示与隐藏
      addCateDialogVisible: {
        isShow: false,
      },
      // 父级分类的列表
      parentCatesList: [],
      // 查询到的分类信息对象
      editCateForm: {},
      // 控制编辑分类对话框的显示与隐藏
      editCateDialogVisible: {
        isShow: false,
      },
    };
  },
  created() {
    this.getCatesList();
  },
  methods: {
    // 获取商品分类数据
    async getCatesList() {
      const { data: res } = await this.$http.get("categories", {
        params: this.querInfo,
      });

      if (res.meta.status == 200) {
        // 把数据列表，赋值给 catelist
        this.cateList = res.data.result;
        // 为总数据条数赋值
        this.total = res.data.total;
      } else {
        return this.$message.error("获取商品分类失败！");
      }
    },
    // 监听 pagesize 改变
    handleSizeChange(newSize) {
      this.querInfo.pagesize = newSize;
      this.getCatesList();
    },
    // 监听 pagenum 改变
    handleCurrentChange(newPage) {
      this.querInfo.pagenum = newPage;
      this.getCatesList();
    },
    // 点击按钮，展示添加分类的对话框
    showAddCateDialog() {
      // 先获取父级分类的数据列表
      this.getParentCatesList();
      // 再展示出对话框
      this.addCateDialogVisible.isShow = true;
    },
    // 获取父级分类的数据列表
    async getParentCatesList() {
      const { data: res } = await this.$http.get("categories", {
        params: { type: 2 },
      });
      if (res.meta.status === 200) {
        this.parentCatesList = res.data;
      } else {
        this.$message.error("获取父级分类数据失败！");
      }
    },

    // 编辑分类
    // 点击按钮，展示编辑分类的对话框
    async showEditCateDialog(id) {
      const { data: res } = await this.$http.get("categories/" + id);
      if (res.meta.status === 200) {
        this.editCateForm = res.data;
        this.editCateDialogVisible.isShow = true;
      } else {
        this.$message.error("查询分类信息失败！");
      }
    },
     // 根据Id删除对应的分类信息
    async removeCateById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该分类, 是否继续?",
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
      const { data: res } = await this.$http.delete("categories/" + id);
      if (res.meta.status === 200) {
        this.$message.success("删除分类成功！");
        this.getCatesList();
      } else {
        return this.$message.error("删除分失败！");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.treeTable {
  margin-top: 15px;
}
</style>
