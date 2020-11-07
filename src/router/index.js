import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getAccessToken } from "@/util/auth";
import Layout from "@/layouts";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/organization",
    children: [
      {
        path: "/organization",
        name: "organization",
        component: () =>
          import(/* webpackChunkName: "organization" */ "@/views/Organization"),
        meta: { title: "组织机构管理" }
      },
      {
        path: "/user",
        name: "user",
        component: () => import(/* webpackChunkName: "User" */ "@/views/User"),
        meta: { title: "用户综合管理" }
      },
      {
        path: "/role",
        name: "role",
        component: () => import(/* webpackChunkName: "Role" */ "@/views/Role"),
        meta: { title: "角色综合管理" }
      },
      {
        path: "/log",
        name: "log",
        component: () => import(/* webpackChunkName: "log" */ "@/views/Log"),
        meta: { title: "日志管理" }
      },
      {
        path: "/auth",
        name: "auth",
        component: () => import(/* webpackChunkName: "auth" */ "@/views/Auth"),
        meta: { title: "授权管理" }
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "@/views/Login.vue"),
    meta: { title: "登录" }
  }
];
const router = new VueRouter({
  mode: process.env.NODE_ENV === "development" ? "history" : "hash",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  let token = getAccessToken();
  document.title = to.meta.title ? to.meta.title : "成都市监测数据管理系统";
  if (token) {
    let userInfo = store.state.user.userInfo;
    if (userInfo == null || !userInfo.Name) {
      await store.dispatch("user/getUserInfo");
    }
    if (to.path === "/login") {
      //token存在，并且是login页面
      next("/");
    } else {
      //token存在，不是login页面
      next();
    }
  } else {
    if (to.path === "/login") {
      //token不存在，并且是login页面
      next();
    } else {
      //token不存在，不是login页面
      next("/login");
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
