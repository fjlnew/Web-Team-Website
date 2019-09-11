const query = require('../lib/mysql');
class Newsctrl{
    static async selectTop(ctx){
        const sql = `SELECT a.id,a.title,a.post_time 
            FROM news_table a ORDER BY post_time DESC LIMIT 5`;
        try {
            const newsData = await query(sql);          
            ctx.status = 200;
            ctx.body = {
                msg: newsData
            }
        } catch (error) {
            ctx.status = 400;
        }
    }
    static async selectDetail(ctx){
        const getData = ctx.request.query;
        const newsId = getData['newsId'];
        const sql = `SELECT * FROM news_table WHERE id = ?`;
        const values = [newsId];
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
    static async selectAllNews(ctx){
        const getData = ctx.request.query;
        const page = (parseInt(getData['page']) == 1)? 0 : (parseInt(getData['page'])-1)*5 ;
        const values = [page];
        const sql = `SELECT a.id,a.title,a.post_time 
        FROM news_table a ORDER BY post_time DESC LIMIT ?,5`;
        try {
            const res = await query(sql,values);
            const length = await query(`SELECT COUNT(id) AS COUNT FROM news_table`);
            ctx.status = 200;
            ctx.body = {
                msg: res,
                length: length
            }
        } catch (error) {
            ctx.status = 400;
        }
    }
    static async insertNews(ctx){
        const token = ctx.header.authorization;
        if(token && token !== null){ 
            const postData = ctx.request.body;
            const title = postData['title'];
            const body = postData['body'];
            const post_time = parseInt(Date.now()/1000);
            const sql = `INSERT INTO news_table (title,body,post_time) VALUES (?,?,?)`;
            const values = [title,body,post_time];
            try {
                const res = await query(sql,values);
                ctx.status = 200;
            } catch (error) {
                ctx.status = 400;
            }
        }else{
            ctx.status = 401;
        }        
    }
    static async upDateNews(ctx){
        const token = ctx.header.authorization;
        if(token && token !== null){ 
            const postData = ctx.request.body;
            const title = postData['title'];
            const body = postData['body'];           
            const newsId = postData['newsId']
            const sql = `update news_table set title=?,body=? where id=?`;
            const values = [title,body,newsId];
            try {
                const res = await query(sql,values);
                ctx.status = 200;
            } catch (error) {
                ctx.status = 400;
            }
        }else{
            ctx.status = 401;
        }        
    }
    static async deleteNews(ctx){
        const token = ctx.header.authorization;
        if(token && token !== null){ 
            const postData = ctx.request.body;
            const id = postData['id'];
            const sql = `delete from news_table where id = ?`;
            const values = [id];
            try {
                const res = await query(sql,values)
                ctx.status = 200;
            } catch (error) {
                ctx.status = 400;
            }
        }else{
            ctx.status = 401;
        }        
    }
}
module.exports = Newsctrl