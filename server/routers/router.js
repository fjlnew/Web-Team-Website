const Router = require('koa-router');
const userctrl = require("./userctrl");
const articlectrl = require("./articlectrl");
const tagctrl = require("./tagctrl");
const achievementctrl = require("./achievementctrl");
const newsctrl = require("./newsctrl");
const members = require("./members");
const majorctrl = require('./majorctrl');
const departmentctrl = require('./departmentctrl');
//给所以接口添加前缀
const router = new Router({
    prefix:'/api'
})
router.post('/user/register',userctrl.register)
      .post('/user/login',userctrl.login)
      .post('/user/resetpwd',userctrl.resetpwd)
      .post('/user/completeusr',userctrl.completeusr)
      .post('/user/refuseUser',userctrl.refuseUser)
      .post('/user/agreeUser',userctrl.agreeUser)
      .post('/user/resetPassword',userctrl.resetpwd)
      .get('/user/deluser',userctrl.deluser)
      .get('/user/finduser',userctrl.finduser)
      .get('/user/unCheckUser',userctrl.unCheckUser)
      .get('/user/allTeamMembers',userctrl.allTeamMembers)
      .get('/user/userInfo',userctrl.userInfo)

router.get('/article/allArticle',articlectrl.selectAll)  
      .get('/article/tagArticle',articlectrl.selectTag)
      .get('/article/selectDetail',articlectrl.selectDetail)  
      .get('/article/delArticle',articlectrl.delArticle) 
      .get('/article/selectSomeone',articlectrl.selectBySomeone)
      .get('/article/selectTop5',articlectrl.selectTop5) 
      .get('/article/selectType',articlectrl.selectType)
      .get('/article/selectAllType',articlectrl.selectAllType)
      .post('/article/insertArticle',articlectrl.insertArticle)
      .post('/article/updateArticle',articlectrl.updateArticle)

router.get('/tag/sellectAllTag',tagctrl.sellectAllTag)
      .post('/tag/addTag',tagctrl.addTag)
      .post('/tag/delTag',tagctrl.delTag)      

router.post('/achievement/addTag',achievementctrl.addTag)
      .post('/achievement/insertAchievement',achievementctrl.insertAchievement)
      .post('/achievement/delTag',achievementctrl.delTag)
      .post('/achievement/delAchievement',achievementctrl.delAchievement)
      .get('/achievement/userAchievement',achievementctrl.userAchievement) 
      .get('/achievement/selectAllTag',achievementctrl.selectAllTag)
      .get('/achievement/achievementInfo',achievementctrl.achievementInfo)     
      .get('/achievement/achievementTag',achievementctrl.achievementTag)

router.post('/news/insertNews',newsctrl.insertNews)
      .post('/news/deleteNews',newsctrl.deleteNews)
      .post('/news/updateNews',newsctrl.upDateNews)
      .get('/news/selectTop',newsctrl.selectTop)
      .get('/news/selectDetail',newsctrl.selectDetail)      
      .get('/news/selectAllNews',newsctrl.selectAllNews)
      
router.get('/members/selectAllSearch',members.selectAllSearch)    
      .get('/members/selectAllMembers',members.selectAllMembers)
      .get('/members/selectByTag',members.selectByTag)
      .post('/members/reserchAdd',members.reserchAdd)
      .post('/members/reserchDel',members.reserchDel)      

router.get('/major/selectAlldata',majorctrl.selectAllData)

router.get('/department/selectAlldata',departmentctrl.selectAllData)

module.exports = router 



