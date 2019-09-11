const query = require('../lib/mysql');
const common = require('../lib/common');
class Articlectrl{
    static async selectAll(ctx){
        const getData = ctx.request.query;
        const page = (parseInt(getData['page']) == 1)? 0 : (parseInt(getData['page'])-1)*5 ;
        const values = [page];
        const sql = `SELECT a.id,a.title,c.name,d.type_name,a.description,a.post_time,a.read_num,a.img,b.username FROM article_table a 
                LEFT JOIN user_table b ON a.student_num = b.student_num 
                LEFT JOIN label_type_table c ON a.label_num = c.type 
                LEFT JOIN article_type_table d ON a.type_num = d.type_num
                ORDER BY read_num DESC LIMIT ?,5`;
        try {
            const res = await query(sql,values);
            const length = await query(`SELECT COUNT(id) AS COUNT FROM article_table`);
            ctx.status = 200;
            ctx.body = {
                msg: res,
                length: length
            }
        } catch (error) {
            ctx.status = 400;
        } 
    }
    static async selectTag(ctx){
        const getData = ctx.request.query;
        const page = (parseInt(getData['page']) == 1)? 0 : (parseInt(getData['page'])-1)*5;
        const labelNum = getData['labelNum'];
        const sql = `SELECT a.id,a.title,c.name,d.type_name,a.description,a.post_time,a.read_num,a.img,b.username FROM article_table a  
            LEFT JOIN user_table b ON a.student_num = b.student_num 
            LEFT JOIN label_type_table c ON a.label_num = c.type 
            LEFT JOIN article_type_table d ON a.type_num = d.type_num
            WHERE a.label_num = ? ORDER BY a.read_num DESC limit ?,5 `
        const values = [labelNum,page];       
        try {           
            const res = await query(sql,values)
            const length = await query(`SELECT COUNT(id) AS COUNT FROM article_table a where a.label_num = ?`,[labelNum]);
            ctx.status = 200;
            ctx.body = {
                msg: res,
                length: length
            }
        } catch (error) {
            ctx.status = 400;
        }
    }
    static async selectDetail(ctx){
        const getData = ctx.request.query;
        const articleId = getData['articleId'];
        const sql = `SELECT a.id,a.type_num,a.label_num,a.title,a.img,a.body,a.post_time,a.read_num,a.description,b.username FROM article_table a 
             LEFT JOIN user_table b ON a.student_num = b.student_num  WHERE id = ?`;
        const values = [articleId];
        try {
            const res = await query(`UPDATE article_table SET read_num=read_num+1 WHERE id=?`,values);
        } catch (error) {
            ctx.status = 400
        }
        try {
            const detail = await query(sql,values);
            ctx.status = 200;
            ctx.body = {
                msg: detail
            }
        } catch (error) {
            ctx.status = 400;
        }
        
    }
    static async delArticle(ctx){
        const token = ctx.header.authorization;
        if(token && token !== null){ 
            const getData = ctx.request.query;
            const articleId = getData['articleId'];
            const sql = `delete from article_table where id=?`;
            const values = [articleId];
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
    static async selectBySomeone(ctx){
        const token = ctx.header.authorization;
        if(token && token !== null){            
            const data =await common.verifyToken(token);
            const values = [data.data];  
            const sql = `SELECT a.id,a.title,a.description,a.post_time FROM article_table a 
                 WHERE student_num = ? order by a.post_time desc`; 
            try {
                const res = await query(sql,values);
                ctx.status = 200;
                ctx.body = {
                    msg: res
                }
            } catch (error) {
                ctx.status = 400;    
            }             
        
        }else{
            ctx.status = 401;
        }           
    }
    static async selectTop5(ctx){
        const sql = `SELECT a.id,a.title,a.post_time,b.username FROM article_table a 
            LEFT JOIN user_table b ON a.student_num = b.student_num
            ORDER BY a.post_time DESC LIMIT 5`;
        try {
            const getData = await query(sql);
            ctx.status = 200;
            ctx.body = {
                msg: getData
            }
        } catch (error) {
            ctx.status = 400;
        }
               
    }
    static async selectType(ctx){
        const getData = ctx.request.query;
        const typeNum = getData['typeNum'];
        const page = (parseInt(getData['page']) == 1)? 0 : (parseInt(getData['page'])-1)*5 ;
        const sql = `SELECT a.id,a.title,c.name,d.type_name,a.description,a.post_time,a.read_num,a.img,b.username FROM article_table a  
            LEFT JOIN user_table b ON a.student_num = b.student_num 
            LEFT JOIN label_type_table c ON a.label_num = c.type 
            LEFT JOIN article_type_table d ON a.type_num = d.type_num
            WHERE a.type_num = ? ORDER BY a.read_num DESC limit ?,5`
        const values = [typeNum,page];       
        try {           
            const typeData = await query(sql,values)   
            const length = await query(`SELECT COUNT(id) AS COUNT FROM article_table a where a.type_num = ?`,[typeNum]);       
            ctx.status = 200;
            ctx.body = {
                msg: typeData,
                length: length
            }
        } catch (error) {
            ctx.status = 400;
        }
    }
    static async selectAllType(ctx){
        try {
            const res = await query(`SELECT * FROM article_type_table`);
            ctx.status = 200;
            ctx.body = {
                msg: res
            }
        } catch (error) {
            ctx.status = 400;    
        }
    }
    static async insertArticle(ctx){
        const postData = ctx.request.body;
        const token = ctx.header.authorization;      
        if(token && token !== null){    
            const postData = ctx.request.body;     
            const data =await common.verifyToken(token);
            const userNum = data.data;
            const post_time = parseInt(Date.now()/1000);
            const sql = `INSERT INTO article_table 
                (student_num,title,body,img,post_time,type_num,label_num,description) 
                VALUES (?,?,?,?,?,?,?,?)`;
            const values = [userNum,postData['title'],postData['body'],postData['img'],post_time,
                postData['type_num'],postData['label_num'],postData['description']];
            try {
                const res = await query(sql,values);
                ctx.status = 200;
            } catch (error) {                  
                ctx.status = 400;
            }    
        }else{
            ctx.status = 400;
        }        
    }
    static async updateArticle(ctx){
        const postData = ctx.request.body;
        const token = ctx.header.authorization;      
        if(token && token !== null){    
            const postData = ctx.request.body;    
            const sql = `UPDATE article_table a SET a.body=?,a.title=?,a.img=?,a.type_num=?,a.label_num=?,a.description=? WHERE a.id = ?`;
            const values = [postData['body'],postData['title'],postData['img'],
                postData['type_num'],postData['label_num'],postData['description'],postData['id']];
            try {
                const res = await query(sql,values);
                ctx.status = 200;
            } catch (error) {                  
                ctx.status = 400;
            }    
        }else{
            ctx.status = 400;
        }        
    }
}
module.exports = Articlectrl;