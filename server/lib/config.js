const config = {
    port: 3000,
    database: {
        // DATABASE: "web", //数据库
        // USERNAME: "root", //用户名
        // PASSWORD: "123", //密码
        // PORT: "3306", //端口
        // HOST: "localhost" //ip地址

        host: 'localhost',
        user: 'root',
        password: '123',
        database: 'qidian',
        port: 3306,
        multipleStatements: true
    }
}
module.exports = config