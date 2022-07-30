// 导入 NProgress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/' //根路径
axios.interceptors.request.use(config => {
    NProgress.start()
    config.headers.Authorization = window.sessionStorage.getItem('token')
    // 在最后必须 return config
    return config
})
axios.interceptors.response.use(config => {
    NProgress.done()
    // 在最后必须 return config
    return config
})

export default axios