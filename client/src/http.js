import axios from 'axios'
import { Message, Loading } from 'element-ui'
import router from './router'
let loading

function startLoading() { //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0,0,0,.7)'
    })
}

function endLoading() {
    loading.close()
}

//请求拦截,设置全局请求为ajax请求  
axios.interceptors.request.use(config => {
    startLoading()
        //设置统一的请求header
    if (localStorage.eleToken) {
        config.headers.Authorization = localStorage.eleToken
    }
    if (localStorage.eleToken2) {
        config.headers.Authorization = localStorage.eleToken2
    }

    return config
}), error => {
    return Promise.reject(error)
}

//响应拦截
axios.interceptors.response.use(response => {
    endLoading();
    return response
}, error => {
    // 错误提醒
    endLoading()
    Message.error(error.response.data)

    const { status } = error.response
    if (status == 401) {
        Message.error('身份过期，请重新登录')
            // 清除token
        if (localStorage.eleToken) {
            localStorage.removeItem('eleToken')
        }
        // 
        if (localStorage.eleToken2) {
            localStorage.removeItem('eleToken2')
        }
        // localStorage.removeItem = ('eleToken2')
        // 页面跳转
        router.push('/login/logins')
    }

    return Promise.reject(error)
})
export default axios