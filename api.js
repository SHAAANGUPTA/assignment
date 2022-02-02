const client = require('./connection.js')
const express = require('express');
const app = express();

app.listen(3200, ()=>{
    console.log("Sever is now listening at port 3200");
})

client.connect();

app.get('/users', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/users/:roll_no', (req, res)=>{
    client.query(`Select * from users where roll_no=${req.params.roll_no}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.post('/users', (req, res)=> {
    const user = req.body;
    let insertQuery= `insert into users(roll_no, first_name, second_name, email, mobile_no, subjects_enrolled) 
                       values(${user.roll_no}, '${user.first_name}', '${user.second_name}', '${user.email}', '${user.mobile_no}' , '${user.subjects_enrolled}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})