import axios from 'axios';
import router from './router';
import Qs from 'qs'


// 请求拦截  设置统一header
axios.interceptors.request.use(
  config => {

    if (localStorage.wxToken) {
      config.headers.Authorization = localStorage.wxToken;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    //全局超时配置方案
    var originalRequest = error.config;
    if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1 && !originalRequest._retry) {
      originalRequest._retry = true
      return axios.request(originalRequest);
    }
    // 错误提醒
    const {
      status
    } = error.response;
    //status==401 token过期
    if (status == 401) {
      alert('token值无效，请重新登录');
      // 清除token
      localStorage.removeItem('wxToken');



      // 页面跳转
      router.push('/login');
    } else {
      alert(error.response.data)
    }

    return Promise.reject(error);
  }
);

export default axios;