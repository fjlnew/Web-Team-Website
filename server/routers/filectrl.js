const query = require('../lib/mysql');
const common = require('../lib/common');
class Filectrl{
    static async dealPic(ctx){   
        const mk_sign = await common.mkDir();       
        if(mk_sign){    
            const tName = await common.reName(ctx.req.files[0]);
            ctx.status = 200;       
            ctx.body = {                
                data: tName
            };
        }else{   
            ctx.status = 400;      
        }              
    }
    static async insertFile(ctx){
        let token = ctx.header.authorization;            
        if(token && token !== null){            
            const data =await common.verifyToken(token);
            const student_num = data.data;        
            const postData = ctx.request.body;
            const time = parseInt(Date.now()/1000);      
            const sql = `INSERT INTO file_table (student_num,title,href,post_time,description,file_href) 
                VALUES (?,?,?,?,?,?)`;
            const values = [student_num,postData['title'],postData['href'],
                    time,postData['description'],postData['file_href']];                       
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
    static async shareFile(ctx){
        let token = ctx.header.authorization;            
        if(token && token !== null){           
            const sql = `SELECT a.*,b.username FROM file_table a 
                LEFT JOIN user_table b ON a.student_num = b.student_num`;
            try {
                const res = await query(sql);
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
    static async deleteFile(ctx){
        let token = ctx.header.authorization;            
        if(token && token !== null){
            const postData = ctx.request.body;
            const fileId = postData['fileId'];
            const sql = `DELETE FROM file_table WHERE id = ?`
            const values = [fileId];
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
    static async deletePic(ctx){
        const token = ctx.header.authorization;
        if(token && token !== null){ 
            const postData = ctx.request.body;
            const id = postData['id'];
            const sql = `DELETE FROM banner_table WHERE	id =?`;
            const values = [id];         
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
    static async bannerInsert(ctx){
        const token = ctx.header.authorization;
        if(token && token !== null){ 
            const postData = ctx.request.body;
            const imgList = postData['imgList'];       
            const arr = [];
            imgList.forEach(element => {
                arr.push([element])
            });
            const sql = `INSERT INTO banner_table (href) VALUES ?`;
            try {
                const res = await query(sql,[arr]);           
                ctx.status = 200;
            } catch (error) {            
                ctx.status = 400;
            }
        }else{
            ctx.status = 401;
        }        
    }
    static async getBannerList(ctx){
        const sql = `SELECT * FROM banner_table`
        try {
            const res = await query(sql);
            ctx.status = 200;
            ctx.body = {
                msg: res
            }
        } catch (error) {
            ctx.status = 400;
        }
    }
}
module.exports = Filectrl;