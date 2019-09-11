import api from '../fetch/api'
import config from '../fetch/baseConfig'
import * as types from './types'
const actions = {  
    async regist({commit},userInfo){
        try {
            let res = await api.postData(config.api.insertUser,{
                "studentNum": userInfo.studentNum,
                "username": userInfo.username,
                "password": userInfo.password
            })
            commit(types.REGIST,{"status":200})
        } catch (error) {
            commit(types.REGIST,{"status":400})
        }        
    },
    async login({commit},loginInfo){
        try {
            let res = await api.postData(config.api.login,{
                "studentNum": loginInfo.studentNum,
                "password": loginInfo.password
            })
            commit(types.LOGIN,res)
        } catch (error) {
            commit(types.LOGIN,{
                status: 400
            })
        }
    },
    logout({commit}){
        commit(types.LOGOUT)
    },  
    async userInfo({commit}){
        const res = await api.getData(config.api.findUser)
        commit(types.PERSONAL_INFO,res)
    },
    async getSelfMessage({commit}){
        const articleData = await api.getData(config.api.selectSomeone)
        const achievementData = await api.getData(config.api.userAchievement)
        commit(types.SELF_MESSAGE,{
            "achievementData":achievementData.msg,
            "articleData":articleData.msg
        })
    },
    async detail({commit},id){
        const res = await api.getData(config.api.detail,{
            params:{
                "articleId": id
            }            
        });    
        commit(types.GET_DETAIL,res)
    }, 
    newsDetail({commit},detail){
        commit(types.GET_NEWS_DETAIL,detail);
    },
    critical({commit}){
        commit(types.CHANGE_CRITICAL)
    },
    changePage({commit}){
        commit(types.CHANGE_PAGE)
    },
    changeTagType ({commit},type) {
        commit(types.CHANGE_TAG_TYPE,type)
    },
    showLoadingTrue({commit}){
        commit(types.SHOW_LOADING_TRUE)
    },
    showLoadingFlase({commit}){
        commit(types.SHOW_LOADING_FALSE)
    },
    changeModifyTrue({commit}){
        commit(types.CHANGE_MODIFY_TRUE);
    },
    changeModifyFalse({commit}){
        commit(types.CHANGE_MODIFY_FALSE);
    }
}
export default actions