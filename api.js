const client = require('./connection.js')
const express = require('express');
const app = express();


app.listen(3200, ()=>{
    console.log("Sever is now listening at port 3200");
})

app.use(express.json());
//(express.urlencoded({ extended: true }));
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
    const rollno= req.params.roll_no;
    if(isNaN(rollno)==false)
    {
        client.query(`Select * from users where roll_no=${req.params.roll_no}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    }
    else
    res.send('ERROR');   
    client.end;
})


app.post('/users', (req, res)=> {
    const user = req.body;
    const duplicates= client.query('SELECT COUNT(user.roll_no) FROM user.roll_no GROUP BY user.roll_no HAVING COUNT(user.roll_no)>1');
    if(duplicates==0){
    let insertQuery= `insert into users(roll_no, first_name, second_name, email, mobile_no, subjects_enrolled) 
                       values(${user.roll_no}, '${user.first_name}', '${user.second_name}', '${user.email}', '${user.mobile_no}' , '${user.subjects_enrolled}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })}
    else 
    res.send('Rollno already exists');
    client.end;
})

app.put('/users/:roll_no', (req, res)=> {
    let user = req.body;
    let updateQuery = `update users
                       set first_name = '${user.first_name}',
                       second_name = '${user.second_name}',
                       email = '${user.email}',
                       mobile_no='${user.mobile_no}',
                       subjects_enrolled='${user.subjects_enrolled}'
                       where roll_no = ${user.roll_no}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.delete('/users/:roll_no', (req, res)=> {
    const user = req.body;
    const duplicat= client.query('SELECT TOP 1 user.roll_no FROM users WHERE users.roll_no= req.params.roll_no');
    if(duplicat)
   {const insertQuery = `delete from users where roll_no=${req.params.roll_no}`
    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })}
    else
    res.send('ERROR')
    
    client.end;
})

