import axios from 'axios'
import store from '../store'
import * as types from '../store/types'
import router from '../router'

// axios 配置
axios.defaults.timeout = 5000;
/* axios.defaults.baseURL = 'http://www.pzhuweb.cn/api'; */
axios.defaults.baseURL = 'http://127.0.0.1:3000/api';


// http request 拦截器
axios.interceptors.request.use(
    req => {      
        store.dispatch('showLoadingTrue');
        axios.defaults.headers.common['Authorization'] = `${store.state.token}`;
        return req;
    },
    err => {
        store.dispatch('showLoadingFlase');
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    res => {       
        store.dispatch('showLoadingFlase');
        return res;
    },
    error => {
        /* if (error.response) {
            switch (error.response.status) {                 
                
            }
        } */
        /* console.log(JSON.stringify(error)); */
        store.dispatch('showLoadingFlase');
        return Promise.reject(error)
    });

export default axios;
