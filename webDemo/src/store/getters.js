const getters = { 
    registText(state){
        return state.registInfo;
    },
    loginText(state){
        return state.loginInfo;
    },
    personalInfo(state){
        return state.personalInfo;
    },
    selfMessage(state){
        return state.selfMessage;
    },
    getDetail(state){
        return state.detail;
    },
    loadingShow(state){
        return state.loadingShow;
    },
    getTagType(state){
        return state.tagType;
    },
    getPage(state){
        return state.page;
    },
    getCritical(state){
        return state.critical;
    },
    getModifyStatus(state){
        return state.articleModifyStatus;
    }
}
export default getters