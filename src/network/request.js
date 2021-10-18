import axios from "axios";

export function request(config){
  const instance = new axios.create({
    baseURL:'http://123.207.32.32:8000',
  })

  //axios拦截器
  //请求拦截
  instance.interceptors.request.use(config=>{
    return config
  },error => {
    console.log(error);
  })
  //响应请求
  instance.interceptors.response.use(res=>{
    return res.data
  },error => {
    console.log(error);
  })

  //发送真正的网络请求
  return instance(config)
}
