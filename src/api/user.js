import request from "@/util/requset";

export function login(data) {
  return request.post("/Api/Token/Login", data);
}

export function getUserInfo() {
  return request.get("/Api/SysUser/GetUserInfo");
}
