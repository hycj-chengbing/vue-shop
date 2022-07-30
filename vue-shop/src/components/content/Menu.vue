<template>
  <el-menu
    background-color="#333744"
    text-color="#fff"
    active-text-color="#409eff"
    unique-opened
    :collapse="isCollapse"
    :collapse-transition="false"
    router
    :default-active='this.$route.path'
  >
    <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
      <template slot="title">
        <i :class="iconsObj[item.id]"></i>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item
        :index="'/' + subItem.path"
        v-for="subItem in item.children"
        :key="subItem.id"
      >
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{ subItem.authName }}</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  props: {
    menulist: {
      type: Array,
      default() {
        return [];
      },
    },
    iconsObj: {
      type: Object,
      default() {
        return {};
      },
    },
    isCollapse: {
      type: Boolean,
    },
  },
  
};
</script>

<style  scoped>
.iconfont {
  margin-right: 10px;
}
.el-menu {
  border-right: none;
}
</style>