const mysql = require('mysql');

const dbConfig = require(process.env.DATABASE_CONFIG_LOCATION || "../../database_config.json")

let host;
if (process.env.DOCKER) host = `${dbConfig.sqlUrl}`
else databaseString = 'localhost'
let port = `${dbConfig.sqlPort}` || 3306

// Connect MySQL server
host = 'localhost'
let dbName = 'catalog'
console.log("password: " + process.env.MYSQL_PASSWORD)
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'sqlserver',
  password        : '5D4U9hjra2F9x4TD',
  user            : 'root',
  database        : 'catalog'
});

module.exports = pool;
