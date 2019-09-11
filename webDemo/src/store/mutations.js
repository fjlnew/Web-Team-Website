import {REGIST,LOGIN,PERSONAL_INFO,SELF_MESSAGE,LOGOUT,GET_DETAIL,
  SHOW_LOADING_TRUE,SHOW_LOADING_FALSE,CHANGE_TAG_TYPE,CHANGE_PAGE,CHANGE_CRITICAL,
  GET_NEWS_DETAIL,CHANGE_MODIFY_TRUE,CHANGE_MODIFY_FALSE
} from './types'
const mutations = {  
    [REGIST](state,data){      
      state.registInfo = data;
    },
    [LOGIN](state,res){        
      state.loginInfo = res
    },
    [PERSONAL_INFO](state,res){     
      state.personalInfo = res.msg
    },
    [SELF_MESSAGE](state,data){
        state.selfMessage = data;        
    },
    [LOGOUT](state){
       state.token = null;
       sessionStorage.removeItem('studentNum');
    },
    [GET_DETAIL](state,res){
       state.detail = res.msg;
    },   
    [SHOW_LOADING_TRUE](state){
      state.loadingShow = true;
    },
    [SHOW_LOADING_FALSE](state){
      state.loadingShow =false;
    },
    [CHANGE_TAG_TYPE](state,type){
      state.tagType = type;
    },
    [CHANGE_PAGE](state){
      state.page += 1;
    },
    [CHANGE_CRITICAL](state){
      state.critical = true;
    },
    [GET_NEWS_DETAIL](state,detail){
      state.detail = detail;
    },
    [CHANGE_MODIFY_TRUE](state){
      state.articleModifyStatus = true;
    },
    [CHANGE_MODIFY_FALSE](state){
      state.articleModifyStatus = false;
    }
}

export default mutations