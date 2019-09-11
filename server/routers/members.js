const query = require('../lib/mysql');
const common = require('../lib/common')
class Members{
    static async selectAllSearch(ctx){        
        const sql = "SELECT * FROM reserch_type_table";
        try {
            const reserchTag = await query(sql);
            ctx.status = 200;
            ctx.body = {
                msg: reserchTag
            }
        } catch (error) {
            ctx.status = 400
        }
    }
    static async selectAllMembers(ctx){      
            const userInfo = `SELECT e.student_num,a.image,e.username,a.description,a.email,b.depart_name,c.major_name 
                FROM user_table e 
                LEFT JOIN user_info_table a ON a.student_num = e.student_num
                LEFT JOIN depart_table b ON a.depart_num = b.depart_num 
                LEFT JOIN major_table c ON a.major_num = c.major_num 
                LEFT JOIN user_table d ON a.student_num = d.student_num
                WHERE e.is_active = 1`;             
            try {
                const res = await query(userInfo);             
                ctx.status = 200;
                ctx.body = {
                    msg: res
                }                 
            } catch (error) {
                ctx.status = 400;
            }           
    }   
    static async selectByTag(ctx){
        const requestData = ctx.request.query;
        const reserchNum = requestData['reserchNum'];
        const values = [reserchNum];
        const sql = `SELECT e.username,e.student_num,c.depart_name,d.major_name,b.description,b.image,b.email FROM reserch_table a 
            LEFT JOIN user_info_table b ON a.student_num = b.student_num 
            LEFT JOIN depart_table c ON b.depart_num = c.depart_num
            LEFT JOIN major_table d ON b.major_num = d.major_num
            LEFT JOIN user_table e ON a.student_num = e.student_num
            WHERE a.type_num = ? group by e.student_num`;
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
    static async reserchAdd(ctx){
        const postData = ctx.request.body;
        const reserchName = postData['reserchName'];
        const sql = `INSERT INTO reserch_type_table (reserch_name) VALUES (?)`;
        const values = [reserchName];
        try {
            const res = await query(sql,values);        
            ctx.status = 200;            
        } catch (error) {
            ctx.status = 400;     
        }
    }
    static async reserchDel(ctx){
        const postData = ctx.request.body;
        const reserchNum = postData['reserchNum'];
        const sql = `delete from reserch_type_table where reserch_num = ?`;
        const values = [reserchNum];
        try {
            const res = await query(sql,values);        
            ctx.status = 200;            
        } catch (error) {
            ctx.status = 400;     
        }
    }
}
module.exports = Members