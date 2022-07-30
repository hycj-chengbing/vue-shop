<template>
  <el-dialog
    title="添加分类"
    :visible.sync="addCateDialogVisible.isShow"
    width="600px"
    @close="addCateDialogClosed"
  >
    <!-- 添加分类的表单 -->
    <el-form
      :model="addCateForm"
      :rules="addCateFormRules"
      ref="addCateFormRef"
      label-width="100px"
    >
      <el-form-item label="分类名称：" prop="cat_name">
        <el-input v-model="addCateForm.cat_name"></el-input>
      </el-form-item>
      <el-form-item label="父级分类：">
        <!-- options 用来指定数据源 -->
        <!-- props 用来指定配置对象 -->
        <el-cascader
          :options="parentCatesList"
          :props="cascaderProps"
          v-model="selectedKeys"
          @change="parentCateChanged"
          clearable
        >
        </el-cascader>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addCateDialogVisible.isShow = false">取 消</el-button>
      <el-button type="primary" @click="addCate">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addCateFormRules } from "../../../../utils/formRules";
export default {
  props: {
    addCateDialogVisible: {
      type: Object,
    },
    parentCatesList: {
      type: Array,
    },
    getCatesList: {
      type: Function,
    },
  },
  data() {
    return {
      // 添加分类的表单数据对象
      addCateForm: {
        // 将要添加的分类的名称
        cat_name: "",
        // 父级分类的Id
        cat_pid: 0,
        // 分类的等级，默认要添加的是1级分类
        cat_level: 0,
      },
      // 添加分类表单的验证规则对象
      addCateFormRules,
      // 指定级联选择器的配置对象
      cascaderProps: {
        checkStrictly: true,
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      // 选中的父级分类的Id数组
      selectedKeys: [],
    };
  },
  methods: {
    fatherMethod() {
      this.getCatesList();
    },
    // 获取父级分类的数据列表
    async getParentCatesList() {
      const { data: res } = await this.$http.get("categories", {
        params: { type: 2 },
      });
      if (res.meta.status === 200) {
        console.log(res.data);
        this.parentCateList = res.data;
      } else {
        this.$message.error("获取父级分类数据失败！");
      }
    },
    // 选择项发生变化触发这个函数
    parentCateChanged() {
      console.log(this.selectedKeys);
      // 如果 selectedKeys 数组中的 length 大于0，证明选中的父级分类
      // 反之，就说明没有选中任何父级分类
      if (this.selectedKeys.length > 0) {
        // 父级分类的Id
        this.addCateForm.cat_pid =
          this.selectedKeys[this.selectedKeys.length - 1];
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = this.selectedKeys.length;
        return;
      } else {
        // 父级分类的Id
        this.addCateForm.cat_pid = 0;
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = 0;
      }
    },
    // 点击按钮，添加新的分类
    addCate() {
      this.$refs.addCateFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "categories",
          this.addCateForm
        );
        if (res.meta.status === 201) {
          this.$message.success("添加分类成功！");
          this.fatherMethod();
          this.addCateDialogVisible.isShow = false;
        } else {
          return this.$message.error("添加分类失败！");
        }
      });
    },
    // 监听对话框的关闭事件，重置表单数据
    addCateDialogClosed() {
      this.$refs.addCateFormRef.resetFields();
      this.selectedKeys = [];
      this.addCateForm.cat_level = 0;
      this.addCateForm.cat_pid = 0;
    },
  },
};
</script>

<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
</style>