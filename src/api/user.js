import request from "@/util/requset";
import { getParamsFormat } from "@/util";

export function login(data) {
  return request.post("/Api/Token/Login", data);
}
export function getUser() {
  return request.get("/Api/SysUser/GetUserInfo");
}
export function getUserList(data) {
  return request.get(`/Api/SysUser/GetList${getParamsFormat(data)}`);
}
export function getUserListByOrgID(data) {
  return request.get(`/Api/SysUser/GetUserListByOrgID${getParamsFormat(data)}`);
}
export function addUser(data) {
  return request.post("/Api/SysUser/AddUser", data);
}
export function updateUser(data) {
  return request.post("/Api/SysUser/UpdateUser", data);
}
export function deleteUser(id) {
  return request.get(`/Api/SysUser/DeleteUser?id=${id}`);
}
