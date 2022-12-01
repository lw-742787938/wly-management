/*
 * @Author: lw
 * @Date: 2022-11-01 14:09:26
 * @LastEditTime: 2022-11-06 17:28:59
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \callCenter\src\server\idnex.js
 */
import axios from 'axios';
import { showMessage } from "./status";   // 引入状态码文件
import { ElMessage } from 'element-plus'  // 引入el 提示框，这个项目里用什么组件库这里引什么
import { useMainStore } from "@/store/main"
import Router  from "../router/index.js"
import JSONBig from "json-bigint"
const _json_ = JSONBig({
  storeAsString: true,
});
// const mainStore = useMainStore()
// 设置接口超时时间
axios.defaults.timeout = 10*1000;

// 请求地址，这里是动态赋值的的环境变量，下一篇会细讲，这里跳过
// @ts-ignore
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;
//http request 拦截器
axios.interceptors.request.use(
  config => {
  // 配置请求头
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',        // 传参方式json
      // 'token':'80c483d59ca86ad0393cf8a98416e2a1'              // 这里自定义配置，这里传的是token
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    useMainStore().hideLoad();
    if(response.data.success){
      // let data = Big.parse(Big.stringify(response.data))
      
      return response
    }else{
      // ElMessage({
      //   message: response.data.resultDetail||response.data.resultMessage,
      //   type: 'warning',
      // })
      ElMessage({
        message:response.data.resultDetail?response.data.resultDetail: showMessage(response.data.resultCode),
        type: 'warning',
      })
      if(response.data.resultDetail=='登录失效，请重新登录'){
        setTimeout(()=>{
          Router.replace({ path: '/login' })
        },1000)
      }
      return Promise.reject(response.data);
    }
  },
  error => {
    useMainStore().hideLoad();
    ElMessage.warning('网络连接异常,请稍后再试!');
  }
);
axios.defaults.transformResponse = [
  function (data) {
    return  _json_.parse(data);;
  },
];
// 封装 GET POST 请求并导出
export function request({url,method,data},mask){
//设置 url params type 的默认值
  mask? useMainStore().showLoad():'';
  return new Promise((resolve,reject)=>{
    let promise
    if( method.toUpperCase()==='GET' ){
      promise = axios({
        url,
        data
      })
    }else if( method.toUpperCase()=== 'POST' ){
      promise = axios({
        method:'POST',
        url,
        data
      })
    }
    //处理返回
    promise.then(res=>{
      resolve(res.data)
    }).catch(err=>{
      reject(err)
    })
  })
}