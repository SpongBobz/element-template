import request from "@/util/requset";

export function getList() {
  return request.get("/Api/SysOrganization/GetList");
}
export function getListTree() {
  return request.get("/Api/SysOrganization/GetListTree");
}
export function addOrg(data) {
  return request.post("/Api/SysOrganization/AddOrg", data);
}
export function editOrg(data) {
  return request.post("/Api/SysOrganization/EditOrg", data);
}
export function deleteOrg(id) {
  return request.get(`/Api/SysOrganization/DeleteOrg?id=${id}`);
}
