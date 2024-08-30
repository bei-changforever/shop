import axios from 'axios';
import { showLoadingToast, closeToast } from 'vant';
//创建一个axios实例
const server = axios.create({
    baseURL: 'http://localhost:8080/', // 所有的请求地址前缀部分
    timeout: 60000, // 请求超时时间毫秒
    /* withCredentials: true, // 异步请求携带cookie
    headers: {
        // 设置后端需要的传参类型
        'Content-Type': 'application/json',
        'token': 'your token',
        'X-Requested-With': 'XMLHttpRequest',
    }, */
})

// 添加请求拦截器
server.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        // 在发送请求之前做些什么
        showLoadingToast({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            duration: 30000,
        })

        // console.log('config==>',config);
        

        const shopToken = localStorage.getItem('shopToken')

         //持票人规则
        config.headers.Authorization = `Bearer ${shopToken}`

        // console.log(config.headers);
        

        return config
    },
    function (error) {
        // 对请求错误做些什么
        console.log('error123123==>',error);
        closeToast();
        return Promise.reject(error)
    }
)

// 添加响应拦截器
server.interceptors.response.use(
    function (response) {
        // console.log('response==>',response)

        const { authorization } = response.headers
         authorization && localStorage.setItem('shopToken', authorization)


        closeToast();
        return response
    },
    function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么

          console.log('error==>',error);

        // const { status } = error.response
        // if (status == 401) {
        //     localStorage.removeItem('shopToken')
        //     window.location.href = '/login'
        // }



        closeToast();
        return Promise.reject(error)
    }
)

export default server