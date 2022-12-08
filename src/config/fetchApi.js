import axios from "axios";
import queryString from "query-string";
import storage from "~/untils/storage";

const fetchAPI = () => {
  const token = storage.getToken();
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    timeout: 60 *1000,
    paramsSerializer : { serialize: params => queryString.stringify(params)},
  });
  return instance;
};

const requestDataAPI = (url, method, params) => {
  switch (method) {
    case "GET":
      return fetchAPI().get(url, { params });
    case "POST":
    return fetchAPI().post(url, params)
    case "PUT":
      return fetchAPI().put(url, params);
    case "DELETE":
      return fetchAPI().delete(url, { params });
    default:
      break;
  }
  return null;
};


const requestGetAPI = (url, params) => requestDataAPI(url, "GET", params);

const requestPostAPI = (url, params) => requestDataAPI(url, "POST", params);

const requestPutAPI = (url, params) => requestDataAPI(url, "PUT", params);

const requestDeleteAPI = (url, params) => requestDataAPI(url, "DELETE", params);

const API = {
  requestGetAPI,
  requestPostAPI,
  requestPutAPI,
  requestDeleteAPI,
};

export default API;
