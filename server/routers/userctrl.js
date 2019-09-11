const query = require('../lib/mysql');
const common = require('../lib/common');
class Userctrl{
    /* 用户注册 */
    static async register(ctx){
        const postData = ctx.request.body;
        const studentNum = postData['studentNum']
        const username = postData['username'];
        const password = common.md5(postData['password']+common.MD5_SUFFIX);
        const sql = "INSERT INTO user_table (student_num,username,PASSWORD) VALUES (?,?,?)"; 
        const values = [studentNum,username,password];
        try {
            const data =  await query(sql,values);
            ctx.status = 200;
            ctx.body = data;
        } catch (error) {
            ctx.status = 400;
        }  
    }
    /* 用户登陆 */
    static async login(ctx){
        const postData = ctx.request.body;
        const studentNum = postData['studentNum'];
        const password = common.md5(postData['password']+common.MD5_SUFFIX);
        const sql = 'SELECT * FROM user_table WHERE student_num = ?';
        const values = [studentNum];      
        try {
            const login_status = await query(sql,values);           
            if(login_status[0].length === 0){
                ctx.status = 200;
                ctx.body = {
                    have: 0,
                    is_active: 0,
                    verify: 0
                } 
            }else{
                if(login_status[0].is_active){
                    if(login_status[0].password == password){
                        const token = common.tokenCrypt(studentNum)
                        ctx.status = 200;
                        ctx.body = {
                            have: 1,
                            verify: 1,
                            is_active: login_status[0].is_active,
                            token: token,
                            studentNum: studentNum,
                        }
                    }else{
                        ctx.status = 200;
                        ctx.body = {
                            have: 1,
                            verify: 0,
                            is_active: login_status[0].is_active
                        } 
                    }                       
                }else{
                    ctx.status = 200;
                    ctx.body = {
                        have: 1,
                        verify: 1,
                        is_active: 0
                    }                     
                }               
            }    
        } catch (error) {
            ctx.status = 400;
        }            
    }   
    /* 删除用户 */
    static async deluser(ctx){
        let token = ctx.header.authorization;            
        if(token && token !== null){  
            const requestData = ctx.request.query;
            const studentNum = requestData['studentNum'];
            const sql = "delete from user_table where student_num = ?";
            const values = [studentNum];
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
    /* 重置密码 */
    static async resetpwd(ctx){
        const postData = ctx.request.body;
        const studentNum = postData['studentNum'];
        const oldPassword = common.md5(postData['oldPassword']+common.MD5_SUFFIX);
        const newPassword = common.md5(postData['newPassword']+common.MD5_SUFFIX);  
        const sql = `select * from user_table where student_num = ?`;
        const values = [studentNum];                    
        try {
            const res = await query(sql,values);
            if(res.length == 0){
                ctx.status = 200;
                ctx.body = {
                    status: 0,
                    msg: "此用户不存在！"
                }
            }else{ 
                if(res[0].password !== oldPassword){
                    ctx.status = 200;
                    ctx.body = {
                        status: 0,
                        msg: "密码不正确！"
                    }
                }else{
                    try {
                        const res = await query(`UPDATE user_table a SET PASSWORD= ? WHERE a.student_num = ? `,[newPassword,studentNum])
                        ctx.status = 200;
                        ctx.body = {
                            status: 1,
                            msg: "修改成功！"
                        }
                    } catch (error) {
                        ctx.status = 400;
                    }
                }
            }
        } catch (error) {
            ctx.status = 400;
        }             
    }
    /* 查找用户信息 */
    static async finduser(ctx){
        let token = ctx.header.authorization;            
        if(token && token !== null){            
            const data =await common.verifyToken(token);       
            const sql = `SELECT a.student_num,a.username,b.image FROM user_table a 
                LEFT JOIN user_info_table b ON a.student_num = b.student_num 
                WHERE a.student_num = ?`;
            const values = [data.data];       
            try {
                const userInfo = await query(sql,values);   
                ctx.status = 200;
                ctx.body = {
                    msg: userInfo
                }   
            } catch (error) {
                ctx.status = 400;
            }
        }
    }
    /* 用户信息完善 */
    static async completeusr(ctx){
        const token = ctx.header.authorization;      
        if(token && token !== null){    
            const postData = ctx.request.body;     
            const data =await common.verifyToken(token);
            const userNum = data.data;
            var arr = [];     
            const sql = `INSERT	user_info_table (student_num,description,depart_num,major_num,image,phone_num,email) 
              VALUE (?,?,?,?,?,?,?)`;      
            const values = [userNum,postData['description'],postData['depart_num'],
                    postData['major_num'],postData['image'],postData['phone_num'],
                    postData['email']]; 
            const existThis = await query(`SELECT student_num FROM user_info_table 
                WHERE student_num = ?`,[userNum]);                  
            for(let i=0;i<postData['checkReserch'].length;i++){   
                arr.push([userNum,postData['checkReserch'][i]]);                  
            }      
            if(existThis.length !== 0){
                try {
                    const delStatus = await query(`DELETE FROM reserch_table WHERE student_num = ?`,[userNum]);
                    try {     
                        const res = await query(`UPDATE user_info_table set student_num=?,description=?,
                        depart_num=?,major_num=?,image=?,phone_num=?,email=?`,values);
                        try {                                 
                            const res = await query(`INSERT INTO reserch_table (student_num,type_num) VALUES ?`,[arr])
                            ctx.status = 200;
                        } catch (error) {
                            ctx.status = 400;    
                        }
                    } catch (error) {
                        ctx.status = 400;
                    }
                } catch (error) {                   
                    ctx.status = 400;
                }                
            }else{
                try {
                    const res = await query(sql,values);                                  
                    try {                                 
                        const res = await query(`INSERT INTO reserch_table (student_num,type_num) VALUES ?`,[arr])
                        ctx.status = 200;
                    } catch (error) {
                        ctx.status = 400;    
                    }
                } catch (error) {                
                    ctx.status = 400
                }  
            }       
        }
        
    }
    /* 查找全部未审核成员 */
    static async unCheckUser(ctx){
        const token = ctx.header.authorization;
        if(token && token !== null){ 
            const sql = `SELECT * FROM user_table WHERE is_active = 0`;
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
    /* 拒绝成员加入 */
    static async refuseUser(ctx){
        let token = ctx.header.authorization;            
        if(token && token !== null){ 
            const postData = ctx.request.body;
            const studentNum = postData['student_num'];
            const values = [studentNum];
            const sql = `DELETE FROM user_table WHERE student_num = ? `;
            try {
                await query(sql,values);
                ctx.status = 200;
            } catch (error) {
                ctx.status = 400;
            } 
        }else{
            ctx.status = 401;
        }
       
    }
    /* 同意成员加入 */
    static async agreeUser(ctx){
        let token = ctx.header.authorization;            
        if(token && token !== null){ 
            const postData = ctx.request.body;
            const studentNum = postData['student_num'];
            const values = [studentNum];
            const sql = `UPDATE user_table SET is_active = 1 
                WHERE student_num = ?`;
            try {
                await query(sql,values);
                ctx.status = 200;
            } catch (error) {
                ctx.status = 400;
            } 
        }else{
            ctx.status = 401;
        }        
    }
    /* 查找所有用户 */
    static async allTeamMembers(ctx){        
        const sql = `SELECT a.*,b.username FROM user_info_table a 
            LEFT JOIN user_table b ON a.student_num = b.student_num	`;
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
    /* 查找用户详细信息 */
    static async userInfo(ctx){
        let token = ctx.header.authorization;            
        if(token && token !== null){ 
            const postData = ctx.request.body;     
            const data =await common.verifyToken(token);
            const userNum = data.data;
            const values = [userNum];
            try {
                const res = await query(`SELECT * FROM user_info_table WHERE student_num = ?`,values);
                try {
                    const reserchRes = await query(`SELECT a.type_num FROM reserch_table a WHERE a.student_num = ? GROUP BY a.type_num`,values)
                    res.status = 200;
                    ctx.body = {
                        msg: res,
                        reserch: reserchRes
                    }
                } catch (error) {
                    res.status = 401;
                }
            } catch (error) {
                ctx.status = 400;
            }    
        }else{
            ctx.status = 401;            
        }
    }
}
module.exports =  Userctrl;