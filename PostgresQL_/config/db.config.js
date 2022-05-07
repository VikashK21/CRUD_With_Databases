const Pool = require('pg').Pool;

const dbConn = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'vikash@21',
    database: 'crud_with_pool'
})

dbConn.connect(err => {
    if (err) throw err.message;
    else {
        console.log('Database connected successfully.')
    }
})

dbConn.query('CREATE TABLE users(id BIGSERIAL NOT NULL PRIMARY KEY, name VARCHAR(30) NOT NULL, email VARCHAR(50) NOT NULL UNIQUE, password VARCHAR(16) NOT NULL)')
.then((result) => {
    console.log(result.command)
}).catch((err) => {
    console.error(err.message)
});

module.exports = dbConn;