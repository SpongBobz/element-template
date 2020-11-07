import request from "@/util/requset";
// import { getParamsFormat } from "@/util";

export function getAuthList(id) {
  return request.get(`/Api/AuthFunction/GetAuthList?id=${id}`);
}
export function editAuth(data) {
  return request.post(`/Api/AuthFunction/EditAuth`, data);
}
export function getDataSourceAuthList(id) {
  return request.get(`/Api/AuthFunction/GetAuthAuditList?id=${id}`);
}
export function editAuthAudit(data) {
  return request.post(`/Api/AuthFunction/EditAuthAudit`, data);
}
export function getDataAuthList(id) {
  return request.get(`/Api/AuthFunction/GetMapSourceAuthsList?id=${id}`);
}
export function editDataAuth(data) {
  return request.post(`/Api/AuthFunction/EditMapSourceAuths`, data);
}
