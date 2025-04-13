import axios from "axios";
import { useUserStore } from "@/store/user";

// 创建axios实例
const instance = axios.create({
  baseURL: "http://localhost:8080", // 开发环境
  timeout: 10000, // 请求超时时间
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如添加token
    const userStore = useUserStore()
    const token = userStore.token;
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    return response.data
  },
  (error) => {
    // 对响应错误做些什么
    console.error("请求出错:", error.message);
    return Promise.reject(error);
  }
);

// 封装GET请求
export function get(url, params = {}) {
  return instance({
    method: "get",
    url,
    params,
  });
}

// 封装POST请求
export async function post(url, data = {}) {
  return await instance({
    method: "post",
    url,
    data,
  });
}

// 封装PUT请求
export function put(url, data = {}) {
  return instance({
    method: "put",
    url,
    data,
  });
}

// 封装DELETE请求
export function del(url, params = {}) {
  return instance({
    method: "delete",
    url,
    params,
  });
}

export default instance;
