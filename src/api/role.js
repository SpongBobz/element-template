import request from "@/util/requset";
import { getParamsFormat } from "@/util";

export function addRole(data) {
  return request.post("/Api/SysRole/AddRole", data);
}
export function updateRole(data) {
  return request.post("/Api/SysRole/UpdateRole", data);
}
export function deleteRole(id) {
  return request.get(`/Api/SysRole/DeleteRole?id=${id}`);
}
export function getRoleList() {
  return request.get(`/Api/SysRole/GetList`);
}
export function getListPage(data) {
  return request.get(`/Api/SysRole/GetListPage${getParamsFormat(data)}`);
}
