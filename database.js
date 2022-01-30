const {Client}= require('pg')
const me = new Client({
    host: "localhost",
    user: "ShaanGupta",
    port: 5432,
    password: "shaan",
    database: "postgres"
})

me.connect();
me.query(`Select roll_no from aboutme` ,(err,res)=>{
    if(!err){
        console.log(res.rows);
    }
    else{
        console.log(err.message);
    }
    me.end;
})