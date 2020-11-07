<template>
  <el-menu
    background-color="#174468"
    text-color="#fff"
    :default-active="defaultActive"
    :unique-opened="true"
    :router="true"
    active-text-color="#fff"
  >
    <el-menu-item v-for="menu in menuList" :key="menu.url" :index="menu.url">
      <icon-font class="menu-icon" :type="menu.url" />
      <span slot="title">{{ menu.DisplayName }}</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    menuList() {
      return this.$store.state.user.menuList;
    },
    defaultActive() {
      return this.$route.name;
    }
  }
};
</script>
<style lang="scss">
.el-menu {
  border-right: none;
  .el-menu-item,
  .el-submenu__title {
    text-align: left;
    font-size: 16px;
    i {
      color: #fff;
    }
  }
  .el-menu-item {
    &:focus,
    &:hover,
    &.is-active {
      background-color: #0381cb !important;
    }
  }
  .menu-icon {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  }
}
</style>
