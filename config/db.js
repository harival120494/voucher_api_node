import dotenv from "dotenv";
import sequelize from "sequelize";
dotenv.config();
const conn = new sequelize(process.env.SERVER_MYSQL_DB, process.env.SERVER_MYSQL_USER, process.env.SERVER_MYSQL_PASSWORD, {
    host : process.env.SERVER_MYSQL_HOST,
    dialect : 'mysql'
})
export default conn;