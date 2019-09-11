const query = require('../lib/mysql');
const common = require('../lib/common');
class Achievement{   
    /* 查找所有的标签 */
    static async selectAllTag(ctx){
        const sql = `SELECT * FROM achievement_type_table`
        try {
            const tag_status = await query(sql)
            ctx.status = 200
            ctx.body = {                
                msg: tag_status
            }
        } catch (error) {
            ctx.status = 400;       
        }           
    }
    static async delAchievement(ctx){
        const token = ctx.header.authorization;
        if(token && token !== null){ 
            const postData = ctx.request.body;
            const achievementId = postData['achievementId'];
            const sql = `DELETE FROM achievement_table WHERE id = ?`;
            const values = [achievementId];
            try {
                const del_status = await query(sql,values);
                ctx.status = 200;            
            } catch (error) {
                ctx.status = 400;
            } 
        }else{
            ctx.status = 401;
        }
         
    }
    /* 添加成就标签 */
    static async addTag(ctx){
        const token = ctx.header.authorization;
        if(token && token !== null){ 
            const postData = ctx.request.body;
            const tagName = postData['tagName'];
            const sql = `INSERT INTO achievement_type_table (NAME) VALUES (?)`
            const values = [tagName];        
            try {
                const tag_status = await query(sql,values);
                ctx.status = 200;
            } catch (error) {
                ctx.status = 400;
            }
        }else{
            ctx.status = 401;
        }
                
    }
    /* 删除成就标签 */
    static async delTag(ctx){
        const token = ctx.header.authorization;
        if(token && token !== null){ 
            const postData = ctx.request.body;
            const tagName = postData['tagId'];
            const sql = `delete from achievement_type_table where achievement_num=?`
            const values = [tagName];        
            try {
                const tag_status = await query(sql,values);
                ctx.status = 200
            } catch (error) {
                ctx.status = 400
            }  
        }else{
            ctx.status = 401;
        }              
    }
    /* 查找所有成就 */
    static async achievementInfo(ctx){
        const sql = `SELECT a.*,b.username FROM achievement_table a 
            LEFT JOIN user_table b ON a.student_num = b.student_num`;
        try {
            const info = await query(sql);
            ctx.status = 200;
            ctx.body = {
                msg: info
            }
        } catch (error) {
            ctx.status = 400
        } 
    }
    /* 查找分类成就 */
    static async achievementTag(ctx){
        const requestData = ctx.request.query;
        const typeNum =requestData['typeNum'];
        const values = [typeNum];
        const sql = `SELECT a.*,b.username FROM achievement_table a 
        LEFT JOIN user_table b ON a.student_num = b.student_num where a.type_num = ?`;
        try {
            const res = await query(sql,values);
            ctx.status = 200;
            ctx.body = {
                msg: res
            }
        } catch (error) {
            ctx.status = 400;
        }
    }
    /* 查找某人的成就 */
    static async userAchievement(ctx){
        let token = ctx.header.authorization;            
        if(token && token !== null){            
            const data =await common.verifyToken(token);
            const values = [data.data];  
            const sql = `SELECT a.id,a.description,a.post_time,a.img,a.href FROM 
                achievement_table a WHERE a.student_num = ?`;  
            try {
                const res = await query(sql,values);
                ctx.status = 200;
                ctx.body = {
                    msg: res
                }
            } catch (error) {
                ctx.status = 400;
            }    
        }    
    }
    static async insertAchievement(ctx){
        const token = ctx.header.authorization;
        if(token && token !== null){
            const postData = ctx.request.body;      
            if(token && token !== null){            
                const data =await common.verifyToken(token);
                const student_num = data.data;
                const post_time = parseInt(Date.now()/1000);
                const sql = `INSERT INTO achievement_table 
                    (student_num,type_num,img,href,description,post_time) VALUES (?,?,?,?,?,?)`;
                const values = [student_num,postData['achievement_num'],postData['img'],
                    postData['href'],postData['description'],post_time];
                try {                   
                    const res = await query(sql,values);
                    ctx.status = 200;
                } catch (error) {
                    ctx.status = 400;
                }        
            }else{
                ctx.status = 400;
            }    
        }else{
            ctx.status = 401;
        }
    }
}
module.exports = Achievement