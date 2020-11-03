import Vue from "vue";
import VueRouter from "vue-router";
import { getAccessToken } from "@/util/auth";
import Layout from "@/layouts";
// import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
        meta: { title: "首页" }
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Login.vue"),
    meta: { title: "登录" }
  }
];

const router = new VueRouter({
  mode: process.env.NODE_ENV === "development" ? "history" : "hash",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  let token = getAccessToken();
  console.log(token);
  document.title = to.meta.title ? to.meta.title : "成都市监测数据管理系统";
  if (token) {
    // let userInfo = store.state.user.userInfo;
    // if (userInfo == null || !userInfo.name) {
    //   await store.dispatch("user/getUserInfo");
    // }
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
      window.location.href = "/login";
    }
  }
});
export default router;
