<template>
  <el-dialog
    :visible.sync="displayGoodInfoDialogVisible.isShow"
    width="800px"
    title="商品信息"
  >
    <el-descriptions :column="1">
      <el-descriptions-item label="商品名称">{{
        goodInfo.goods_name
      }}</el-descriptions-item>
      <el-descriptions-item label="商品价格">{{
        goodInfo.goods_price
      }}</el-descriptions-item>
      
      <el-descriptions-item label="商品数量">{{
        goodInfo.goods_number
      }}</el-descriptions-item>
      <el-descriptions-item label="商品重量">{{
        goodInfo.goods_weight
      }}</el-descriptions-item>
      <el-descriptions-item label="商品照片">
        <el-image
          v-for="item in goodInfo.pics"
          :key="item.pics_id"
          style="width: 100px; height: 100px; margin: 10px"
          :src="item.pics_mid_url"
        ></el-image>
      </el-descriptions-item>
      <el-descriptions-item label="商品参数">
        <div>
          <el-tag v-for="(item, index) in goodInfo.attrs" :key="index"
            >{{ item.attr_name }} : {{ item.attr_value }}</el-tag
          >
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="商品详情">
        <p v-html="goodInfo.goods_introduce"></p>
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script>
export default {
  props: {
    displayGoodInfoDialogVisible: {
      type: Object,
    },
    goodInfo: {
      type: Object,
    },
  },
  methods: {
    // displayGoodDialogIsShow() {
    //   this.displayGoodDialogVisible.isShow = false;
    // },
  },
};
</script>

<style lang="less" scoped>
.el-tag {
  margin: 5px;
}
</style>