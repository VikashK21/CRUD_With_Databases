const mysql=require('mysql');

const dbConn=mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "CIRUD",
    password: "Vikash@123",
    multipleStatements: true
});

dbConn.connect(err =>{
    err? console.log('Connetion failed'): console.log('Connected') 
});


module.exports=dbConn;

