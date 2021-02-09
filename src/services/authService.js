import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/login";
const apiEndpointGroups = apiUrl + "/host_groups";
const apiEndpointHosts = apiUrl + "/hosts";
const apiEndpointMaps = apiUrl + "/maps";
const apiEndpointLogout = apiUrl + "/logout";

export function login(url, username, password) {
return http.post(apiEndpoint, { url, username, password });
}

export function getHostGroups() {
  return http.get(apiEndpointGroups);
}

export function getHosts(groupIds) {
  return http.post(apiEndpointHosts, { groupids: groupIds });
}

export function getMaps(hostsIds) {
  return http.post(apiEndpointMaps, { hostids: hostsIds });
}

export function logout() {
  return http.get(apiEndpointLogout)
}
