const Pool=require('pg').Pool
require('dotenv').config()

const pool= new Pool({
    user: "postgres",
    password: "jana",  
     host: "localhost",
    port: 5432,
    database: "organizeit"
})


module.exports=pool