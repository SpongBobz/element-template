<template>
  <div class="home">
    <Com-Table
      :columns="columns"
      :dataSource="tableData"
      :options="options"
      :pagination="pagination"
    >
      <template slot="func">
        <el-button size="mini">
          <i class="el-icon-view el-icon--left"></i>
          浏览附件
        </el-button>
      </template>
    </Com-Table>
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      class="demo-ruleForm login-from"
    >
      <el-form-item prop="admin">
        <el-input
          class="full-width"
          v-model.number="loginForm.admin"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
        ></el-input>
      </el-form-item>
      <el-form-item prop="passWrod">
        <el-input
          class="full-width"
          type="password"
          prefix-icon="el-icon-lock"
          ref="pass"
          v-model="loginForm.passWrod"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="verificationCode">
        <el-row>
          <el-col :span="12">
            <el-input
              type="text"
              class="full-width"
              v-model="codeComputed"
              placeholder="请输入验证码"
              @keyup.enter.native="handleLogin"
            ></el-input>
          </el-col>
          <el-col :span="8">
            <div class="verification-code">{{ checkCode }}</div>
          </el-col>
          <el-col :span="4">
            <el-button
              style="color: #fff"
              type="text"
              size="small"
              @click="changeCode"
              >换一张</el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="handleLogin"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      columns: [
        {
          prop: "a",
          label: "交班人"
        },
        {
          prop: "c",
          label: "接班人"
        },
        {
          prop: "x",
          label: "交班内容"
        },
        {
          prop: "func",
          label: "操作",
          width: 250
        }
      ],
      tableData: [
        // { a: 123, c: "asda", x: "就是这样" },
        // { a: 123, c: "asda", x: "就是这样" },
        // { a: 123, c: "asda", x: "就是这样" },
        // { a: 123, c: "asda", x: "就是这样" },
        // { a: 123, c: "asda", x: "就是这样" }
      ],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      options: {
        mutiSelect: false,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true // 是否一挂载就加载数据
        // border: true,
      }
    };
  }
};
</script>
<style lang="scss"></style>
