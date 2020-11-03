<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#5787ad"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-submenu index="1-4">
        <template slot="title">选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss">
.el-menu {
  .el-menu-item,
  .el-submenu__title {
    text-align: left;
    font-size: 16px;
    i {
      color: #fff;
    }
  }
}
</style>
