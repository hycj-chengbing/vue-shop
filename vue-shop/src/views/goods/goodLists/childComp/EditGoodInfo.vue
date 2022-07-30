<template>
  <!-- 编辑分类的对话框 -->
  <el-dialog
    title="编辑商品"
    :visible.sync="editGoodDialogVisible.isShow"
    width="600px"
    @close="editGoodDialogClosed"
  >
    <!-- 内容主体区域 -->
    <el-form
      :model="editGoodForm"
      :rules="editGoodFormRules"
      ref="editGoodFormRef"
      label-width="80px"
    >
      <el-form-item label="商品名称" prop="goods_name">
        <el-input
          v-model="editGoodForm.goods_name"
          placeholder="请输入商品名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="goods_price">
        <el-input
          v-model="editGoodForm.goods_price"
          placeholder="请输入商品价格"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="goods_number">
        <el-input
          v-model="editGoodForm.goods_number"
          placeholder="请输入商品数量"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品重量" prop="goods_weight">
        <el-input
          v-model="editGoodForm.goods_weight"
          placeholder="请输入分类名称"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="editGoodDialogIsShow">取 消</el-button>
      <el-button type="primary" @click="editGoodInfo">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { goodFormRules } from "../../../../utils/formRules";
export default {
  props: {
    editGoodDialogVisible: {
      type: Object,
    },
    editGoodForm: {
      type: Object,
    },
    getGoodsList: {
      type: Function,
    },
  },
  data() {
    return {
      // 添加表单的验证规则对象
      editGoodFormRules: goodFormRules,
    };
  },
  methods: {
    editGoodDialogIsShow() {
      this.editGoodDialogVisible.isShow = false;
    },

    // 监听修改分类对话框的关闭事件
    editGoodDialogClosed() {
      // this.$refs.editGoodFormRef.resetFields();
    },
    fatherMethod() {
      this.getGoodsList();
    },
    // 修改分类信息并提交
    editGoodInfo() {
      this.$refs.editGoodFormRef.validate(async (valid) => {
        if (!valid) return;
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$http.put(
          "goods/" + this.editGoodForm.goods_id,
          this.editGoodForm
        );
        if (res.meta.status === 200) {
          // 关闭对话框
          this.editGoodDialogVisible.isShow = false;
          // 刷新数据列表
          this.fatherMethod();
          // 提示修改成功
          this.$message.success("更新商品信息成功！");
        } else {
          this.$message.error("更新商品信息失败！");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>