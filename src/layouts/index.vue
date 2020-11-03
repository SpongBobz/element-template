<template>
  <el-container>
    <el-header height="60px">Header</el-header>
    <el-container>
      <el-aside width="200px">
        <MenuSide />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import MenuSide from "./components/MenuSide";
export default {
  components: {
    MenuSide
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.el-header {
  line-height: 60px;
  background-color: #174468;
  color: #fff;
}
.el-container {
  height: calc(100vh - 60px);
  .el-aside {
    background-color: #5787ad;
  }
}
</style>
