const config = require("./config");
const mysql = require("mysql");
var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
})

let query = function(sql,values){
    return new Promise((resolve,reject)=>{
        pool.getConnection(function (err,connection) {
            if(err){
                reject(err)
            }else{
                connection.query(sql,values,(err,data)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(data)
                    }
                    connection.release()
                })
            }
        })
    })
}
module.exports = query