const query = require('../lib/mysql')
class Tagctrl{
    static async sellectAllTag(ctx){
        const sql = `SELECT * FROM label_type_table`;        
        try {
            const tagData = await query(sql);
            ctx.status = 200;
            ctx.body = {
                msg: tagData
            }
        } catch (error) {
            ctx.status = 400;
        }
    }
    static async addTag(ctx){
        const token = ctx.header.authorization;
        if(token && token !== null){
            const postData = ctx.request.body;
            const tagName = postData['tagName'];
            const sql = `INSERT INTO label_type_table (NAME) VALUES (?)`;
            const values = [tagName];
            try {
                const addStatus = await query(sql,values);        
                ctx.status = 200;            
            } catch (error) {
                ctx.status = 400;     
            }
        }else{
            ctx.status = 401;
        }
        
    }
    static async delTag(ctx){
        const token = ctx.header.authorization;
        if(token && token !== null){ 
            const postData = ctx.request.body;
            const tagId = postData['tagId'];
            const sql = `delete from label_type_table where type=? `;
            const values = [tagId];
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
}
module.exports = Tagctrl;