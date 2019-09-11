const query = require('../lib/mysql');
class Department{
    static async selectAllData(ctx){
        const sql = `SELECT * FROM depart_table`;
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
module.exports = Department