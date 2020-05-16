const mysql = require('mysql');

const dbConfig = require(process.env.DATABASE_CONFIG_LOCATION || "../../database_config.json")

let host;
if (process.env.DOCKER) host = `${dbConfig.baseSqlUrl}`
else host = `${dbConfig.localhostSqlUrl}`
let username = `${dbConfig.sqlUser}`
let database = 'catalog'


// Connect MySQL server
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : host,
  password        : process.env.MYSQL_PASSWORD,
  user            : username,
  database        : database
});

module.exports = pool;
