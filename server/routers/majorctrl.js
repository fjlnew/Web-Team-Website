const query = require('../lib/mysql');
class Major{
    static async selectAllData(ctx){
        const sql = `SELECT * FROM major_table`;
        try {
            const res = await query(sql)
            ctx.status = 200;
            ctx.body = {
                msg: res
            }
        } catch (error) {
            ctx.status = 400;    
        }
    }
}
module.exports = Major