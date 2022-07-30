<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getGoodsList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodsList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddPage">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- table表格区域 -->
      <el-table :data="goodslist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column
          label="商品价格(元)"
          prop="goods_price"
          width="110px"
        ></el-table-column>
        <el-table-column
          label="商品重量"
          prop="goods_weight"
          width="80px"
        ></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="180px">
          <template v-slot="scope">
            {{ scope.row.add_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditGoodDialog(scope.row.goods_id)"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-message"
              size="mini"
              @click="showdisplayGoodInfo(scope.row.goods_id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeById(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
      <!-- 编辑商品 -->
      <edit-good-info
        :editGoodDialogVisible="editGoodDialogVisible"
        :editGoodForm="editGoodForm"
        :getGoodsList="getGoodsList"
      >
      </edit-good-info>
    </el-card>
    <!-- 商品详情信息 -->
    <display-good-info
      :displayGoodInfoDialogVisible="displayGoodInfoDialogVisible"
      :goodInfo="goodInfo"
    >
    </display-good-info>
  </div>
</template>

<script>
import EditGoodInfo from "./childComp/EditGoodInfo.vue";
import DisplayGoodInfo from "./childComp/DisplayGoodInfo.vue";
export default {
  components: {
    EditGoodInfo,
    DisplayGoodInfo,
  },
  data() {
    return {
      // 查询参数对象
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      // 商品列表
      goodslist: [],
      // 总数据条数
      total: 0,
      // 查询到的分类信息对象
      editGoodForm: {},
      goodInfo: {},
      // 控制编辑商品对话框的显示与隐藏
      editGoodDialogVisible: {
        isShow: false,
      },
      // 控制展示商品详情对话框的显示与隐藏
      displayGoodInfoDialogVisible: {
        isShow: false,
      },
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    // 根据分页获取对应的商品列表
    async getGoodsList() {
      const { data: res } = await this.$http.get("goods", {
        params: this.queryInfo,
      });

      if (res.meta.status === 200) {
        // this.$message.success("获取商品列表成功！");
        this.goodslist = res.data.goods;
        this.total = res.data.total;
      } else {
        this.$message.error("获取商品列表失败！");
      }
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getGoodsList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getGoodsList();
    },
    // 编辑商品
    // 点击按钮，展示编辑商品的对话框
    async showEditGoodDialog(id) {
      const { data: res } = await this.$http.get("goods/" + id);
      if (res.meta.status === 200) {
        this.editGoodForm = res.data;
        this.editGoodDialogVisible.isShow = true;
      } else {
        this.$message.error("查询商品信息失败！");
      }
    },
    async showdisplayGoodInfo(id) {
      const { data: res } = await this.$http.get("goods/" + id);
      if (res.meta.status === 200) {
        this.goodInfo = res.data;
        console.log(res.data);
        this.displayGoodInfoDialogVisible.isShow = true;
      } else {
        this.$message.error("查询商品信息失败！");
      }
    },

    async removeById(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该商品, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (confirmResult !== "confirm") {
        return this.$message.info("已经取消删除！");
      }

      const { data: res } = await this.$http.delete(`goods/${id}`);

      if (res.meta.status === 200) {
        this.$message.success("删除成功！");
        this.getGoodsList();
      } else {
        this.$message.error("删除失败！");
      }
    },
    goAddPage() {
      this.$router.push("/goods/add");
    },
  },
};
</script>

<style lang="less" scoped>
</style>
