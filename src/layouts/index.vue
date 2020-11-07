<template>
  <el-container>
    <el-header height="70px">
      <div class="header-title">
        <img
          style="margin-right: 20px"
          src="https://via.placeholder.com/160x60"
          alt=""
        />
        <span>智慧城建档案馆--地下管网运维管理</span>
      </div>
      <div>
        <span class="el-dropdown-link">
          <icon-font class="user-icon" type="user-h" />
          <span> {{ userName }} </span>
          <el-popconfirm :title="`是否确认退出系统？`" @confirm="logout"
            ><el-button
              slot="reference"
              @click.stop.prevent
              size="mini"
              type="text"
              icon="el-icon-switch-button"
            ></el-button>
          </el-popconfirm>
        </span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <MenuSide />
      </el-aside>
      <el-main>
        <div class="currnt-rote">{{ roteName }}</div>
        <div class="main-box">
          <router-view />
        </div>
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
  },
  computed: {
    roteName() {
      return this.$route.meta.title;
    },
    userName() {
      return this.$store.state.user.userInfo.Name;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
      location.reload();
    }
  }
};
</script>
<style lang="scss" scoped>
.el-header {
  line-height: 70px;
  background-color: #16354b;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-title {
    font-weight: bold;
    font-size: 30px;
    letter-spacing: 2px;
    color: #2096dc;
    display: flex;
    align-items: center;
  }
  .user-icon {
    font-size: 24px;
    vertical-align: sub;
  }
}
.el-container {
  height: calc(100vh - 70px);
  .el-aside {
    background-color: #174468;
  }
  .el-main {
    padding: 0px;
    color: #fff;
    background-color: #1a558a;
    .main-box {
      padding: 7px;
      height: calc(100vh - 130px);
      overflow: auto;
    }
    .currnt-rote {
      text-align: left;
      height: 46px;
      line-height: 46px;
      background: #133b5c;
      padding: 0 10px;
    }
  }
  .el-dropdown-link {
    margin-right: 10px;
    font-size: 18px;
    color: #bcc8d4;
    .el-button--text {
      font-size: 18px;
      color: #bcc8d4;
      margin-left: 10px;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
