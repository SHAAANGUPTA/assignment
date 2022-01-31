const {Client}= require('pg')
const me = new Client({
    
    database: "postgres"
})

me.connect();
me.query(`Select * from aboutme` ,(err,res)=>{
    if(!err){
        console.log(res.rows);
    }
    else{
        console.log(err.message);
    }
    me.end;
})