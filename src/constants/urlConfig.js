/**
 * 请求地址配置
 */
const host = {
  //开发环境
  dev: {
    HF_API_URL: 'http://192.168.60.1:7080/HFSystem',
    GH_API_URL: 'http://gank.io/api/'
  },
  //生产环境
  prd: {
    HF_API_URL: 'http://192.168.60.1:7080/HFSystem/',
    GH_API_URL: 'http://gank.io/api/'
  }
}

let ENV = 'prd'
let currentHost = host[ENV]

const setHost = (env = 'dev') => {
  ENV = env
  currentHost = host[ENV]
}

const HF_API_URL = currentHost.HF_API_URL
const GH_API_URL = currentHost.GH_API_URL
export { ENV, HF_API_URL,GH_API_URL, setHost }